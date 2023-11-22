import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { COOKIE_NAME } from "@/constants";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { username, password } = await req.json();
  try {
    if (username !== "admin" || password !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: "INTERNAL ERROR" }, { status: 500 });
  }

  const secret = process.env.JWT_SECRET || "myJwtKey";

  const MAX_AGE = 60 * 60 * 24 * 30; //days;

  const token = sign(
    {
      username,
    },
    secret,
    {
      expiresIn: MAX_AGE,
    }
  );

  const serialized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/admin",
  });

  const response = {
    message: "Authenticated",
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Set-Cookie": serialized },
  });
};
