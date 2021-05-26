import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    portfolioValue: {
        type: Number
    },
    currentHoldings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Holding'
        }
    ],
    previousPurchase: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Holding'
        }
    ],
    isLocked: {
        type: Boolean,
        default: false
    },
    wrongCount: {
        type: Number,
        default: 0
    },
    money: {
        type: Number,
        default: 100000,
        required: true
    }
}, {
    timestamps: true
});


const User = mongoose.model('User', UserSchema)

export default User