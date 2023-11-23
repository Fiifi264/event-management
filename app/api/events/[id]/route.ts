import {
  deleteEvent,
  getById as getEventById,
  updateEvent,
} from "@/app/lib/data";
import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const id = req.url.split("events/")[1];

    // const event = getEventById(id);

    const event = await prisma.events.findUnique({
      where: { eventId: id },
    });

    if (!event) {
      return NextResponse.json({ message: "EVENT NOT FOUND" }, { status: 404 });
    }
    return NextResponse.json({ message: "OK", event }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR", error },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
  try {
    const id = req.url.split("events/")[1];

    // const event = getEventById(id);
    const event = await prisma.events.findUnique({
      where: { eventId: id },
    });

    if (!event) {
      return NextResponse.json({ message: "EVENT NOT FOUND" }, { status: 404 });
    }

    const editedEvent = await req.json();

    // const updatedEvent = updateEvent(id, editedEvent);
    const updatedEvent = await prisma.events.update({
      where: { eventId: id },
      data: editedEvent,
    });

    return NextResponse.json(
      { message: "OK", event: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR", error },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  try {
    const id = req.url.split("events/")[1];

    // const event = getEventById(id);
    const event = await prisma.events.findUnique({
      where: { eventId: id },
    });

    if (!event) {
      return NextResponse.json({ message: "EVENT NOT FOUND" }, { status: 404 });
    }

    // deleteEvent(id);
    const deletedEvent = await prisma.events.delete({
      where: { eventId: id },
    });

    return NextResponse.json({ message: "OK", deletedEvent }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR", error },
      { status: 500 }
    );
  }
};
