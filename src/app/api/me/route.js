import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return NextResponse.json({ user: decoded }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}