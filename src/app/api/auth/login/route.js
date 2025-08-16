import { NextResponse } from "next/server";
import User from  '@/models/userModel'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {connectDB} from "@/dbConfig/dbConfig";    

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const { email, password } = body;

    if(!email || !password){
      return NextResponse.json(
        {error : "Email and Passwor are requiered"}
      )
    }


    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 401 }
      );
    }

    const ok = await bcrypt.compare(password , user.password);
    if (!ok) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        sub: user._id.toString(),
        email: user.email,
        role: user.role || "user",
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    const res = NextResponse.json(
      {
        success: true,
        message:"Login Successfully!",
        user: {
          id: user._id.toString(),
          name: user.username || user.name || "",
          email: user.email,
          // role: user.role || "user",
        },
      },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" , detail: err},
      { status: 500 }
    );
  }
}
