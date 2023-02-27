
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Testeo con Axios y Assert |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import { apiProductos } from '../../Api/index.js';
import { strict as assert } from 'assert'
// import { existsSync, readFileSync, unlinkSync } from 'fs';


//* SOLO TESTEO API PRODUCTOS


describe('Prueba funcionalidad API REST Productos', () => {

    //* ( get x id: /:id || todos: / )
    it('Debería obtener un producto', async () => {
        assert.deepStrictEqual(this.ApiProds.obtenerProdXid(1).length, 1)
        assert.deepStrictEqual(respuesta.statusCode, 200)
    })

    it('Debería obtener todos los productos', async () => {
        assert.deepStrictEqual(this.ApiProds.obtenerTodosProductos().length, 2)
        assert.deepStrictEqual(respuesta.statusCode, 200)
    })

    it('Debería crear x productos', async () => {
        const nuevoProducto = {
            "titulo": "Venture Runner 0474 Nike 6 Csi",
            "descripcion": "Zapatilla de marca nike",
            "precio": 40.000,
            "codigo": "653762376",
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_613954-MLA51371562886_092022-O.webp",
            "stock": 54,
        }
        const respuesta = assert.strictEqual(this.ApiProds.crearProducto(nuevoProducto), `${productoCreado}, Producto/s creado/s con exito`)
        assert.deepStrictEqual(respuesta.statusCode, 200)
        assert.deepStrictEqual(respuesta.length, 1) //2
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
        const respuesta = assert.strictEqual(this.ApiProds.actualizarProdXid(actualizarProducto), `${productoActualizado}, Producto actualizado con exito`)
        assert.deepStrictEqual(respuesta.statusCode, 200)
        assert.deepStrictEqual(respuesta.length, 2)
    })

    it('Debería eliminar un productos', async () => {
        const respuesta = assert.strictEqual(this.ApiProds.eliminarProdXid(1), 'Producto eliminado con exito')
        assert.deepStrictEqual(respuesta.statusCode, 200)
        assert.deepStrictEqual(respuesta.length, 1)
    })

    it('Debería eliminar todos los productos', async () => { //eliminarTodosProds
        const respuesta = assert.strictEqual(this.ApiProds.eliminarProdXid(), 'Productos eliminados con exito')
        assert.deepStrictEqual(respuesta.statusCode, 200)
        assert.deepStrictEqual(respuesta.length, 0)
    })

    it('Deberia dar error cuando falta descripcion al crear un nuevo producto', async () => {
        const nuevoProducto = {
            "titulo": "Venture Runner 0474 Nike 6 Csi",
            "precio": 40.000,
            "codigo": "653762376",
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_613954-MLA51371562886_092022-O.webp",
            "stock": 54,
        }
        // const respuesta = assert.strictEqual(this.ApiProds.crearProducto(nuevoProducto).length, 1)
        // assert.deepStrictEqual(respuesta.status, 400)
        const errorEsperado = new Error(400)
        assert.throws(() => {
            this.ApiProds.crearProducto(nuevoProducto)
        }, errorEsperado)
    })

    it('Deberia dar error cuando falta/no existe el id para eliminar un producto', async () => {
        // const respuesta = assert.strictEqual(this.ApiProds.eliminarProdXid(a).length, 1)
        // assert.deepStrictEqual(respuesta.status, 400)
        const errorEsperado = new Error(400)
        assert.throws(() => {
            this.ApiProds.eliminarProdXid(7)
        }, errorEsperado)
    })

    // it('debería craer un informe con los resultados obtenidos en resultado.txt', async () => {
    //     await this.ApiProds.crearProducto()
    //     assert.strictEqual(existsSync('resultado.txt'), true)
    // })

    before(() => {
        console.log('\n++++++++++| Comienzo de los Testeos |++++++++++')
    })

    after(() => {
        console.log('\n<<<<<<<<<<| Final de los Testeos |>>>>>>>>>>>')
    })

    beforeEach(() => {
        console.log('\n~~~~~~~~~~~~| Comienzo Test |~~~~~~~~~~~~')
    })

    afterEach(() => {
        console.log('\n~~~~~~~~~~~~| Final del Test |~~~~~~~~~~~~')
    })

    beforeEach(function () {
        this.ApiProds = new apiProductos()
    })

    // afterEach(() => {
    //     if (existsSync('todos.txt')) {
    //         unlinkSync('todos.txt')
    //     }
    // })
})
