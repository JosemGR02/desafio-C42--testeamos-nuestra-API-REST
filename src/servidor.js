
import mongoose from "mongoose";
import session from 'express-session';
import MongoStore from 'connect-mongo';
import __dirname from "./dirname.js";
import passport from "passport";
import cluster from 'cluster';
import _yargs from 'yargs';
import { app } from './servidor.js';
import { hideBin } from 'yargs/helpers';
const yargs = _yargs(hideBin(process.argv));
import { INFO_UTILS } from './Utilidades/index.js';
import { PassportAutenticacion } from './Servicios/index.js';
import { config } from './Configuracion/config.js';
import { logger } from './Configuracion/logger.js';




const mongOptiones = { useNewUrlParser: true, useUnifiedTopology: true }

// Sesion Mongo
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: process.env.BASEDATOS_MONGO_URL,
            dbName: process.env.BASEDATOS_MONGO_NOMBRE,
            mongOptiones,
            ttl: 600,
            collectionName: 'sesionesMC',
            autoRemove: 'native'
        }),
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        rolling: false,
        cookie: {
            maxAge: 600000,
        },
    })
);

// Passport
PassportAutenticacion.iniciar()
app.use(passport.initialize());
app.use(passport.session());

// Yargs
const args = yargs
    .default({
        modo: "FORK",
        puerto: 8080,
    })
    .alias({
        m: "modo",
        p: "puerto",
    })
    .argv;

export const PUERTO = config.SERVER.PUERTO || args.puerto

// const LOGGER = args.logger || DEV


// Modo de ejecucion 
if (process.env.MODO_CLUSTER == true) {  // args.modo == 'CLUSTER' 
    if (cluster.isPrimary) {
        logger.info('Ejecucion en Modo Cluster')
        logger.info(`Primario corriendo con el id: ${process.pid} -- Puerto ${args.puerto}`);

        for (let i = 0; i < INFO_UTILS.procesadoresdCpus; i++) {
            cluster.fork();
        }

        cluster.on('exit', worker => {
            logger.info(`El trabajador con el id:${worker.process.pid} ha finalizado.`, new Date().tolocaleString());
            cluster.fork();
        });
    } else {
        // Servidor
        app.listen(PUERTO, async () => {
            logger.info(`Servidor escuchando en el puerto: ${PUERTO}, Trabajador iniciado con el id: ${process.pid}`);
            try {
                await mongoose.connect(process.env.BASEDATOS_MONGO_URL, mongOptiones);
                logger.info("Conectado a Base de Datos Mongo");
            } catch (error) {
                logger.error(`Error en conexión de Base de datos: ${error}`);
            }
        })
        app.on("error", (error) => logger.error(`Error en servidor ${error}`));
    }
} else {
    logger.info('Ejecucion en Modo Fork')
    logger.warn(`Prueba implementada, xd`)
    // let fork = false
    // if (!fork) logger.error(`erororor`)

    // Servidor
    app.listen(PUERTO, async () => {
        logger.info(`Servidor escuchando en el puerto: ${PUERTO}, Trabajador iniciado con el id: ${process.pid}`);
        try {
            await mongoose.connect(process.env.BASEDATOS_MONGO_URL, mongOptiones);
            logger.info("Conectado a Base de Datos Mongo");
        } catch (error) {
            logger.error(`Error en conexión de Base de datos: ${error}`);
        }
    })
    app.on("error", (error) => logger.error(`Error en servidor ${error}`));
}

