
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| DTO - Carritos |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


class CarritosDTO {
    constructor({ timestamp, usuario, productos }) {   //timestamp
        this.timestamp = timestamp
        this.usuario = usuario
        this.productos = productos
    }
}

export function usandoDTO(elemento) {
    if (Array.isArray(elemento))
        return elemento.map(item => new CarritosDTO(item))
    else
        return new CarritosDTO(elemento)
}


export default { CarritosDTO };