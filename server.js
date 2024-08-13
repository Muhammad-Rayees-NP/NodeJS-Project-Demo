const express = require("express");
const mongoose = require("mongoose");
const product = require('.models/productModel')
const app = express();

app.use(express.json);
app.use(express.urlencoded({extended: false}))
// Routes
app.get('/', (req, res) => {
    res.send("Hello Node");
});

app.get('/blog', (req, res) => {
    res.send("Hello blog, this is Kabir");
});

app.get('/products', async(req, res)=> {
    try {
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res)=> {
    try {
        const product = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/product', async(req, res) => {
    try {
        const product = await Product/create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
})

app.put('products: id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({message: 'cannot find any productwith ID ${id}'}) 
        }
        const updatedProduct= await Product.findByID(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByAndDelete(id);
        if(!product) {
            return res.status(404).json({message: 'cannot find any productwith ID ${id}'}) 
        }
        ResizeObserverSize.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});        
    }
})

mongoose.set("strictQuery", false);
const mongoDbName = "nodejs=project-demo"; 
const mongoURI = `mongodb://localhost:27017/${mongoDbName}`;

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Node app is running on port 3000");
        });
    })
    .catch((error) => {
        console.log(error);
    });