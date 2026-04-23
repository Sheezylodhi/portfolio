import { NextResponse } from "next/server";
import connect from "@/lib/db";
import { Project } from "@/lib/model/Project";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function DELETE(req, { params }) {
  try {
    await connect();

    // ✅ 1. Validate ID
    if (!params?.id) {
      return NextResponse.json(
        { success: false, message: "Project ID missing" },
        { status: 400 }
      );
    }

    console.log("Deleting Project ID:", params.id);

    // ✅ 2. Find project
    const project = await Project.findById(params.id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found in database" },
        { status: 404 }
      );
    }

    // ✅ 3. Delete Cloudinary images safely
    if (project.images?.length > 0) {
      for (const url of project.images) {
        try {
          const parts = url.split("/");
          const fileName = parts[parts.length - 1]; // last part
          const publicId = "projects/" + fileName.split(".")[0];

          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.log("Cloudinary delete error:", err.message);
        }
      }
    }

    // ✅ 4. Delete from DB
    await Project.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { success: false,
        message: error.message || "Server error"
      },
      { status: 500 }
    );
  }
}