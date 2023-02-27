
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Repositorio - Carritos |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { config } from '../Configuracion/config.js';
import { DaoFactory } from '../Dao/daoFactory.js';
import { usandoDTO } from '../Dto/carritosDto.js';
import { ValidacionJoiCarrito } from '../Modelos/validacionesJoi/index.js';


class ApiCarritos {

    constructor() {
        this.DaoCarritos = DaoFactory.obtener(config.SERVER.SELECCION_BASEdDATOS);
    }

    async obtenerTodosCarritos() {
        const elementos = await this.DaoCarritos.obtenerTodos();
        return elementos.map(item => new ModeloDtoCarts(item))
    }

    async obtenerCarritoXid(idBuscado) {
        const Dto = await this.DaoCarritos.obtenerXid(idBuscado);
        return new ModeloDtoCarts(Dto);
    }

    async actualizarProductosXid(idBuscado, datos) {
        const actualizado = await this.DaoProductos.actualizar(idBuscado, datos)
        //ApiCarritos.ValidarDatosCarritos(datos, true)
        return new ModeloDtoProds(actualizado)
    }

    async guardarCarritoBD(nuevoElemento) {
        //ApiCarritos.ValidarDatosCarritos(nuevoElemento, true)
        await this.DaoCarritos.guardar(usandoDTO(nuevoElemento));
    }

    async eliminarCarritoXid(idBuscado) {
        const eliminado = await this.DaoCarritos.eliminarXid(idBuscado);
        return new ModeloDtoCarts(eliminado);
    }

    async eliminarTodosCarritos() {
        await this.DaoCarritos.eliminarTodos();
    }

    static ValidarDatosCarritos(carrito, requerido) {
        try {
            ValidacionJoiCarrito.cartValidar(carrito, requerido)
        } catch (error) {
            throw new Error('El carrito posee un formato json invalido o faltan datos: ' + error.details[0].message)
        }
    }
}

export default ApiCarritos;

