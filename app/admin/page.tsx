"use client";
import Link from "next/link";
import { useState, useEffect, ChangeEvent, ChangeEventHandler } from "react";
import EventDetails from "../interfaces/event-details.interfaces";
import {
  eventDelete,
  eventUpdate,
  eventsMutation,
  useEvents,
} from "../hooks/useEvents";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import { useUsers } from "../hooks/useUsers";

const defaultEvents: EventDetails[] = [
  {
    _id: "1",
    title: "New Event 1",
    date: "16/11/2023",
    description: "This is a tech event that is about to happen recently",
  },
  {
    _id: "2",
    title: "New Event 2",
    date: "17/11/2023",
    description: "This is a tech event that is about to happen again",
  },
];

const Event = () => {
  // const [events, setEvents] = useState(defaultEvents);
  const [activePage, setActivePage] = useState("eventList");
  const [newEvent, setNewEvent] = useState<EventDetails>({
    _id: "0",
    title: "",
    date: "",
    description: "",
  });
  const [eventEdit, setEventEdit] = useState<any>(null);

  const {
    data: users,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUsers();
  const { data: events } = useEvents();
  const { mutate: addEvent } = eventsMutation();
  const { mutate: updateEvent } = eventUpdate();
  const { mutate: deleteEvent } = eventDelete();
  // newEvent.title.substring(3) + Math.floor(Math.random() * 10000) + 1

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Manually update the _id field in Formik state
    if (eventEdit) {
      setEventEdit({ ...eventEdit, [e.target.name]: e.target.value });
    } else {
      setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    if (eventEdit) {
      updateEvent(eventEdit);

      setEventEdit(null);
    } else {
      addEvent({
        ...newEvent,
        _id: `${
          newEvent.title.substring(0, 3).toLowerCase() +
          Math.floor(Math.random() * 10000) +
          1
        }`,
      });
      setNewEvent({
        _id: "",
        title: "",
        date: "",
        description: "",
      });
    }
  };

  const handleDelete = (eventId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(eventId);
    }
  };

  return (
    <div className="container mx-auto px-2 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10">
        <div className="col-span-1 relative">
          <h1 className="text-4xl font-bold my-4 sm:fixed">Upcoming Events</h1>
          <Formik
            onSubmit={handleSubmit}
            enableReinitialize
            initialValues={{
              _id: "",
              title: "",
              date: "",
              description: "",
            }}
          >
            <Form className="sm:fixed top-20">
              <Field
                type="text"
                name="_id"
                value={
                  eventEdit
                    ? eventEdit?._id
                    : Math.floor(Math.random() * 10000) + 1
                }
                onChange={handleChange}
                hidden
                className="border p-2 mb-4 w-full bg-transparent border-black rounded-md outline-none"
              />
              <label className="block mb-2">Event Title</label>
              <Field
                type="text"
                name="title"
                value={eventEdit ? eventEdit?.title : newEvent.title}
                onChange={handleChange}
                required
                className="border p-2 mb-4 w-full bg-transparent border-black rounded-md outline-none"
              />
              <label className="block mb-2">Event Date</label>
              <Field
                type="date"
                name="date"
                value={eventEdit ? eventEdit?.date : newEvent.date}
                onChange={handleChange}
                className="border p-2 mb-4 w-full bg-transparent border-black rounded-md outline-none"
              />
              <label className="block mb-2">Event Description</label>
              <Field
                as="textarea"
                className="border p-2 mb-4 w-full bg-transparent border-black rounded-md outline-none"
                id="description"
                value={
                  eventEdit ? eventEdit?.description : newEvent.description
                }
                onChange={handleChange}
                name="description"
                rows="4" // Set the number of rows as needed
              />
              <div className="flex space-x-4 mb-10 sm:mb-0">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-full"
                >
                  {eventEdit ? "Update" : "Submit"}
                </button>
                <Link
                  href={"/"}
                  className="bg-blue-500 text-white py-2 px-4 rounded-full"
                >
                  View Events
                </Link>
              </div>
            </Form>
          </Formik>
        </div>

        <div className="col-span-1 py-4">
          <div className="flex">
            <p
              onClick={() => setActivePage("eventList")}
              className={`w-full text-center border cursor-pointer border-gray-500 ${
                activePage === "eventList" && "bg-blue-500 text-white"
              }`}
            >
              Event list
            </p>
            <p
              onClick={() => setActivePage("registeredUsers")}
              className={`w-full text-center border cursor-pointer border-gray-500 ${
                activePage === "registeredUsers" && "bg-blue-500 text-white"
              }`}
            >
              Registered users
            </p>
          </div>

          {activePage === "eventList" && (
            <ul>
              {events?.map((event) => (
                <li key={event._id.toString()} className="mb-4">
                  <div className="flex flex-col justify-end items-end relative group">
                    <span className="font-bold z-10 cursor-pointer drop-shadow-lg rounded-full px-1">
                      ...
                    </span>
                    <div className="absolute top-6 text-sm">
                      <span
                        onClick={() => {
                          setEventEdit(event);
                          window.scrollTo(0, 0);
                        }}
                        className="bg-white hover:shadow-md border border-gray-400 hover:bg-blue-500 hover:text-white mb-2 px-2 rounded-full hidden cursor-pointer group-hover:block"
                      >
                        edit
                      </span>
                      <span
                        onClick={() => handleDelete(event._id)}
                        className="bg-white hover:shadow-md border border-gray-400 hover:bg-blue-500 hover:text-white mb-2 px-2 rounded-full hidden cursor-pointer group-hover:block"
                      >
                        delete
                      </span>
                    </div>
                  </div>
                  <p>
                    <span className="font-bold">#{event._id}</span>
                  </p>
                  <h2 className="text-xl font-bold"> {event.title}</h2>
                  <p>
                    <span className="font-bold">Date:</span> {event.date}
                  </p>
                  <p>
                    <span className="font-bold">Description:</span>{" "}
                    {event.description}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {activePage === "registeredUsers" && (
            <ol className="list-decimal ps-5 pt-5 space-y-4">
              {users?.map((user) => (
                <li>
                  <p className="font-bold">Name: {user.fullname}</p>
                  <p>Event ID: #{user.eventId}</p>
                  <p>Email: {user.email}</p>
                  <p>Location: {user.location}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;
