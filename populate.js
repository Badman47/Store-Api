
//Env. file for our MONGO_URI key:
require("dotenv").config();

//importing our database connection:
const connectDB = require("../starter/db/connect.js");

// importing our model class:
const Product = require("../starter/models/product.js");

//importing our json script:
const jsonProducts = require("../starter/products.json");

// starting a server request:
const startConnection = async () => {
	try {
		//first connecting to database
		await connectDB(process.env.MONGO_URI)
		//second we delete all the jibrish in the database
		await Product.deleteMany();
		//lastly adding our script to database
		await Product.create(jsonProducts);
		console.log("Connected to the database");

		//Importantly we exit the process after connect to database
		//0: success code _
		process.exit(0)
	} catch (error) {
		//Error Message
		//1: error code
		console.log("Error connecting...")
		process.exit(1)
	}
}

//invoking our function:
startConnection();
