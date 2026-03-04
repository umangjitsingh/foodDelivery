
import {connect} from "mongoose";

const mongoDB_url: string = process.env.MONGODB_URL!;

if (!mongoDB_url) {
    throw new Error("Wrong/Missing DB connection String");
}

if (!global.mongoose) {
    global.mongoose = { conn: null, promise: null };
}

const connectDB = async  ()=> {
    if (global.mongoose.conn) {
        console.log("DB connected from CACHE");
        return global.mongoose.conn;
    }

    if (!global.mongoose.promise) {
        
        // @ts-ignore
        global.mongoose.promise =  connect(mongoDB_url,{
                dbName: "FoodDelivery"
            }
        ).then((m) => m);
    }

    global.mongoose.conn = await global.mongoose.promise;
    console.log("DB connected");
    return global.mongoose.conn;
};

export default connectDB;