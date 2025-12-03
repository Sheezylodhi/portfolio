import { NextResponse } from "next/server";
import connect from "@/lib/db";
import { Project } from "@/lib/model/Project";

// GET: all projects
export async function GET() {
  await connect();
  const data = await Project.find();
  return NextResponse.json({ result: data });
}

// POST: add project
export async function POST(req) {
  // admin check (cookie based)
  const cookieHeader = req.headers.get("cookie") || "";
  const isAdmin = cookieHeader
    .split(";")
    .map(s => s.trim())
    .includes("admin=1");

  if (!isAdmin) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await connect();
    const body = await req.json();

    // Ensure required fields exist
    const { title, description, link, image } = body;
    if (!title || !description || !link || !image) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const newProject = new Project({ title, description, link, image });
    await newProject.save();

    return NextResponse.json({ success: true, newProject });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
