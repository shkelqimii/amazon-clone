const router = require('express').Router();
const Product = require('../models/product');

const upload = require("../middlewares/upload-photo");
const category = require('../models/category');
const product = require('../models/product');
// POST CREATE
router.post('/products',upload.single("photo"), async(req, res)=> {
    try {
        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.file.location;
        product.stockQuantity = req.body.stockQuantity;

        await product.save();

        res.json({
            status:true,
            message: "Successfully saved"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
// GET ALL PRODUCTS
router.get("/products", async (req, res) => {
    try {
        let products = await Product.find();
        res.json({
            success: true,
            products: products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

// GET SINGLE PRODUCT

router.get("/products/:id", async (req, res) => {
    try {
        let product = await Product.findOne({ _id: req.params.id});
        res.json({
            success: true,
            product: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

// PUT UPDATE SINGLE PRODUCT
router.put("/products/:id", async (req, res) => {
    try {
        let product = await Product.findOneAndUpdate({ _id: req.params.id}, {
            $set: {
                title: req.body.title,
                price: req.body.price,
                category: req.body.category,
                photo: req.file.location.photo,
                category: req.body.category,
                description: req.body.description,
                owner: req.body.ownerID
            }
        },{
            upsert: true
        });
        
        res.json({
            success: true,
            updatedProduct: product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

// DELETE SINGLE PRODUCT
router.delete('/products/:id', async(req, res) => {
    try {
        let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id});

        if(deletedProduct) {
            res.json({
                status: true,
                message: "Successfully deleted"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})


module.exports = router;