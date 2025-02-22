// backend/routes/collection.routes.js
import express from 'express';
const router = express.Router();
import Collection from '../models/collection.model.js'; // Correct import for Collection model

// GET all collections
router.get('/', async (req, res) => { // Changed to router.get for clarity
    try {
        const collections = await Collection.find();
        res.json(collections);
    } catch (error) { // Changed err to error for clarity
        console.error(error);
        res.status(500).json({ message: 'Error fetching collections', error });
    }
});

export default router; // Use export default for ES Modules