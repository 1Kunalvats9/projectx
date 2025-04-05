import { connectMongoDB } from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Inventory from "../../../../models/Inventory";
import User from "../../../../models/userModel";

export async function POST(req){
    try{
        await connectMongoDB()
        const {email} = await req.json()
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({message:"User not exists", status:404})
        }
        console.log(user)
        return NextResponse.json({ success: true, data: user }, { status: 200 })
    }catch(err){
        return NextResponse.json({message:"Error in fetching the userdetails",error:err,status:500})
    }
}