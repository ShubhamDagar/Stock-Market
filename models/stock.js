import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 10000
    },
    prev: {
        type: Number,
        required: true
    },
    current: {
        type: Number,
        required: true
    }
});


const Stock = mongoose.model('Stock', StockSchema)

export default Stock