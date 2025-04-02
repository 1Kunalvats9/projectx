import { connectMongoDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Inventory from "../../../../models/Inventory";

export async function POST(req) {
    try {
        const { email } = await req.json();
        if (!email) return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });

        await connectMongoDB();
        const inventory = await Inventory.findOne({ email }); 
        const products = inventory ? inventory.products : [];
        const totalProducts = products.length;
        const inventoryData = {
            totalProducts:totalProducts
        }

        return NextResponse.json({ success: true, data: inventoryData }, { status: 200 });
    } catch (err) {
        console.error("Error in inventory fetching:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
