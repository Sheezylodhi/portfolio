import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
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

    // Save to DB
    const newContact = new Contact(body);
    await newContact.save();

    // Nodemailer config
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.TO_EMAIL,
      subject: `New Message from ${body.name}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message}</p>
      `,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, contact: newContact });

  } catch (error) {
    console.error("Error sending contact message:", error);
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}
