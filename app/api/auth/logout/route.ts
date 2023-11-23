// pages/api/auth/logout.js
import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/constants";
import { serialize } from "cookie";

export const POST = async (req: NextRequest, res: NextResponse) => {
  // Clear the session cookie
  const serialized = serialize(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    sameSite: "strict",
    expires: new Date(0),
    path: "/admin",
  });

  const response = {
    message: "Logged out",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": serialized },
  });
};
