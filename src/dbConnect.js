const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("MongoDB connected successfully");
        });
        connection.on("error",(err)=>{
            console.log("MongoDB connection error, Make sure MongoDB is running.", err);
            process.exit();
        });
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};  
module.exports = connectDB;