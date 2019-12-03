import mongoose from 'mongoose';

var ServiceInOutSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.ObjectId,
        trim: true
    },
    inQty: {
        type: Number,
        default: 0
    },
    outQty: {
        type: Number,
        default: 0
    },
    purchaseAmount: {
        type: Number,
        default: 0
    },
    supplierName: {
        type: String,
        trim: true
    },
    serviceDate: {
        type: Date
    },
    status: {
        type: Number,
        default: 1    
    }
});

export default mongoose.model('ServiceInOut', ServiceInOutSchema);