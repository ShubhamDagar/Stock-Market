import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import  passportLocalMongoose from 'passport-local-mongoose';

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
    currentHoldings: {
        type: Array
    },
    previousPurchase: {
        type: Array
    }
});


const User = mongoose.model('User', UserSchema)

export default User