import { NextResponse } from "next/server";
import Inventory from "../../../../models/Inventory";
import { connectMongoDB } from "@/lib/mongodb";

export async function POST(req) {
    try {
        await connectMongoDB();
        const { name, category, quantity, retailPrice, wholesalePrice } = await req.json();

        // Find the inventory document (assuming only one exists)
        let inventory = await Inventory.findOne();
        if (!inventory) {
            inventory = new Inventory({ products: [] }); // Create inventory if not found
        }

        // Add product to the inventory
        inventory.products.push({ name, category, quantity, retailPrice, wholesalePrice });

        // Save changes
        await inventory.save();

        console.log("✅ Product added successfully");
        return NextResponse.json({ message: "Product added successfully" }, { status: 201 });
    } catch (err) {
        console.error("❌ Error adding product:", err);
        return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
    }
}