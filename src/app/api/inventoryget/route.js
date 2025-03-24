import { NextResponse } from "next/server";
import Inventory from "../../../../models/Inventory";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET() { // ✅ Use Named Export
    try {
        await connectMongoDB();
        const inventory = await Inventory.find();
        const products = inventory.length > 0 ? inventory[0].products : [];
        console.log(products)
        return NextResponse.json({ success: true, data: products }, { status: 200 });
    } catch (err) {
        console.error("Error in inventory fetching:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
