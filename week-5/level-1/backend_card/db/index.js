import mongoose from 'mongoose';
import { config } from 'dotenv'
config();

const connectDb = function () {
    try {
        mongoose.connect(process.env.MONGO_URI)
            .then((conn) => {
                console.log(`Connected! to Database -> Connection name : ${conn.connection.host}`);
            })
    }
    catch (e) {
        console.log(e);
    }
}

export default connectDb