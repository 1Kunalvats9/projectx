import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  retailPrice: { type: Number, required: true },
  wholesalePrice: { type: Number, required: true },
});

const InventorySchema = new mongoose.Schema({
  products: [ProductSchema], // Array of product objects
  createdAt: { type: Date, default: Date.now },
});

const Inventory = mongoose.models.Inventory || mongoose.model("Inventory", InventorySchema);
export default Inventory;