
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| DAO - Factory |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { config } from '../../Configuracion/config.js';
import { ContenedorFileSystem } from '../Contenedores/contenedorFileSystem.js';
// import { ContenedorMongoBD } from '../Contenedores/contenedorMongoBD.js';
import { ContenedorMemoria } from '../Contenedores/contenedorMemoria.js';
import { ContenedorMongodbMensaje, ContenedorMongodbCarrito, 
    ContenedorMongodbUsuario, ContenedorMongodbProducto 
} from '../Dao/esquemasMongoose/index.js';


const almacenamientoEnArchivo = './baseDatosFilesystem.txt'

const urlConexionBD = (config.DATABASES.mongo.url, {
    dbName: config.DATABASES.mongo.dbName,
})


class DaoFactory {
    static obtener(tipoBaseDatos) {

        switch (tipoBaseDatos) {
            case 'Mem': return new ContenedorMemoria()
            case 'File': return new ContenedorFileSystem(process.cwd() + almacenamientoEnArchivo)
            //await Dao.iniciar();
            case 'Mongo': { 
                // Dao = new ContenedorMongoBD(urlConexionBD, 'elementos'),
                Dao = new ContenedorMongodbMensaje(urlConexionBD, 'mensajes'),
                Dao = new ContenedorMongodbCarrito(urlConexionBD, 'carritos'),
                Dao = new ContenedorMongodbUsuario(urlConexionBD, 'usuarios'),
                Dao = new ContenedorMongodbProducto(urlConexionBD, 'productos')
                return Dao;
                //await Dao.iniciar();
                //break
            }
            default: return new ContenedorMemoria()
        }
    }
}

// class DaoFactory {
//     static obtenerDAO() {
//         return { Dao, DaoProdMongo, DaoCartMongo, DaoMsjMongo, DaoUserMongo }
//     }
// }

export default DaoFactory;



//await DaoProdMongo.iniciar();
//await DaoCartMongo.iniciar();
//await DaoMsjMongo.iniciar();
//await DaoUserMongo.iniciar();


// class DaoFactory {
//     static obtener(tipoBaseDatos) {

//         switch (tipoBaseDatos) {
//             case 'Mem': return new ContenedorMemoria()
//             case 'File': return new ContenedorFileSystem(process.cwd() + almacenamientoEnArchivo)
//             case 'Mongo': 
//                 return
//                     // new ContenedorMongoBD(urlConexionBD, 'elementos'),
//                     new ContenedorMongodbMensaje(urlConexionBD, 'mensajes'),
//                     new ContenedorMongodbCarrito(urlConexionBD, 'carritos'),
//                     new ContenedorMongodbUsuario(urlConexionBD, 'usuarios'),
//                     new ContenedorMongodbProducto(urlConexionBD, 'productos'),
            
        
//             default: return new ContenedorMemoria()
//         }
//     }
// }

// export default DaoFactory;


// switch (baseDatosSeleccionada) {
//     case 'Mongo':
//         Dao = new ContenedorMongodbMensaje(urlConexionBD),
//         Dao = new ContenedorMongodbCarrito(urlConexionBD),
//         Dao = new ContenedorMongodbUsuario(urlConexionBD),
//         Dao = new ContenedorMongodbProducto(urlConexionBD)
//         await Dao.iniciar();
//         break
//     case 'File':
//         // if (Dao) return Dao
//         Dao = new ContenedorFileSystem(almacenamientoEnArchivo)
//         await Dao.iniciar();
//         break
//     default:
//         // if (Dao) return Dao
//         Dao = new ContenedorMemoria()
// }

// class DaoFactory {
//     static obtenerDAO() {
//         return Dao
//     }
// }


// export default { DaoFactory };
