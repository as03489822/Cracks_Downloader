import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];  

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.sub || decoded.id || "");
    requestHeaders.set("x-user-email", decoded.email || "");

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/crack-dashboard/:path*"], 
};



// Reading the user in your API route
  // const userId = req.headers.get("x-user-id");
  // const userEmail = req.headers.get("x-user-email");