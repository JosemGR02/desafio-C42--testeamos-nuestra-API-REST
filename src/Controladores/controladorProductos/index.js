
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Controlador Productos |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { ApiProductos } from '../../Api/index.js';
import { FECHA_UTILS, ERRORES_UTILS, JOI_VALIDADOR, LOGGER_UTILS } from "../../Utilidades/index.js";
import { logger } from '../../Configuracion/logger.js';



class ControladorProductos {

    constructor() {
        this.apiProds = new ApiProductos()
    }

    obtenerTodosProds = async (solicitud, respuesta) => {
        try {
            const producto = await apiProds.obtenerTodosProductos();

            if (!producto) return logger.error({ error: ERRORES_UTILS.MESSAGES.ERROR_PRODUCTO });

            respuesta.send(producto);
        } catch (error) {
            respuesta.send(`${error}, Error al obtener los productos solicitados`)
        }
    };

    obtenerProdXid = async (solicitud, respuesta) => {
        try {
            const { id } = solicitud.params;

            const producto = await apiProds.obtenerProductosXid(id);

            respuesta.send(producto);
        } catch (error) {
            respuesta.send(`${error}, Error al obtener el producto solicitado`)
        }
    };

    actualizarProducto = async (solicitud, respuesta) => {
        try {
            const { id } = solicitud.params;

            const { titulo, descripcion, codigo, stock,
                precio, imagen, timestamp } = solicitud.body;

            const productoValidado = await JOI_VALIDADOR.productoJoi.validateAsync({
                titulo, descripcion, codigo, imagen, precio, stock, timestamp
            });

            const productoActualizado = apiProds.actualizarProductosXid({ productoValidado }, id)

            respuesta.send(`${productoActualizado}, Producto actualizado con exito`)
        } catch (error) {
            respuesta.send(`${error}, Error al actualizar el producto solicitado`)
        }
    }

    crearProducto = async (solicitud, respuesta) => {
        try {
            const { titulo, descripcion, codigo, imagen, precio, stock } = solicitud.body;

            const nuevoProducto = await JOI_VALIDADOR.producto.validateAsync({
                titulo, descripcion, codigo, imagen, precio, stock,
                timestamp: FECHA_UTILS.getTimestamp(),
            });

            const productoCreado = await apiProds.guardarProductosBD(nuevoProducto);

            respuesta.send(`${productoCreado}, Producto/s creado/s con exito`);
        } catch (error) {
            await LOGGER_UTILS.addLog(error);
            respuesta.send(`${error}, Error al craer el producto solicitado`)
        }
    };

    eliminarProdXid = async (solicitud, respuesta) => {
        try {
            const { id } = solicitud.params;

            await apiProds.eliminarProductosXid(id);

            respuesta.send('Producto eliminado con exito');
        } catch (error) {
            respuesta.send(`${error}, Error al eliminar el producto solicitado`)

        }
    };

    eliminarTodosProds = async (solicitud, respuesta) => {
        try {
            await apiProds.eliminarTodosProductos();

            respuesta.send('Productos eliminados con exito');
        } catch (error) {
            respuesta.send(`${error}, Error al eliminar los productos solicitados`)
        }
    };
}

export default ControladorProductos;



