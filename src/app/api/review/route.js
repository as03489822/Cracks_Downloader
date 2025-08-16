import { NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import Review from "@/models/Review";

export async function GET(request) {
  try {
    await connectDB();
    
    const reviews = await Review.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, reviews },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching reviews:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch reviews", error: error.message },
      { status: 500 }
    );
  }
}
