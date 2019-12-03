import mongoose from 'mongoose';

var CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Number,
        default: 1    
    }
});

export default mongoose.model('Category', CategorySchema);