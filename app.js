//Creating an Instance of the Application;
const express = require("express");
const connectDB = require("./db/connect.js");
const productsRoute = require("../starter/routes/products.js");
const notFoundMiddleware = require("./middleware/not-found.js");
const errorMiddleware = require("./middleware/error-handler.js");
require("dotenv").config();

// Creating an Instance of the Application
const app = express();

// Logging Middleware for Debugging

// Route: Testing Routes
app.get("/", (req, res) => {
  res.send('<h1>04-Store-Api</h1><a href="/api/v1/products">products route</a>');
});

// Mount Products Routes
app.use("/api/v1/products", productsRoute);

// Middleware for 404 and Error Handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Declaring the port
const port = process.env.PORT || 2323;

// Starting the Application...
const startApplication = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Database connected. Server running on port: ${port}`);
    });
  } catch (error) {
    console.error(`Error Spinning the Server: ${error}`);
  }
};

// Invoking it ():
startApplication();

