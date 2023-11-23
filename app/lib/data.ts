import EventDetails from "../interfaces/event-details.interfaces";

let events: EventDetails[] = [
  {
    eventId: "1",
    title: "New Event 1",
    date: "23/11/2023",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas",
  },
  {
    eventId: "2",
    title: "New Event 1",
    date: "23/11/2023",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas",
  },
  {
    eventId: "3",
    title: "New Event 1",
    date: "23/11/2023",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas",
  },
  {
    eventId: "4",
    title: "New Event 1",
    date: "23/11/2023",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas",
  },
  {
    eventId: "5",
    title: "New Event 1",
    date: "23/11/2023",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas",
  },
  {
    eventId: "6",
    title: "New Event 1",
    date: "23/11/2023",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas",
  },
];

// handlers
export const getEvents = () => events;

export const addEvent = (event: EventDetails) => {
  events.push(event);
};

export const deleteEvent = (id: string) => {
  events = events.filter((event) => event.eventId.toString() !== id);
};

export const updateEvent = (
  eventId: string,
  changes: Partial<EventDetails>
) => {
  // Find the index of the event in the events array
  const eventIndex = events.findIndex(
    (event) => event.eventId.toString() === eventId
  );

  if (eventIndex !== -1) {
    // Create a new object for the updated event with the specified changes
    const updatedEvent = {
      ...events[eventIndex],
      ...changes,
    };

    // Update the events array with the new event object
    events[eventIndex] = updatedEvent;

    // Optionally, you may want to return the updated event
    return updatedEvent;
  } else {
    throw new Error("EVENT NOT FOUND");
  }
};

export const getById = (eventId: string) => {
  return events.find((event) => event.eventId.toString() === eventId);
};
