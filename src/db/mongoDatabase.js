import mongoose from "mongoose";


const uri = "mongodb+srv://neonhero322:kilalu15@cluster0.pdyvxvi.mongodb.net/HerbalWebManager?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}


export default connect;