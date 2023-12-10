"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

import EventDetails from "../../interfaces/event-details.interfaces";
import { useUsers } from "../../hooks/useUsers";
import Sidebar from "../_components/sidebar";
import { COOKIE_NAME } from "@/constants";
import { decode, verify } from "jsonwebtoken";
import { RiEdit2Fill } from "react-icons/ri";
import { IoTrashBin } from "react-icons/io5";
import { BiMenuAltLeft } from "react-icons/bi";

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

const RegisteredUsers = () => {
  const pathname = usePathname();
  const [eventEdit, setEventEdit] = useState<any>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const {
    data: users,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUsers();

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
    <div className="py-10 px-5 lg:max-w-5xl m-auto relative text-blue-900/75 font-bold">
      <div className="h-32 w-32 rounded-full bg-white/60 absolute -right-10 -top-1"></div>
      <div className="h-32 w-32 rounded-full bg-white/60 absolute -left-10 -bottom-1"></div>
      <div className="bg-white/50 m-auto rounded-xl flex relative overflow-hidden">
        <Sidebar
          pathname={pathname}
          sidebarVisible={sidebarVisible}
          onClose={() => setSidebarVisible(false)}
        />
        <div className="p-5 w-full overflow-hidden">
          <div className="flex space-x-3">
            <BiMenuAltLeft
              size={20}
              className={"mt-1 cursor-pointer md:hidden"}
              onClick={() => setSidebarVisible(true)}
            />
            <p className="border-b-8 text-2xl mb-10 border-white/60 w-1/2 rounded-sm font-extrabold">
              Event List
            </p>
          </div>
          <div className="overflow-auto w-full">
            <table className="table w-full">
              <thead className="text-gray-500">
                <tr className="text-left hover:bg-white/30 transition">
                  <th className="px-3 py-3">
                    <input type="checkbox" />
                  </th>
                  <th className="px-3 py-3">#</th>
                  <th className="px-3 py-3 whitespace-nowrap text-sm">
                    Event ID
                  </th>
                  <th className="px-3 py-3 whitespace-nowrap text-sm">
                    Full Name
                  </th>
                  <th className="px-3 py-3 whitespace-nowrap text-sm">Email</th>
                  <th className="px-3 py-3 whitespace-nowrap text-sm">
                    Location
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y font-medium">
                {users?.map((user, index) => (
                  <tr
                    className="align-top hover:bg-white/30 transition"
                    key={index}
                  >
                    <td className="py-3 whitespace-nowrap px-3">
                      <input type="checkbox" />
                    </td>
                    <td className="py-3 font-bold whitespace-nowrap px-3">
                      {index + 1}
                    </td>
                    <td className="py-3 whitespace-nowrap px-3">
                      #{user.eventId}
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
                    <td className="py-3 px-3">
                      <div className="flex space-x-2">
                        {/* <span
                          onClick={() => setEventEdit(event)}
                          className="bg-gray-500 cursor-pointer p-2.5 rounded-md"
                        ></span> */}
                        <RiEdit2Fill size={20} className="cursor-pointer" />
                        <IoTrashBin
                          size={20}
                          className="text-red-400 cursor-pointer"
                        />
                        {/* <span
                          onClick={() => handleDelete(event.eventId)}
                          className="bg-gray-500 cursor-pointer p-2.5 rounded-md"
                        ></span> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisteredUsers;
