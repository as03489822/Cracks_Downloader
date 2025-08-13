import { NextResponse } from "next/server";
import User from  '@/models/userModel'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from "zod";
import dbConnect from "@/dbConfig/dbConfig";    

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const { email, password } = parsed.data;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return NextResponse.json(
        { error: "Invalid email or password" },
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
      { error: "Server error" },
      { status: 500 }
    );
  }
}
