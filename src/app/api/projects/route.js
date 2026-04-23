import { NextResponse } from "next/server";
import connect from "@/lib/db";
import { Project } from "@/lib/model/Project";
import { v2 as cloudinary } from "cloudinary";

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// --------------------------
// 📌 GET — Fetch All Projects
// --------------------------
export async function GET() {
  try {
    await connect();
    const projects = await Project.find({});
    return NextResponse.json({ success: true, result: projects });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

// --------------------------
// 📌 POST — Create Project
// --------------------------
export async function POST(req) {
  try {
    await connect();

    // ✅ Admin check
    const cookieHeader = req.headers.get("cookie") || "";
    const isAdmin = cookieHeader
      .split(";")
      .map((s) => s.trim())
      .includes("admin=1");

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ Form Data
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const link = formData.get("link");

    if (!title || !description) {
      return NextResponse.json({
        success: false,
        message: "Title & description required",
      });
    }

    const files = formData.getAll("images");
    const images = [];

    // ✅ Upload Images to Cloudinary
    for (const file of files) {
      if (!file || file.size === 0) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const base64 = buffer.toString("base64");
      const dataURI = `data:${file.type};base64,${base64}`;

      const uploadRes = await cloudinary.uploader.upload(dataURI, {
        folder: "projects",
        resource_type: "image",
      });

      images.push(uploadRes.secure_url);
    }

    // ✅ Save to DB
    const newProject = new Project({
      title,
      description,
      link,
      images,
    });

    await newProject.save();

    return NextResponse.json({
      success: true,
      newProject,
    });

  } catch (error) {
    console.error("POST /api/projects error:", error);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}