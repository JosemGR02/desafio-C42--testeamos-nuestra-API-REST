
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Modelos - Usuarios |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import Joi from 'joi'

class ValidacionJoiUsuario {

    constructor(nombre, edad, usuario, avatar, contrasena, telefono, direccion) {
        this.nombre = nombre
        this.edad = edad
        this.usuario = usuario
        this.avatar = avatar
        this.contrasena = contrasena
        this.telefono = telefono
        this.direccion = direccion
    }

    equals(userValidar) {
        if (!(userValidar instanceof ValidacionJoiUsuario)) {
            return false
        }
        if (this.nombre != userValidar.nombre) {
            return false
        }
        if (this.edad != userValidar.edad) {
            return false
        }
        if (this.usuario != userValidar.apellido) {
            return false
        }
        if (this.avatar != userValidar.avatar) {
            return false
        }
        if (this.contrasena != userValidar.contrasena) {
            return false
        }
        if (this.telefono != userValidar.telefono) {
            return false
        }
        if (this.direccion != userValidar.direccion) {
            return false
        }
        return true
    }

    static validar(producto, requerido) {
        const MensajeSchema = Joi.object({
            nombre: requerido ? Joi.string().required() : Joi.string(),
            edad: requerido ? Joi.number().required() : Joi.number(),
            usuario: requerido ? Joi.string().required() : Joi.string(),
            avatar: requerido ? Joi.string().required() : Joi.string(),
            contrasena: requerido ? Joi.number().required() : Joi.number(),
            telefono: requerido ? Joi.number().required() : Joi.number(),
            direccion: requerido ? Joi.string().required() : Joi.string()
        })

        const { error } = MensajeSchema.validate(producto)
        if (error) {
            throw error
        }
    }
}

export default ValidacionJoiUsuario;