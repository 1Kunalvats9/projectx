import { connectMongoDB } from "@/lib/mongodb";
import User from "../../../../models/userModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {email, password } = await req.json();
    await connectMongoDB();
    await User.create({email, password});
    console.log(email,password)
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.log("api error",error)
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}