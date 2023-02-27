
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Testeo con Mocha |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import request from 'supertest';
import { expect } from 'chai';
import { logger } from './Configuracion/logger.js';
import { app } from './app.js';


//* SOLO TESTEO API PRODUCTOS
//? toEqual == to.equal == strictEqual
//? toBe == to.deep == deepStrictEqual 

//*     expect(response.body.numeros).to.deep.equal([2])

describe('Prueba funcionalidad API REST Productos', () => {

    //* ( get x id: /:id || todos: / )
    it('Debería obtener un producto', async () => {
        const respuesta = await request(app).get('/1')
        expect(respuesta.statusCode).to.deep(200)
        expect(respuesta.body).to.deep.equal([1])
    })

    it('Debería obtener todos los productos', async () => {
        const respuesta = await request(app).get('/')
        expect(respuesta.statusCode).to.deep(200)
        expect(respuesta.body).to.deep.equal([1])
    })

    it('Debería crear x productos', async () => {
        const crearProducto = {
            "titulo": "Venture Runner 0474 Nike 6 Csi",
            "descripcion": "Zapatilla de marca nike",
            "precio": 40.000,
            "codigo": "653762376",
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_613954-MLA51371562886_092022-O.webp",
            "stock": 54,
        }
        const respuesta = await request(app).post('/').send({ crearProducto })
        expect(respuesta.statusCode).to.deep(200)
        expect(respuesta.body).to.equal(`${productoCreado}, Producto/s creado/s con exito`)
        expect(respuesta.body).to.deep.equal([2])
    })

    it('Debería actualizar un producto', async () => {
        const actualizarProducto = {
            "titulo": "Venture Runner 0474 Nike 6 Csi",
            "descripcion": "Zapatilla de marca nike",
            "precio": 35.000,
            "codigo": "653762376",
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_613954-MLA51371562886_092022-O.webp",
            "stock": "54",
        }
        const respuesta = await request(app).put('/:id').send({ actualizarProducto })
        expect(respuesta.statusCode).to.deep(200)
        expect(respuesta.body).to.equal(`${productoActualizado}, Producto actualizado con exito`)
    })

    it('Debería eliminar un productos', async () => {
        const respuesta = await request(app).delete('/1')
        expect(respuesta.statusCode).to.deep(200)
        expect(respuesta.text).to.equal('Producto eliminado con exito')
        expect(respuesta.body).to.deep.equal([1])
    })

    it('Debería eliminar todos los productos', async () => {
        const respuesta = await request(app).delete('/')
        expect(respuesta.statusCode).to.deep(200)
        expect(respuesta.text).to.equal('Productos eliminados con exito')
        expect(respuesta.body).to.deep.equal([0])
    })

    it('Deberia dar error cuando falta/n valores al crear un nuevo producto', async () => {
        const crearProducto = {
            "titulo": "Venture Runner 0474 Nike 6 Csi",
            "precio": 40.000,
            "codigo": "653762376",
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_613954-MLA51371562886_092022-O.webp",
            "stock": 54,
        }
        const respuesta = await request(app).post('/').send({ crearProducto })
        expect(respuesta.statusCode).to.deep(400) // en mocha muestra que lo tiene en "status" solo
        expect(respuesta.text).to.include.key('descripcion', 'stock') // comprobar si tiene estos valores
    })

    it('Deberia dar error cuando falta/no existe el id para eliminar un producto', async () => {
        const respuesta = await request(app).delete('/7')
        expect(respuesta.statusCode).to.deep(400)
    })

    before(() => {
        logger.info('\n++++++++++| Comienzo de los Testeos |++++++++++')
    })

    after(() => {
        logger.info('\n<<<<<<<<<<| Final de los Testeos |>>>>>>>>>>>')
    })

    beforeEach(() => {
        logger.info('\n~~~~~~~~~~~~| Comienzo Test |~~~~~~~~~~~~')
    })

    afterEach(() => {
        logger.info('\n~~~~~~~~~~~~| Final del Test |~~~~~~~~~~~~')
    })
})



// describe("Comprobando que el servidor funcione bien", () => {
//     it(' guardar', async () => {
//         const numero = 2
//         const response = await request(app).post('/ingreso').send({ numero })
//         expect(response.status).to.equal(200)
//         expect(response.text).to.equal(`Número ${numero} almacenado`)
//     })
//     it('recibir ', async () => {
//         const response = await request(app).get('/egreso')
//         expect(response.body.numeros).to.deep.equal([2])
//     })
// })

// it(' guardar', async () => {
//     const numero = 2
//     const response = await request(app).post('/ingreso').send({ numero })
//     expect(response.status).to.equal(200)
//     expect(response.text).to.equal(`Número ${numero} almacenado`)
// })
// it('recibir ', async () => {
//     const response = await request(app).get('/egreso')
//     expect(response.body.numeros).to.deep.equal([2])
// })
