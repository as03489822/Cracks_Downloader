import { sendEmail } from "@/helpers/mailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, text , subject } = await req.json();

    if (!email || !text || !subject) {
      return NextResponse.json(
        { success: false, error: "Email and message are required" },
        { status: 400 }
      );
    }

    await sendEmail ({email , text , subject})

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message", error: error.message },
      { status: 500 }
    );
  }
}
