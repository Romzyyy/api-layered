//sevice layer bertujuan untuk handle business logic
//kenapa di pisah? supaya tanggung jawabnya terisolate, dan functionnya reusable

const prisma = require('../db')
const { findProducts, findProductById } = require('./product.repository')

const getAllProducts = async () => {
    const products = await findProducts()

    return products
}

const getProductById = async (id) => {
    const product = await findProductById(id)
    if (!product) {
        throw Error('product not found')
    }

    res.send(product)
}

const createProduct = async (newProductData) => {
    const product = await prisma.product.create({
        data: {
            name: newProductData.name,
            price: newProductData.price,
            description: newProductData.description,
            image: newProductData.image,
        },
    })

    return product
}

const deleteProductById = async (id) => {
    await getProductById(id)
    await prisma.product.delete({
        where: {
            id,
        },
    })
}

const editProductById = async (id, producData) => {
    await getProductById(id)
    const product = await prisma.product.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name: productData.name,
            description: productData.description,
            image: productData.image,
            price: productData.price,
        },
    })

    return product
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    editProductById,
}
