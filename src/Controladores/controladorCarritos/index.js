
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Controlador Carrito Compra |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { ApiCarritos } from '../../Api/index.js';
import { transporter, client } from '../../Servicios/index.js';
import { logger } from '../../Configuracion/logger.js';


class ControladorCarritos {

    constructor() {
        this.apiCarts = new ApiCarritos()
    }

    procesarPedido = async (solicitud, respuesta, next) => {
        try {
            const carrito = solicitud.body;

            logger.info({ carrito });

            const pedido = await apiCarts.guardarCarritoBD(carrito);

            if (pedido.length === 0) logger.warn("El carrito no tiene productos todavia")
            if (!pedido) {
                throw new Error('El carrito no existe');
            }

            let mensaje = "El carrito contiene: "
            const pedidoCompra = pedido.forEach(producto => { mensaje += `${producto},` });

            logger.info({ mensaje });

            if (solicitud.isAuthenticated()) {
                if (solicitud.user.nombre) {  // carrito.usuario.nombre === solicitud.usuario.nombre 

                    const carrito = [];

                    carrito.usuario.nombre = solicitud.user.nombre;
                    carrito.usuario.email = solicitud.user.usuario;
                    carrito.usuario.telefono = solicitud.user.telefono;
                    carrito.productos = pedidoCompra;

                    // envio Email
                    let envioEmail = {
                        from: "Remitente",
                        to: config.EMAIL.USUARIO,
                        subject: `Nuevo pedido: ${carrito.productos}, de: ${carrito.usuario.nombre}, ${carrito.usuario.email}`,
                        text: `Productos solicitados por el usuario: ${carrito.productos}`
                    };

                    let info = transporter.sendMail(envioEmail, (error, info) => {
                        if (error) {
                            logger.error("Error al enviar mail: " + error);
                        } else {
                            logger.info("El email fue enviado correctamente: %s", info.messageId);
                            logger.info("Vista previa a URL: %s", nodemailer.getTestMessageUrl(info));
                        }
                    });

                    // envio SMS
                    const envioSMS = await client.messages.create({
                        body: "Su pedido ya ha sido recibido y esta en proceso",
                        from: config.WHATSAPP.NRO_TWILIO,
                        to: carrito.usuario.telefono
                    });

                    logger.info(`Mensaje SMS enviado correctamente ${envioSMS}`);

                    // envio Whatsapp
                    const envioWhatsapp = await client.messages.create({
                        body: `Nuevo pedido: ${carrito.productos}, de: ${carrito.usuario.nombre}, ${carrito.usuario.email}`,
                        from: config.WHATSAPP.NRO_TWILIO,
                        to: `whatsapp:${carrito.usuario.telefono}`
                    });

                    logger.info(`Mensaje SMS enviado correctamente ${envioWhatsapp}`);

                    logger.info('Pedido procesado con exito')
                    respuesta.render('view/home', { carrito: carrito.productos });
                } else {
                    throw new Error("El carrito seleccionado no pertenece a tu usuario");
                }

            } else {
                throw new Error("Debes estar autenticado para enviar pedidos");
            }
        } catch (error) {
            next(error);
        }
    }
}

export default ControladorCarritos;


