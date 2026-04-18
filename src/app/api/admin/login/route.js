import { NextResponse } from "next/server";
import connect from "@/lib/db";
import { Admin } from "@/lib/model/Admin";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connect();
    const { username, password } = await req.json();

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, admin.hashedPassword);
    if (!ok) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    // Set HttpOnly cookie expires 1 day
    const res = NextResponse.json({ success: true });
    res.headers.set(
      "Set-Cookie",
      `admin=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24}`
    );
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
