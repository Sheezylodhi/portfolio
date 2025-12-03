import { NextResponse } from "next/server";
import connect from "@/lib/db";
import { Contact } from "@/lib/model/Contact";


export async function GET() {
  await connect();
  const data = await Contact.find();
  return NextResponse.json({ result: data });
}


export async function POST(req) {
  try {
    await connect();
    const body = await req.json();
    const newContact = new Contact(body);
    await newContact.save();

    return NextResponse.json({ success: true, contact: newContact });
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json({ success: false, error: "Failed to save contact" }, { status: 500 });
  }
}


