// backend/routes/product.routes.js
import express from 'express';
const router = express.Router();
import Product from '../models/product.model.js'; // Correct import for Product model
import cloudinary from 'cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET all inventory items
router.get('/', async (req, res) => { // Changed to router.get for clarity
    try {
        const { page = 1, limit = 10, q, category, _sort, _order } = req.query;
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;

        let filter = {};
        if (q) {
            filter.$or = [
                { productName: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ];
        }
        if (category) {
            filter.collectionID = parseInt(category);
        }

        const sort = {};
        if (_sort) {
            sort[_sort] = _order === 'desc' ? -1 : 1;
        }

        const totalItems = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalItems / limitNumber);

        const items = await Product.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limitNumber);

        res.json({ items, totalPages });
    } catch (error) { // Changed err to error for clarity
        console.error(error);
        res.status(500).json({ message: 'Error fetching inventory items', error });
    }
});

// GET inventory item by ID
router.get('/:id', async (req, res) => { // Changed to router.get for clarity
    try {
        const product = await Product.findById(req.params.params.id); // Access id from params
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) { // Changed err to error for clarity
        console.error(error);
        res.status(500).json({ message: 'Error fetching product', error });
    }
});

// POST - Create new inventory item with image upload
router.post('/', upload.array('images', 5), async (req, res) => { // Changed to router.post for clarity
    try {
        const { productName, description, price, stockQuantity, collectionID, size, color } = req.body;
        const files = req.files;

        const imageUrls = [];
        if (files && files.length > 0) {
            for (const file of files) {
                const result = await cloudinary.uploader.upload(file.buffer.toString('base64'), {
                    folder: 'ecommerce-inventory-images'
                });
                imageUrls.push(result.secure_url);
            }
        }

        const newProduct = new Product({
            productName,
            description,
            price: parseFloat(price),
            stockQuantity: parseInt(stockQuantity),
            collectionID: parseInt(collectionID),
            size,
            color,
            imageUrls: imageUrls
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) { // Changed err to error for clarity
        console.error(error);
        res.status(400).json({ message: 'Error creating product', error });
    }
});


// PUT - Update inventory item
router.put('/:id', async (req, res) => { // Changed to router.put for clarity
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) { // Changed err to error for clarity
        console.error(error);
        res.status(400).json({ message: 'Error updating product', error });
    }
});

// DELETE - Delete inventory item
router.delete('/:id', async (req, res) => { // Changed to router.delete for clarity
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (error) { // Changed err to error for clarity
        console.error(error);
        res.status(500).json({ message: 'Error deleting product', error });
    }
});

export default router; // Use export default for ES Modules