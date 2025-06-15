const mongoose = require("mongoose")

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{});
        console.log("Mongo DB connected");
    } catch (error) {
        console.log("Error connecting Mongodb",error);
        process.exit(1);
    }
};

module.exports = connectDB;