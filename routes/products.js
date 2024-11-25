const express = require("express");
const router = express.Router();


//Importing the two testing controllers
const {
	getAllProductsStatic,
	getAllProducts 
} = require("../controllers/products.js");

//Setting up the routes
router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

module.exports = router;
