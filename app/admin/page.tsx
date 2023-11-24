"use client";
import { useState, useEffect, ChangeEvent } from "react";
import EventDetails from "../interfaces/event-details.interfaces";
import {
  useEventDelete,
  useEventUpdate,
  useEventsMutation,
  useEvents,
} from "../hooks/useEvents";
import { useUsers } from "../hooks/useUsers";
import { useQueryClient } from "@tanstack/react-query";
import Sidebar from "./_components/sidebar";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { decode } from "jsonwebtoken";

const defaultEvents: EventDetails[] = [
  {
    eventId: "1",
    title: "New Event 1",
    date: "16/11/2023",
    description: "This is a tech event that is about to happen recently",
  },
  {
    eventId: "2",
    title: "New Event 2",
    date: "17/11/2023",
    description: "This is a tech event that is about to happen again",
  },
];

const Event = () => {
  const pathname = usePathname();

  const [activePage, setActivePage] = useState("eventList");
  const [createEvent, setCreateEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<EventDetails>({
    eventId: "0",
    title: "",
    date: "",
    description: "",
  });
  const [eventEdit, setEventEdit] = useState<any>(null);
  const { data: events } = useEvents();

  const queryClient = useQueryClient();
  const { mutate: addEvent } = useEventsMutation(queryClient);
  const { mutate: updateEvent } = useEventUpdate(queryClient);
  const { mutate: deleteEvent } = useEventDelete(queryClient);
  // newEvent.title.substring(3) + Math.floor(Math.random() * 10000) + 1

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        eventId: `${
          newEvent.title.substring(0, 3).toLowerCase() +
          Math.floor(Math.random() * 10000) +
          1
        }`,
      });
      setNewEvent({
        eventId: "",
        title: "",
        date: "",
        description: "",
      });
      setCreateEvent(false);
    }
  };

  const handleDelete = (eventId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(eventId);
    }
  };

  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.replace("/admin/sign-in");
      return;
    }

    const user = decode(token);
    if (!user) {
      router.replace("/admin/sign-in");
      return;
    }

    setIsAuthorized(true);
    // console.log(token);
  }, [router]);

  if (!isAuthorized) return <p>Loading...</p>;

  return (
    <div className="h-screen bg-blue-50">
      <div className="flex h-full relative text-black">
        {(createEvent || eventEdit) && (
          <div className="absolute z-10 py-10 px-5 w-full h-full bg-black/50">
            <div>
              <div className="bg-white px-10 sm:w-96 w-full m-auto overflow-auto py-10 space-y-4 relative">
                <span
                  onClick={() => {
                    setCreateEvent(false);
                    setEventEdit(null);
                  }}
                  className="absolute font-bold border px-2.5 py-0.5 rounded-s-full cursor-pointer right-0 top-0"
                >
                  x
                </span>
                <p className="text-xl font-bold text-center">Create Event</p>
                <div>
                  <label htmlFor="title" className="font-medium mb-1 block">
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    defaultValue={eventEdit ? eventEdit.title : ""}
                    className="border block rounded-md w-full py-1 px-3 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="font-medium mb-1 block">
                    Event Date
                  </label>
                  <input
                    type="date"
                    onChange={handleChange}
                    name="date"
                    defaultValue={eventEdit ? eventEdit.date : ""}
                    className="border block rounded-md w-full py-1 px-3 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="font-medium mb-1 block">
                    Event Date
                  </label>
                  <textarea
                    defaultValue={eventEdit ? eventEdit.description : ""}
                    onChange={handleChange}
                    name="description"
                    rows={5}
                    className="border block rounded-md w-full py-1 px-3 outline-none focus:border-blue-500"
                  ></textarea>
                </div>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 w-full text-white py-1 px-5 rounded-md font-medium"
                >
                  {eventEdit ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        )}
        <Sidebar pathname={pathname} />
        <main className="w-full">
          <div className="bg-white w-full py-3 px-3 flex justify-between mb-5">
            <span className="font-bold inline-block w-full text-center sm:text-left">
              Events List
            </span>
            <button
              onClick={() => setCreateEvent(true)}
              className="bg-blue-500 whitespace-nowrap text-white py-1 px-5 rounded-md font-medium"
            >
              Create Event
            </button>
          </div>

          <div className="w-full overflow-hidden px-3">
            <div className="bg-white shadow-2xl overflow-auto w-full">
              <table className="table w-full">
                <thead className="text-gray-500">
                  <tr className="text-left">
                    <th className="px-3 py-3">
                      <input type="checkbox" />
                    </th>
                    <th className="px-3 py-3">#</th>
                    <th className="px-3 py-3 whitespace-nowrap">Event ID</th>
                    <th className="px-3 py-3 whitespace-nowrap">Title</th>
                    <th className="px-3 py-3 whitespace-nowrap">Date</th>
                    <th className="px-3 py-3 whitespace-nowrap">Description</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="divide-y font-medium">
                  {events?.map((event, index) => (
                    <tr className="align-top" key={index}>
                      <td className="py-3 whitespace-nowrap px-3">
                        <input type="checkbox" />
                      </td>
                      <td className="py-3 font-bold whitespace-nowrap px-3">
                        {index + 1}
                      </td>
                      <td className="py-3 whitespace-nowrap px-3">
                        #{event.eventId}
                      </td>
                      <td className="py-3 whitespace-nowrap px-3">
                        {event.title}
                      </td>
                      <td className="py-3 whitespace-nowrap px-3">
                        {event.date}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <span className="truncate w-40 inline-block">
                            {event.description}
                          </span>
                          <span className="text-sm text-blue-500 cursor-pointer">
                            more
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex space-x-2">
                          <span
                            onClick={() => setEventEdit(event)}
                            className="bg-gray-500 cursor-pointer p-2.5 rounded-md"
                          ></span>
                          <span
                            onClick={() => handleDelete(event.eventId)}
                            className="bg-gray-500 cursor-pointer p-2.5 rounded-md"
                          ></span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
    // <div className="container mx-auto px-2 min-h-screen">
    //   <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10">
    //     <div className="col-span-1 relative">
    //       <h1 className="text-4xl font-bold my-4 sm:fixed">Upcoming Events</h1>
    //       <Formik
    //         onSubmit={handleSubmit}
    //         enableReinitialize
    //         initialValues={{
    //           id: "",
    //           title: "",
    //           date: "",
    //           description: "",
    //         }}
    //       >
    //         <Form className="sm:fixed top-20">
    //           <Field
    //             type="text"
    //             name="id"
    //             value={
    //               eventEdit
    //                 ? eventEdit?.id
    //                 : Math.floor(Math.random() * 10000) + 1
    //             }
    //             onChange={handleChange}
    //             hidden
    //             className="border p-2 mb-4 w-full bg-transparent border-black rounded-md outline-none"
    //           />
    //           <label className="block mb-2">Event Title</label>
    //           <Field
    //             type="text"
    //             name="title"
    //             value={eventEdit ? eventEdit?.title : newEvent.title}
    //             onChange={handleChange}
    //             required
    //             className="border p-2 mb-4 w-full bg-transparent border-black rounded-md outline-none"
    //           />
    //           <label className="block mb-2">Event Date</label>
    //           <Field
    //             type="date"
    //             name="date"
    //             value={eventEdit ? eventEdit?.date : newEvent.date}
    //             onChange={handleChange}
    //             className="border p-2 mb-4 w-full bg-transparent border-black rounded-md outline-none"
    //           />
    //           <label className="block mb-2">Event Description</label>
    //           <Field
    //             as="textarea"
    //             className="border p-2 mb-4 w-full bg-transparent border-black rounded-md outline-none"
    //             id="description"
    //             value={
    //               eventEdit ? eventEdit?.description : newEvent.description
    //             }
    //             onChange={handleChange}
    //             name="description"
    //             rows="4" // Set the number of rows as needed
    //           />
    //           <div className="flex space-x-4 mb-10 sm:mb-0">
    //             <button
    //               type="submit"
    //               className="bg-blue-500 text-white py-2 px-4 rounded-full"
    //             >
    //               {eventEdit ? "Update" : "Submit"}
    //             </button>
    //             <Link
    //               href={"/"}
    //               className="bg-blue-500 text-white py-2 px-4 rounded-full"
    //             >
    //               View Events
    //             </Link>
    //           </div>
    //         </Form>
    //       </Formik>
    //     </div>

    //     <div className="col-span-1 py-4">
    //       <div className="flex">
    //         <p
    //           onClick={() => setActivePage("eventList")}
    //           className={`w-full text-center border cursor-pointer border-gray-500 ${
    //             activePage === "eventList" && "bg-blue-500 text-white"
    //           }`}
    //         >
    //           Event list
    //         </p>
    //         <p
    //           onClick={() => setActivePage("registeredUsers")}
    //           className={`w-full text-center border cursor-pointer border-gray-500 ${
    //             activePage === "registeredUsers" && "bg-blue-500 text-white"
    //           }`}
    //         >
    //           Registered users
    //         </p>
    //       </div>

    //       {activePage === "eventList" && (
    //         <ul>
    //           {events?.map((event) => (
    //             <li key={event.id.toString()} className="mb-4">
    //               <div className="flex flex-col justify-end items-end relative group">
    //                 <span className="font-bold z-10 cursor-pointer drop-shadow-lg rounded-full px-1">
    //                   ...
    //                 </span>
    //                 <div className="absolute top-6 text-sm">
    //                   <span
    //                     onClick={() => {
    //                       setEventEdit(event);
    //                       window.scrollTo(0, 0);
    //                     }}
    //                     className="bg-white hover:shadow-md border border-gray-400 hover:bg-blue-500 hover:text-white mb-2 px-2 rounded-full hidden cursor-pointer group-hover:block"
    //                   >
    //                     edit
    //                   </span>
    //                   <span
    //                     onClick={() => handleDelete(event.id)}
    //                     className="bg-white hover:shadow-md border border-gray-400 hover:bg-blue-500 hover:text-white mb-2 px-2 rounded-full hidden cursor-pointer group-hover:block"
    //                   >
    //                     delete
    //                   </span>
    //                 </div>
    //               </div>
    //               <p>
    //                 <span className="font-bold">#{event.id}</span>
    //               </p>
    //               <h2 className="text-xl font-bold"> {event.title}</h2>
    //               <p>
    //                 <span className="font-bold">Date:</span> {event.date}
    //               </p>
    //               <p>
    //                 <span className="font-bold">Description:</span>{" "}
    //                 {event.description}
    //               </p>
    //             </li>
    //           ))}
    //         </ul>
    //       )}

    //       {activePage === "registeredUsers" && (
    //         <ol className="list-decimal ps-5 pt-5 space-y-4">
    //           {users?.map((user, index) => (
    //             <li key={index}>
    //               <p className="font-bold">Name: {user.fullname}</p>
    //               <p>Event ID: #{user.id}</p>
    //               <p>Email: {user.email}</p>
    //               <p>Location: {user.location}</p>
    //             </li>
    //           ))}
    //         </ol>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Event;
