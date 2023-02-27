
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~| Testeo con Axios y Assert |~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

import axios from 'axios';
import { strict as assert } from 'assert';

//* ACLARACION: levantar el servidor pa' que funque

const enviarData = arrayElementos => axios.post('http://localhost:8080/api/axios/guardar', { arrayElementos });

const recibirData = () => axios.get('http://localhost:8080/api/axios/obtener');

const actualizarData = arrayActualizar => axios.put('http://localhost:8080/api/axios/actualizar', { arrayActualizar });

const eliminarData = () => axios.delete('http://localhost:8080/api/axios/eliminar');



describe('Prueba funcionalidad API REST Productos', () => {

    //* ( get x id: /:id || todos: / )
    it('Debería obtener un producto', async () => {
        assert.strictEqual(recibirData(1).length, 1)
        assert.deepStrictEqual(respuesta.statusCode, 200)
    })

    it('Debería obtener todos los productos', async () => {
        assert.strictEqual(recibirData().length, 2)
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
        const respuesta = assert.strictEqual(enviarData(nuevoProducto), `${productoCreado}, Producto/s creado/s con exito`)
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
        const respuesta = assert.strictEqual(actualizarData(actualizarProducto), `${productoActualizado}, Producto actualizado con exito`)
        assert.deepStrictEqual(respuesta.statusCode, 200)
        assert.deepStrictEqual(respuesta.length, 2)
    })

    it('Debería eliminar un productos', async () => {
        const respuesta = assert.strictEqual(eliminarData(2), 'Producto eliminado con exito')
        assert.deepStrictEqual(respuesta.statusCode, 200)
        assert.deepStrictEqual(respuesta.length, 1)
    })

    it('Debería eliminar todos los productos', async () => { //eliminarTodosProds
        const respuesta = assert.strictEqual(eliminarData(), 'Productos eliminados con exito')
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
        const errorEsperado = new Error(400)
        assert.throws(() => {
            enviarData(nuevoProducto)
        }, errorEsperado)
    })

    it('Deberia dar error cuando falta/no existe el id para eliminar un producto', async () => {
        const errorEsperado = new Error(400)
        assert.throws(() => {
            eliminarData(7)
        }, errorEsperado)
    })

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


        // const respuesta = assert.strictEqual(eliminarData(a).length, 1)
        // assert.deepStrictEqual(respuesta.status, 400)