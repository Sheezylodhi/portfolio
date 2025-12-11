import { NextResponse } from "next/server";
import connect from "@/lib/db";
import { Project } from "@/lib/model/Project";
import fs from "fs";
import path from "path";

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

    // Admin check
    const cookieHeader = req.headers.get("cookie") || "";
    const isAdmin = cookieHeader.split(";").map(s => s.trim()).includes("admin=1");
    if (!isAdmin)
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    // Read formData
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const link = formData.get("link");

    if (!title || !description)
      return NextResponse.json({ success: false, message: "Title & description required" });

    // Files array
    const files = formData.getAll("images"); // multiple images
    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadDir))
      fs.mkdirSync(uploadDir, { recursive: true });

    const images = [];

    // Save each file
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const filePath = path.join(uploadDir, file.name);
      fs.writeFileSync(filePath, buffer);

      images.push(`/uploads/${file.name}`);
    }

    // Save to DB
    const newProject = new Project({
      title,
      description,
      link,
      images,
    });

    await newProject.save();

    return NextResponse.json({ success: true, newProject });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
