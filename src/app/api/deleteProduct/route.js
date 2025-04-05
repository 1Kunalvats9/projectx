import { connectMongoDB } from "@/lib/mongodb";
import Inventory from "../../../../models/Inventory";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try {
        const { id } = await req.json();
        await connectMongoDB();

        await Inventory.updateOne({}, { $pull: { products: { _id: id } } });

        return NextResponse.json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
