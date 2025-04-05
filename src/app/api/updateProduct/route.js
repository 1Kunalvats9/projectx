import { connectMongoDB } from "@/lib/mongodb";
import Inventory from "../../../../models/Inventory";
import { NextResponse } from "next/server";

export async function PUT(req) {
    try {
        const { _id, name, quantity, retailPrice } = await req.json();
        await connectMongoDB();
        
        await Inventory.updateOne({ "products._id": _id }, {
            $set: {
                "products.$.name": name,
                "products.$.quantity": quantity,
                "products.$.retailPrice": retailPrice
            }
        });

        return NextResponse.json({ success: true, message: "Product updated successfully" });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
