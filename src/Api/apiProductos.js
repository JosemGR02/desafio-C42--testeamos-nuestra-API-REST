
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Repositorio - Productos |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { config } from '../Configuracion/config.js';
import { DaoFactory } from '../Dao/daoFactory.js';
import { usandoDTO } from '../Dto/productosDto.js';
import { ModeloDtoProds } from '../Modelos/validacionesJoi/index.js';


class ApiProductos {

    constructor() {
        this.DaoProductos = DaoFactory.obtener(config.SERVER.SELECCION_BASEdDATOS);
    }

    async obtenerTodosProductos() {
        const elementos = await this.DaoProductos.obtenerTodos()
        return elementos.map(elemento => new ModeloDtoProds(elemento))
    }

    async obtenerProductosXid(idBuscado) {
        const Dto = await this.DaoProductos.obtenerXid(idBuscado)
        return new ModeloDtoProds(Dto)
    }

    async guardarProductosBD(nuevoElemento) {
        //ApiCarritos.ValidarDatosCarritos(nuevoElemento, true)
        await this.DaoProductos.guardar(usandoDTO(nuevoElemento))
    }

    async actualizarProductosXid(idBuscado, datos) {
        //ApiCarritos.ValidarDatosCarritos(datos, true)
        const actualizado = await this.DaoProductos.actualizar(idBuscado)
        return new ModeloDtoProds(actualizado)
    }

    async eliminarProductosXid(idBuscado) {
        const eliminado = await this.DaoProductos.eliminarXid(idBuscado)
        return new ModeloDtoProds(eliminado)
    }

    async eliminarTodosProductos() {
        await this.DaoProductos.eliminarTodos()
    }

    static ValidarDatosProductos(producto, requerido) {
        try {
            ValidacionJoiProducto.prodValidar(producto, requerido)
        } catch (error) {
            throw new Error('El producto posee un formato json invalido o faltan datos: ' + error.details[0].message)
        }
    }
}

export default ApiProductos;