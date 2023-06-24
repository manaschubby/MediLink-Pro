const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

// Connect to MongoDB Atlas
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected to MongoDB Atlas");
	} catch (error) {
		console.error("Failed to connect to MongoDB Atlas:", error);
	}
};

module.exports = connectDB;
