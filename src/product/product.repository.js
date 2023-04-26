//berkomunikasi dengan database
//boleh pakek ORM, oleh raw query
//supaya apa? klo mau ganti2 orm tingal edit file ini ajh

const prisma = require('../db')

const findProducts = async () => {
    const products = await prisma.product.findMany()
    return products
}

const findProductById = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id,
        },
    })
    return product
}

module.exports = {
    findProducts,
    findProductById,
}
