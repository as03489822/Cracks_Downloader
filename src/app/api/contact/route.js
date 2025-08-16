import { sendEmail } from "@/helpers/mailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, text } = body;

    if (!email || !text) {
      return NextResponse.json(
        { success: false, message: "Email and message are required" },
        { status: 400 }
      );
    }

    await sendEmail ({email , text})

    return NextResponse.json(
      { success: true, message: "Message sent successfully", info },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message", error: error.message },
      { status: 500 }
    );
  }
}
