
// import mongoose from 'mongoose';
import { usandoDTO } from '../dtos/PersonaDTO.js';
import { logger } from '../../Configuracion/logger.js';
import mongodb from 'mongodb';
const { MongoClient } = mongodb;


class ContenedorMongoBD extends contenedorBase { //getNext_Id

    constructor(basedatos, coleccion) {
        super()
            (async () => {
                logger.info('Conectando a la Base de datos MongoBD...')

                const conexion = await MongoClient.connect('mongodb://localhost', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                const baseDatosMongo = conexion.db(basedatos);
                this._coleccion = baseDatosMongo.collection(coleccion);

                logger.info('La conexión con MongoBD fue establecida con exito')
            })()
    }

    obtenerElementos = async _id => {
        try {
            if (_id) {
                console.log(_id)
                const respuesta = await this._collection.findOne({ _id: ObjectId(_id) })
                // return [noticia]
                return usandoDTO([respuesta])
            }
            else {
                const respuestas = await this._collection.find({}).toArray()
                // return noticias;
                return usandoDTO(respuestas)
            }
        }
        catch (error) {
            logger.error(`${error}, Error al obtener el/los elemento/s seleccionado/s`);
        }
    }

    obtenerUno = async opciones => {
        try {
            const respuesta = await this._coleccion.findOne(opciones).lean().exec();
            return usandoDTO(respuesta)
        }
        catch (error) {
            logger.error(`${error}, Error al obtener le elemento seleccionado`);
        }
    }

    guardar = async elemento => {
        try {
            await this._collection.insertOne(elemento);
            // return noticia
            return usandoDTO(elemento)
        }
        catch (error) {
            logger.error(`${error}, Error al guardar un elemento`);
            return elemento
        }
    }

    actualizar = async (_id, elemento) => {
        try {
            await this._collection.updateOne({ _id: ObjectId(_id) }, { $set: elemento });
            // return elemento
            return usandoDTO(elemento)
        }
        catch (error) {
            logger.error(`${error}, Error al actualizar un elemento`);
            return elemento
        }
    }

    eliminarXid = async _id => {
        let noticiaBorrada = usandoDTO({}, _id, null)
        try {
            await this._collection.deleteOne({ _id: ObjectId(_id) })
            return noticiaBorrada
        }
        catch (error) {
            logger.error(`${error}, Error al eliminar un elemento`);
            return noticiaBorrada
        }
    }

    async eliminarTodos() {
        try {
            await this._coleccion.deleteMany({})
        }
        catch (error) {
            logger.error(`${error}, Error al eliminar todos los elementos`);
        }
    }
}

export default { ContenedorMongoBD };




// obtenerNoticias = async _id => {
//     try {
//         // MONGO
//         // FINDONE => {}
//         // FIND => [{},{},...,{}]
//         if (_id) {
//             console.log(_id)
//             const noticia = await this._collection.findOne({ _id: ObjectId(_id) })
//             console.log(noticia)
//             return [noticia]
//         }
//         else {
//             const noticias = await this._collection.find({}).toArray()
//             return noticias;
//         }
//     }
//     catch (error) {
//         console.log('obtenerNoticias error', error)
//     }
// }

// guardarNoticia = async noticia => {
//     try {
//         await this._collection.insertOne(noticia);
//         return noticia
//     }
//     catch (error) {
//         console.log('guardarNoticia error', error)
//         return noticia
//     }

// }

// actualizarNoticia = async (_id, noticia) => {
//     try {
//         await this._collection.updateOne({ _id: ObjectId(_id) }, { $set: noticia });
//         return noticia
//     }
//     catch (error) {
//         console.log('actualizarNoticia error', error)
//         return noticia
//     }
// }

// borrarNoticia = async _id => {
//     let noticiaBorrada = noticiaDTO({}, _id, null)
//     try {
//         await this._collection.deleteOne({ _id: ObjectId(_id) })
//         return noticiaBorrada
//     }
//     catch (error) {
//         console.log('borrarNoticia error', error)
//         return noticiaBorrada
//     }
// }


// dudas !!

// async desconectar() {
//     await mongoose.disconnect()
//     logger.info('La conexion con MongoBD, ha sido desconectada correctamente')
// }

// async obtenerTodos() {
//     const respuesta = await this._coleccion.find({})            // this.model
//     return usandoDTO(respuesta)
// }

// async obtenerXid(id) {
//     const respuesta = await this._coleccion.findById(id);
//     return usandoDTO(respuesta)
// }

// async guardar(elemento) {
//     await this._coleccion.create(elemento)
//     return usandoDTO(elemento)
// }

// async actualizar(id, nuevosDatos) {
//     const respuesta = await this._coleccion.findOneAndUpdate({ id: id }, { $set: nuevosDatos })
//     return usandoDTO(respuesta)
// }

// async obtenerTelefono(numero) {
//     // const respuesta = await this._coleccion.findOne(numero).lean().exec();
//     const respuesta = await this._coleccion.find(usuario => usuario.telefono == numero);
//     // const respuesta = await this._coleccion.find(telefono => usuario.telefono == numero);
//     return respuesta;
// }

// async eliminarXid(id) {
//     const respuesta = await this._coleccion.findOneAndDelete({ id: id })
//     // const respuesta = await this.collection.findByIdAndDelete(id);
//     return usandoDTO(respuesta)
// }

// async eliminarTodos() {
//     await this._coleccion.deleteMany({})
// }