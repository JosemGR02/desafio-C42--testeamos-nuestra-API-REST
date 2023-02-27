
import { Router } from "express"
import { ControladorMensajes } from "../../Controladores/index.js";

const ruta = Router()


class RutaMensaje {

    constructor() {
        this.controladorMsjs = new ControladorMensajes();
    }

    start() {
        ruta.get("/", this.controladorMsjs.ObtenerMensajes);

        ruta.post("/", this.controladorMsjs.CrearMensaje);

        return ruta
    }
}

export default RutaMensaje;

