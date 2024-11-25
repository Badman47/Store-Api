//importing our model class
const Product = require("../models/product.js");


//Controllers File

//Get all products static
const getAllProductsStatic = async (req, res) => {
		const products = await Product.find({}).select("name, price");
		res.status(200).json({products, nbHits: products.length});
};

//Get all products
const getAllProducts =  async (req, res) => {	
	
	//We are making these queries in for our model class
	const {featured, company, name, sort, fields, numericFilters} = req.query;
	
	
	//Client req is saved in this object	
	const queryObject = {};
		
	//first we check the featured property
		if(featured) {
			queryObject.featured = featured === "true" ? true : false;
		}
	//seondly we check the company property
		if(company) {
			queryObject.company = company;
		}
		if(name) {
			//Need to search for what this regex matches
			queryObject.name = { $regex: name, $options: "i" }
		}
	//Numeric Filtering for the values
		if(numericFilters) {
			const operatorMap =  {
			'>':'$gt',
			'<':'$lt',
			'>=':'$gte',
			'<=':'$lte',
			'=':'$eq'
			}
			const regExp = /\b(<|>|>=|=|<|<=)\b/g;
			let filters = numericFilters.replace(regExp, (match) => `-${operatorMap[match]}-`
			)

			let options = ["price", "rating"];
			filters = filters.split(",").forEach((item) => {
			
			const [field,operator,value] = item.split("-");
			
				if(options.includes(field)){
				queryObject[field] = {[operator]: Number(value)}
				}
			})
		}
	//Checking by logging it out
	console.log(queryObject);
	let result =  Product.find(queryObject);
		
	//SORTING
		if(sort) {
	// Not matter what sort is requested ? we sort the list : split()&join()
		const sortList = sort.split(",").join(" ");

		//applying our sortList to the sort method 
		result = result.sort(sortList);	
		} else {
		//if no sort provided we sort the list with createdAt by default
		result = result.sort("createdAt");
		}
		//checkign if the fields parameter
		if(fields) {
		//No matter what the parameter we are going to apply it to our fieldList 
		const fieldsList = fields.split(",").join(" ");
		//applying the fields method to our field
		result = result.select(fieldsList);
		} else {
		result = result.select("createdAt");
		}

	//Every query request in HTTP is passed: treated as STRING = "http requests"
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	//We are saving our response in result & applying the methods on that (req).skip().limit()
	result = result.skip(skip).limit(limit);

	//Final queryObject stored in products
	let products = await result;
	res.status(200).json({products, nbHits: products.length});
}

//No Queries for the database as we have our own model class
// such as delete,update,getSingleProduct,addProduct

//exporting our controllers
module.exports = {
	getAllProductsStatic,
	getAllProducts,
}
