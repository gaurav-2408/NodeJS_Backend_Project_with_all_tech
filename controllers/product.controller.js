// controller will have logic of API
const logger = require('../utils/logger.js')
const Product = require('../models/product.model.js') 


const getProducts = async(req, res) =>{
    try {
        const product = await Product.find({})
        res.status(200).json(product)
    } catch (error) {
        logger.error(error.message)
        res.status(500).json({message: error.message})
    }
}

const getProduct = async(req, res) => { 
    const productId = req.params.id
    try {
        const product = await Product.findById(productId)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createProduct = async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateProduct = async(req, res) => {
    const productId = req.params.id
    try {
        const product = await Product.findByIdAndUpdate(productId, req.body)
        if(product){
            const updatedProduct = await Product.findById(productId)
            return res.status(200).json(updatedProduct)
        }else{
            return res.status(400).json({message: `Product not found`})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteProduct = async(req, res) => {
    const productId = req.params.id

    try {
        const product = await Product.findByIdAndDelete(productId, req.body)
        if(product){
            //const updatedProduct = await Product.findById(productId)
            return res.status(200).json({message: `Product deleted Successfully`})
        }else{
            return res.status(400).json({message: `Product not found`})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}