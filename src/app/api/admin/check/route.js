import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const isAdmin = cookieHeader.split(";").map(s => s.trim()).includes("admin=1");
    return NextResponse.json({ authenticated: !!isAdmin });
  } catch (err) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
