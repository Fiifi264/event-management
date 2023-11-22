"use client";

import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import EventDetails from "../interfaces/event-details.interfaces";
import { useEvents } from "../hooks/useEvents";
import { useUsers, useUserMutation } from "../hooks/useUsers";
import UserDetails from "../interfaces/user-details.interfaces";
import { useQueryClient } from "@tanstack/react-query";

const FormInput = ({
  className,
  placeholder,
  value,
  onChange,
}: {
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}) => (
  <input
    value={value}
    type="text"
    className={`px-2 py-1 border placeholder:text-sm block ${className}`}
    placeholder={placeholder}
    onChange={(e) => onChange && onChange(e.target.value)}
  />
);

const EventDisplay = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [eventToRegister, setEventToRegister] = useState<
    Partial<EventDetails> | any
  >({});

  const [user, setUser] = useState<any>(null);

  const { data: events, isError, isLoading } = useEvents();

  const queryClient = useQueryClient();
  const { mutate: addUser, isSuccess } = useUserMutation(queryClient);

  const handleRegister = () => {
    if (user) {
      const id =
        user?.fullname.substring(0, 3).toLowerCase() +
        Math.floor(Math.random() * 10000) +
        1;

      addUser({ ...user, id, eventId: eventToRegister.id });
      setUser(null);
      setFormVisible(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Manually update the _id field in Formik state

    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-blue-50 relative min-h-screen text-black pb-10">
      {formVisible && (
        <div className="absolute z-10 py-10 px-5 w-full h-full bg-black/50">
          <div>
            <div className="bg-white px-10 sm:w-96 w-full m-auto overflow-auto py-10 space-y-4 relative">
              <span
                onClick={() => setFormVisible(false)}
                className="absolute font-bold border px-2.5 py-0.5 rounded-s-full cursor-pointer right-0 top-0"
              >
                x
              </span>
              <p className="text-xl font-bold text-center">Create Event</p>
              <p className="rounded-md font-bold w-full py-1 px-3 border text-gray-500">
                Event ID: {"#" + eventToRegister.id}
              </p>
              <div>
                <label htmlFor="title" className="font-medium mb-1 block">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullname"
                  onChange={handleChange}
                  required
                  placeholder="example :  Fiifi Arthur"
                  className="border block placeholder:text-sm rounded-md w-full py-1 px-3 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-medium mb-1 block">
                  Email
                </label>
                <input
                  placeholder="example :  person@gmail.com"
                  type="text"
                  name="email"
                  onChange={handleChange}
                  required
                  className="border block placeholder:text-sm rounded-md w-full py-1 px-3 outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="location" className="font-medium mb-1 block">
                  Location
                </label>
                <input
                  placeholder="example :  Cape Coast"
                  type="text"
                  name="location"
                  onChange={handleChange}
                  required
                  className="border block placeholder:text-sm rounded-md w-full py-1 px-3 outline-none focus:border-blue-500"
                />
              </div>
              <button
                onClick={handleRegister}
                className="bg-blue-500 w-full text-white py-1 px-5 rounded-md font-medium"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white w-full py-5 px-3 mb-5">
        <div className="container mx-auto flex justify-between">
          <p className="text-2xl font-bold sm:text-center grow">
            Upcoming Events
          </p>
          <Link
            href={"/admin"}
            className="bg-blue-500 text-white py-1 px-5 rounded-md font-medium"
          >
            Admin Login
          </Link>
        </div>
      </div>

      <div className="container mx-auto">
        {/* <p className="text-xl font-bold mb-5">Upcoming Events</p> */}
        <p className="sm:max-w-sm font-bold py-10 text-gray-500 text-center mx-auto mb-5">
          Welcome! please you can register or book a ticket for any of the
          events below. Thank you.
        </p>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events?.map((event, index) => (
            <div key={index} className="bg-white p-3 shadow-2xl">
              <p className="font-medium">{event.title}</p>
              <p className="text-gray-500 mb-3 text-sm">{event.date}</p>
              <p className="mb-3 text-gray-700">{event.description}</p>
              <button
                onClick={() => {
                  setFormVisible(true);
                  setEventToRegister(event);
                  window.scrollTo(0, 0);
                }}
                className="bg-blue-500 w-full text-white py-1 px-5 rounded-md font-medium"
              >
                Book ticket
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    // <>
    //   {/* Modal */}
    //   {formVisible && (
    //     <div
    //       className={`absolute top-0 w-full overflow-hidden h-full flex bg-black/50 z-10 justify-center py-10 `}
    //     >
    //       <div>
    //         <div className="bg-white p-5 space-y-3 rounded-lg relative overflow-hidden">
    //           <span
    //             onClick={() => {
    //               setFormVisible(false);
    //               document.body.style.overflow = "auto";
    //             }}
    //             className="px-2.5 font-bold border-2 py-1 rounded-l-full absolute cursor-pointer top-0 right-0"
    //           >
    //             x
    //           </span>
    //           <p className="font-bold">Provide your details</p>
    //           <p className="px-2 py-1 border block text-gray-500">
    //             Event ID: # {eventToRegister?.id}
    //           </p>
    //           <FormInput
    //             placeholder={"Full name"}
    //             value={user ? user?.fullname : ""}
    //             onChange={(value) => setUser({ ...user, fullname: value })}
    //           />
    //           <FormInput
    //             placeholder={"Email"}
    //             value={user ? user?.email : ""}
    //             onChange={(value) => setUser({ ...user, email: value })}
    //           />
    //           <FormInput
    //             placeholder={"Location"}
    //             value={user ? user?.location : ""}
    //             onChange={(value) => setUser({ ...user, location: value })}
    //           />

    //           <button
    //             onClick={handleRegister}
    //             className="bg-blue-500 w-full text-white py-1 px-4 rounded-full border border-blue-500 hover:bg-transparent hover:text-blue-500"
    //           >
    //             Register
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}

    //   <div className="container mx-auto p-4 min-h-screen relative">
    //     <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h1>
    //     <p className="sm:max-w-sm font-medium text-center mx-auto mb-8">
    //       Welcome! please you can register or book a ticket for any of the
    //       events below. Thank you.
    //     </p>
    //     <div className="flex justify-end mb-8">
    //       <Link
    //         href={"/admin"}
    //         className="bg-blue-500 text-white py-2 px-4 rounded-full"
    //       >
    //         Add Event
    //       </Link>
    //     </div>
    //     <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    //       {data?.map((item, index) => (
    //         <li key={index} className="border border-gray-300 p-4 rounded-md">
    //           <h2 className="text-xl font-semibold text-blue-500 mb-2">
    //             {item.title}
    //           </h2>
    //           <p className="text-gray-600">Date: {item.date}</p>
    //           <p className="text-gray-800">{item.description}</p>

    //           <div className="flex space-x-4 mt-5">
    //             {/* <button className="bg-blue-500 text-white py-1 px-4 rounded-full border border-blue-500 hover:bg-transparent hover:text-blue-500">
    //             Register
    //           </button> */}

    //             <button
    //               onClick={() => {
    //                 setFormVisible(true);
    //                 setEventToRegister(item);
    //                 window.scrollTo(0, 0);
    //                 document.body.style.overflow = "hidden";
    //               }}
    //               className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white py-1 px-4 rounded-full"
    //             >
    //               Book Ticket
    //             </button>
    //           </div>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </>
  );
};

export default EventDisplay;
