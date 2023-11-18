import { addEvent, getEvents } from "@/app/lib/data";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const events = getEvents();

    return NextResponse.json({ message: "OK", events }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { _id, title, date, description } = await req.json();

    const event = {
      _id,
      title,
      date,
      description,
    };
    addEvent(event);

    return NextResponse.json({ message: "OK", event }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
