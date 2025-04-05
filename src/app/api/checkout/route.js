import { connectMongoDB } from "@/lib/mongodb";
import Inventory from "../../../../models/Inventory";
import { NextResponse } from "next/server";


export async function POST(req){
    try {
        const {cart} = await req.json();
        await connectMongoDB();
        for (const item of cart) {
            await Inventory.updateOne(
                { "products._id": item.id },
                { $inc: { "products.$.quantity": -item.quantity } }
            );
        }

        return NextResponse.json({ success: true, message: "Product updated successfully" });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}