import mongoose from 'mongoose';

var ItemSchema = new mongoose.Schema({
    itemCode: {
        type: String,
        required: true,
        trim: true
    },
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    unitName: {
        type: String,
        trim: true
    },
    categoryId: {
        type: mongoose.Schema.ObjectId,
        trim: true
    },
    supplierName: {
        type: String,
        trim: true
    },
    purchasePrice: {
        type: Number,
        trim: true
    },
    qty: {
        type: Number,
        default: 0
    },
    warrentyStart: {
        type: Date
    },
    warrentyDuration: {
        type: String,
        trim: true
    },
    itemInDate: {
        type: Date
    },
    status: {
        type: Number,
        default: 1    
    }
});

export default mongoose.model('Item', ItemSchema);