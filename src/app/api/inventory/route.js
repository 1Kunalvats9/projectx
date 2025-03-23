import mongoose from "mongoose";
import Inventory from "../../../../models/Inventory";
import { useRouter } from "next/navigation";
import { connectMongoDB } from "@/lib/mongodb";

export default async function GET(req){
    try{
        await connectMongoDB();
        const inventory = await Inventory.find()
        return NextResponse.json({ success: true, data: inventory }, { status: 200 });
    }catch(err){
        console.log("error in inventory fetching",err);
        return NextResponse.json({ success: false, error: err }, { status: 500 });
    }
}