
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Modelos - Carritos |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import Joi from 'joi'

class ValidacionJoiCarrito {

    constructor(productos, timestamp, usuario) {
        this.productos = productos
        this.usuario = usuario
        this.timestamp = timestamp

    }

    equals(cartValidar) {
        if (!(cartValidar instanceof ValidacionJoiCarrito)) {
            return false
        }
        if (this.productos != cartValidar.productos) {
            return false
        }
        if (this.usuario != cartValidar.usuario) {
            return false
        }
        if (this.timestamp != cartValidar.timestamp) {
            return false
        }
        return true
    }

    static validar(carrito, requerido) {
        const CarritoSchema = Joi.object({
            productos: requerido ? Joi.array().required() : Joi.array(),
            usuario: requerido ? Joi.object().required() : Joi.object(),
            timestamp: requerido ? Joi.string().required() : Joi.string(),
        })

        const { error } = CarritoSchema.validate(carrito)
        if (error) {
            throw error
        }
    }
}

export default ValidacionJoiCarrito;