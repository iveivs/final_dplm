// import Product from '../models/Product.js';

// export const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch products' });
//   }
// };

// export const createProduct = async (req, res) => {
//   try {
//     const { name, description, price, stock } = req.body;
//     const newProduct = new Product({ name, description, price, stock });
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create product' });
//   }
// };
