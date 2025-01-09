//will have all the apis related to /products

const express = require('express')
const router = express.Router()
const limiter = require('../middleware/rateLimiter.js')
const {getProducts,getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/product.controller.js')

router.get('/', limiter, getProducts)
router.get('/:id', getProduct)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router