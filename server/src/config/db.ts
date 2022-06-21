import mongoose from "mongoose";
import { Color } from "colors";
export const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI!);

    console.log(`MongoDb connected : ${conn.connection.host}`)


}

