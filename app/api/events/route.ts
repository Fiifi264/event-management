import { addEvent, getEvents } from "@/app/lib/data";
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const events = getEvents();
    // const events = await prisma.events.findMany();

    return NextResponse.json({ message: "OK", events }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { eventId, title, date, description } = await req.json();

    const event = await prisma.events.create({
      data: {
        eventId,
        title,
        date,
        description,
      },
    });

    // addEvent(event);

    return NextResponse.json({ message: "OK", event }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
