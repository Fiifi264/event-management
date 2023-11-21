import { prisma } from "@/app/lib/prisma";
import { addUser, getUsers } from "@/app/lib/users";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    // const users = getUsers();
    const users = await prisma.user.findMany();

    return NextResponse.json({ message: "OK", users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { id, fullname, email, location, eventId } = await req.json();

    const user = await prisma.user.create({
      data: {
        id,
        fullname,
        email,
        location,
        eventId,
      },
    });
    // addUser(user);

    return NextResponse.json({ message: "OK", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
