const express = require('express')
const dotenv = require('dotenv')

const app = express()
app.use(express.json())
dotenv.config()

const PORT = process.env.PORT

app.get('/api', (req, res) => {
    res.send('hello world')
})

const productController = require('./product/product.controller')

app.use('/products', productController)

app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`)
})
