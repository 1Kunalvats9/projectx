import { connectMongoDB } from "@/lib/mongodb";
import User from "../../../../models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req) {
  try {
    const {shopName, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password,10)
    await connectMongoDB();
    await User.create({shopName, email, password:hashedPassword});
    console.log(shopName, email,password)
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}