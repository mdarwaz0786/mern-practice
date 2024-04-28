import Product from "../models/product.model.js";
import fs from "fs";
import cloudinary from "../utils/cloudinary.js";

// controller to create product
export const createProduct = async (req, res) => {
  try {
    const { path } = req.file;
    const result = await cloudinary.uploader.upload(path);
    const product = new Product(
      {
        title: req.body.title,
        image: result.secure_url,
        cloudinary_id: result.public_id,
      },
    );
    await product.save();
    fs.unlinkSync(path);
    return res.status(201).json({ success: true, message: "product created successfully", product });
  } catch (error) {
    console.log("error while creating product:", error.message);
    return res.status(500).json({ success: false, message: "error while creating product" });
  };
};

// controller to fetch all product
export const fetchAllProduct = async (req, res) => {
  try {
    const product = await Product.find();
    if (!product) {
      return res.status(200).json({ success: false, messsage: "product not found", });
    };
    return res.status(200).json({ success: true, messsage: "product fetched successfully", product });
  } catch (error) {
    console.log("error while fetching product:", error.message);
    return res.status(500).json({ success: false, message: "Error while fetching all product" });
  };
};

// controller to fetch single product
export const fetchSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "product not found" });
    };
    return res.status(200).json({ success: true, message: "single product fetched successfully", product });
  } catch (error) {
    console.log("error while fetching single product:", error.message);
    return res.status(500).json({ success: false, message: "error while fetching single product" });
  };
};

// controller to update product
export const updateProduct = async (req, res) => {
  try {
    const { path } = req.file;
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "product not found" });
    };
    await cloudinary.uploader.destroy(product.cloudinary_id);
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(path);
    };
    const data = {
      title: req.body.title || product.title,
      image: result?.secure_url || product.image,
      cloudinary_id: result?.public_id || product.cloudinary_id,
    };
    product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!product) {
      return res.status(404).json({ success: false, message: "product not found" });
    };
    fs.unlinkSync(path);
    return res.status(200).json({ success: true, message: "product updated successfully", product });
  } catch (error) {
    console.log("error while updating product:", error.message);
    return res.status(500).json({ success: false, message: "error while updating product" });
  };
};

// controller to delete product
export const deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "product not found" });
    };
    await cloudinary.uploader.destroy(product.cloudinary_id);
    product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "product not found" });
    };
    return res.status(200).json({ success: true, message: "product deleted successfully" });
  } catch (error) {
    console.log("error while deleting product:", error.message);
    return res.status(500).json({ success: false, message: "error while deleting product" });
  };
};




