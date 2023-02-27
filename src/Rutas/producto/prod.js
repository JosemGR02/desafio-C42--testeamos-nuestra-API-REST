
import { Router } from "express";
import { ControladorProductos } from "../../Controladores/index.js";

const ruta = Router();


class RutaProducto {
    constructor() {
        this.controladorProds = new ControladorProductos();
    }

    start() {
        ruta.get("/", controladorProds.obtenerTodosProds);
        ruta.get("/:id", controladorProds.obtenerProdXid);
        ruta.post("/", controladorProds.crearProducto);
        ruta.put("/:id", controladorProds.actualizarProdXid);
        ruta.delete("/:id", controladorProds.eliminarProdXid);
        ruta.delete("/", controladorProds.eliminarTodosProds);

        return ruta
    }
}

export default RutaProducto;

