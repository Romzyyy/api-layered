// layer untuk handle reques dan response
// biasanya juga handle validasi dan body
const express = require('express')
const {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    editProductById,
} = require('./product.service')

const router = express.Router()

router.get('/', async (req, res) => {
    const products = await getAllProducts()
    res.send(products)
})

router.get('/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id)
        const product = await getProductById(parseInt(productId))
        res.send(product)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/', async (req, res) => {
    try {
        const newProductData = req.body
        const product = await createProduct(newProductData)
        res.send({
            data: product,
            message: 'created product succes',
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        await deleteProductById(parseInt(productId))
        res.send('product deleted')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.put('/:id', async (req, res) => {
    const productId = req.params.id
    const productData = req.body

    if (
        !(
            productData.name &&
            productData.price &&
            productData.description &&
            productData.image
        )
    ) {
        return res.status(400).send('some field are missing')
    }

    const product = await editProductById(parseInt(productId), productData)

    res.send({
        data: product,
        message: 'product updated',
    })
})

router.patch('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const productData = req.body

        const product = await editProductById(parseInt(productId), productData)

        res.send({
            data: product,
            message: 'product updated',
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router
