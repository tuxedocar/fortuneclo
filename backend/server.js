// backend/server.js
import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose'; // Correct import for Mongoose
import productRoutes from './routes/product.routes.js';
import collectionRoutes from './routes/collection.routes.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(json());

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB database connection established"))
.catch(error => console.error("MongoDB connection error:", error));

app.use('/api/inventory', productRoutes);
app.use('/api/collections', collectionRoutes);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});