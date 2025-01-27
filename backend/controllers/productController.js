import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';
import mongoose from 'mongoose';


// Add product
const addProduct = async (req, res) => {
    try {
        // Log req.body and req.files to see what's being sent
        console.log('req.body:', req.body);
        console.log('req.files:', req.files);

        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        // Input validation with better error messages
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required.",
            });
        }
        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Category is required.",
            });
        }
        if (!price || isNaN(price)) {
            return res.status(400).json({
                success: false,
                message: "Price is required and must be a valid number.",
            });
        }

        // Parse sizes if provided
        let parsedSizes = [];
        if (sizes) {
            try {
                parsedSizes = JSON.parse(sizes);
            } catch (err) {
                return res.status(400).json({ success: false, message: "Sizes must be valid JSON." });
            }
        }
        // Extracting images from the request
        const images = [
            req.files.image1?.[0],
            req.files.image2?.[0],
            req.files.image3?.[0],
            req.files.image4?.[0],
        ].filter((item) => item !== undefined);

        

        // Uploading images to Cloudinary
        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                console.log(result );
                return result.secure_url;
            })
        );

        // Creating product data
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestSeller: bestSeller === "true"? true: false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now(),
        };

       

        // Saving the product to the database
        const product = new productModel(productData);
        await product.save();

        res.status(200).json({ success: true, message: "Product added successfully" ,productData});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// List all products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        console.log("product in product controoler", products);
        res.json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Remove a product


const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);

    // Validate the ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get a single product
const singleProduct = async (req, res) => {
    try {
        console.log("hitting single product controller in backend");
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        console.log("product in single product hitting single product controller in backend", product);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addProduct, listProducts, removeProduct, singleProduct };
