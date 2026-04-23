import { NextResponse } from "next/server";
import connect from "@/lib/db";
import { Project } from "@/lib/model/Project";
import { v2 as cloudinary } from "cloudinary";

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function DELETE(req, { params }) {
  try {
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

    await connect();

    const project = await Project.findById(params.id);

    // ❌ Not found
    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    // ✅ Cloudinary images delete
    if (project.images && project.images.length > 0) {
      for (const url of project.images) {
        const publicId = url.split("/").pop().split(".")[0];

        await cloudinary.uploader.destroy(`projects/${publicId}`);
      }
    }

    // ✅ Delete from DB
    await Project.findByIdAndDelete(params.id);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("DELETE error:", error);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}