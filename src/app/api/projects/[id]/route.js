import { NextResponse } from "next/server";
import connect from "@/lib/db";
import { Project } from "@/lib/model/Project";

export async function DELETE(req, { params }) {
  const cookieHeader = req.headers.get("cookie") || "";
  const isAdmin = cookieHeader.split(";").map(s => s.trim()).includes("admin=1");
  if (!isAdmin) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  await connect();
  await Project.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
