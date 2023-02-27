

import axios from "axios";
import { logger } from '../Configuracion/logger.js';


const obtenerTodos = async () => {
    try {
        return await axios.get('[localhost:8080/api/productos/]') //(http://localhost:8080/api/productos-test')%60%60%60)
    } catch (error) {
        logger.info(`error: ${error}, Error en Cliente Axios get`)
    }
}

const obtenerXid = async () => {
    try {
        return await axios.get('[localhost:8080/api/productos/1]') //(http://localhost:8080/api/productos/1')%60%60%60)
    } catch (error) {
        logger.info(`error: ${error}, Error en Cliente Axios get`)
    }
}

const guardar = async () => {
    try {
        return await axios.post('[localhost:8080/api/productos]', { //(http://localhost:8080/api/productos',%7B%60%60%60)
            title: 'Producto de prueba',
            price: 112233,
            thumbnail: '[google.com/imagen]' //(http://google.com/imagen'%60%60%60)
        })
    } catch (error) {
        logger.info(`error: ${error}, Error en Cliente Axios post`)
    }
}
const eliminarXid = async () => {
    try {
        return await axios.delete('[localhost:8080/api/productos/1]') //(http://localhost:8080/api/productos/1')%60%60%60)
    } catch (error) {
        logger.info(`error: ${error}, Error en Cliente Axios delete`)
    }
}

const eliminarTodos = async () => {
    try {
        return await axios.delete('[localhost:8080/api/productos]') //(http://localhost:8080/api/productos')%60%60%60)
    } catch (error) {
        logger.info(`error: ${error}, Error en Cliente Axios delete`)
    }
}

obtenerTodos()

obtenerXid()

guardar()

eliminarXid()

eliminarTodos()


// axios.defaults.baseURL = 'http://localhost:8080'

// try {
//     const respuesta = await axios('/')
//     logger.info(respuesta.data)
// }
// catch (error) {
//     logger.info(error)
// }


// const getProduct = async () => {
//     const products = await getAll()

//     if (products.data) {
//         logger.log(products.data);
//     }
// }

// const getProductById = async () => {

//     const product = await getById()

//     if (product.data) {
//         logger.log(product.data);
//     }
// }

