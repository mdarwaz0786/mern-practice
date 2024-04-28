import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productRoute from "./routes/product.route.js";
import connectDatabase from './database/connectDatabase.js';

// config
dotenv.config();

// connect database
connectDatabase();

// rest object
const server = express();

// middleware
server.use(express.json());
server.use(cors());

// product route
server.use("/", productRoute);

// environment variable
const port = process.env.PORT || 8000;
const mode = process.env.Node_Mode;

// server listen
server.listen(port, () => {
  console.log(`server is successfully running in ${mode} on port number ${port}`);
}); 