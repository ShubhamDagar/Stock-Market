import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const HoldingSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
        required: true
    },
    stock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock',
        required: true,
    },
    purchasedAt: {
        type: Number,
        required: true
    },
    soldedAt: {
        type: Number,
        required: true,
        default: 500
    },
    quantity: {
        type: Number,
        required: true
    }
});


const Holding = mongoose.model('Holding', HoldingSchema)

export default Holding