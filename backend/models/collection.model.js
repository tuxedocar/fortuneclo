// backend/models/collection.model.js
import mongoose from 'mongoose'; // Correct import for Mongoose
const { Schema } = mongoose;

const collectionSchema = new Schema({
    collectionID: { type: Number, unique: true }, // Optional - consider removing for MongoDB auto _id
    collectionName: { type: String, required: true },
    description: String,
}, {
    timestamps: true,
});

const Collection = mongoose.model('Collection', collectionSchema);
export default Collection; // Use export default for ES Modules