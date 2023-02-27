
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Controlador Mensajes |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { apiMsjs } from "../../Api/index.js";
import { FECHA_UTILS, ERRORES_UTILS, LOGGER_UTILS } from "../../Utilidades/index.js";


class ControladorMensajes {

    constructor() {
        this.apiMsjs = new ApiMensajes()
    }

    ObtenerMensajes = async (solicitud, respuesta) => {
        try {
            const mensajes = await apiMsjs.obtenerTodosMensajes();

            if (!mensajes) {
                return respuesta.send({ error: ERRORES_UTILS.MESSAGES.ERROR_MENSAJES });
            }
            respuesta.send(mensajes);

            return { mensajes }
        } catch (error) {
            respuesta.send(`${error}, Error al obtener los mensajes solicitados`)
        }
    };

    CrearMensaje = async (solicitud, respuesta) => {
        try {
            const { autor, id, nombre, apellido, edad, alias, avatar, texto } = solicitud.body;

            const nuevoMensaje = await apiMsjs.guardarMensajesBD({
                autor, id, nombre, apellido, edad, alias, avatar, texto,
                timestamp: FECHA_UTILS.getTimestamp(),
            });

            const mensajeCreado = await apiMsjs.guardarMensajesBD(nuevoMensaje);

            respuesta.send({ success: true, mensaje: mensajeCreado });
            return mensajeCreado
        } catch (error) {
            await LOGGER_UTILS.addLog(error);
            respuesta.send(`${error}, Error al crear el mensaje solicitado`)
        }
    };
}

export default ControladorMensajes;

