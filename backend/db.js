const mongoose = require('mongoose');
require("dotenv").config();
const mongoURL = process.env.MONGODB_URI; 
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;




