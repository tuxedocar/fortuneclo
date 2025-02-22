// backend/models/product.model.js
import mongoose from 'mongoose'; // Correct import for Mongoose
const { Schema } = mongoose;

const productSchema = new Schema({
    productID: { type: Number, unique: true }, // Optional - consider removing for MongoDB auto _id
    collectionID: { type: Number, required: true },
    productName: { type: String, required: true },
    description: String,
    size: String,
    color: String,
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    imageUrls: [{ type: String }],
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
export default Product; // Use export default for ES Modules