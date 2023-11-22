"use client";
import Link from "next/link";
import { useState, ChangeEvent } from "react";
import EventDetails from "../../interfaces/event-details.interfaces";
import {
  useEventDelete,
  useEventUpdate,
  useEventsMutation,
  useEvents,
} from "../../hooks/useEvents";
import { useUsers } from "../../hooks/useUsers";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import Sidebar from "../_components/sidebar";

const defaultEvents: EventDetails[] = [
  {
    id: "1",
    title: "New Event 1",
    date: "16/11/2023",
    description: "This is a tech event that is about to happen recently",
  },
  {
    id: "2",
    title: "New Event 2",
    date: "17/11/2023",
    description: "This is a tech event that is about to happen again",
  },
];

const RegisteredUsers = () => {
  const pathname = usePathname();
  const [eventEdit, setEventEdit] = useState<any>(null);

  const {
    data: users,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUsers();

  return (
    <div className="h-screen bg-blue-50">
      <div className="flex h-full text-black">
        <Sidebar pathname={pathname} />
        <main className="w-full">
          <div className="bg-white w-full py-3 px-3 flex justify-between mb-5">
            <span className="font-bold">Registered Users</span>
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
                    <th className="px-3 py-3 whitespace-nowrap">Full Name</th>
                    <th className="px-3 py-3 whitespace-nowrap">Email</th>
                    <th className="px-3 py-3 whitespace-nowrap">Location</th>
                    <th className="px-3 py-3 whitespace-nowrap">Event ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y font-medium">
                  {users?.map((user, index) => (
                    <tr className="align-top" key={index}>
                      <td className="py-3 whitespace-nowrap px-3">
                        <input type="checkbox" />
                      </td>
                      <td className="py-3 font-bold whitespace-nowrap px-3">
                        {index + 1}
                      </td>

                      <td className="py-3 whitespace-nowrap px-3">
                        {user.fullname}
                      </td>
                      <td className="py-3 whitespace-nowrap px-3">
                        {user.email}
                      </td>
                      <td className="py-3 whitespace-nowrap px-3">
                        {user.location}
                      </td>
                      <td className="py-3 whitespace-nowrap px-3">
                        #{user.eventId}
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
  );
};

export default RegisteredUsers;
