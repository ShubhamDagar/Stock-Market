import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const con = await mongoose.connect('mongodb+srv://ShubhamDagar:dmWiT5Puij7pYGvZ@shieldstocks.9yhlkio.mongodb.net/?retryWrites=true&w=majority&appName=ShieldStocks', { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB;
