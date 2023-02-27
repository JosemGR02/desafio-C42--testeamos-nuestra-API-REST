
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| DTO - Mensajes |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


class MensajesDTO {
    constructor({ id, nombre, apellido, edad, alias, avatar }) {
        this.id = id
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.alias = alias
        this.avatar = avatar
    }
}

export function usandoDTO(elemento) {
    if (Array.isArray(elemento))
        return elemento.map(item => new MensajesDTO(item))
    else
        return new MensajesDTO(elemento)
}


export default { MensajesDTO };