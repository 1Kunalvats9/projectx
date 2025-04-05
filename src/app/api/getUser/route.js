import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "../../../../models/userModel";

export async function POST(req) {
  console.log("/api/getUser hit");
  try {
    await connectMongoDB();
    console.log("Connected to MongoDB");

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return NextResponse.json({ success: false, error: "User does not exist" }, { status: 404 });
    }

    console.log("User found:", user.email);
    return NextResponse.json({ success: true, data: user }, { status: 200 });

  } catch (err) {
    console.error("Error in /api/getUser:", err);
    return NextResponse.json({ success: false, error: "Error in fetching user details" }, { status: 500 });
  }
}
