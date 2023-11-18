import { addUser, getUsers } from "@/app/lib/users";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const users = getUsers();

    return NextResponse.json({ message: "OK", users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { _id, fullname, email, location, eventId } = await req.json();

    const user = {
      _id,
      fullname,
      email,
      location,
      eventId,
    };
    addUser(user);

    return NextResponse.json({ message: "OK", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
