
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Ruta Carrito Compra |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { Router } from "express";
import { ControladorCarritos } from '../../Controladores/index.js';

const ruta = Router();


class RutaCarrito {

    constructor() {
        this.controladorCarts = new ControladorCarritos();
    }

    start() {
        ruta.get("/compra", (solicitud, respuesta) => {
            respuesta.render("view/cart");
        });

        ruta.post('/compra', this.controladorCarts.procesarPedido);

        return ruta
    }
}

export default RutaCarrito;



