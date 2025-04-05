import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Inventory from "../../../../models/Inventory";

export async function POST(req) {
    try {
        await connectMongoDB();
        const { email, name, category, quantity, retailPrice, wholesalePrice, url } = await req.json();
        
        let inventory = await Inventory.findOne({ email });

        if (!inventory) {
            inventory = new Inventory({ email, products: [] }); // Create inventory for user if not found
        }
        inventory.products.push({ name, category, quantity, retailPrice, wholesalePrice, url });

        // Save changes
        await inventory.save();

        console.log("✅ Product added successfully");
        return NextResponse.json({ message: "Product added successfully" }, { status: 201 });

    } catch (err) {
        console.error("❌ Error adding product:", err);
        return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
    }
}
