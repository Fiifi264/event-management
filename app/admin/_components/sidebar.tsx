import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { FaClipboardList } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

export default function Sidebar({
  pathname,
  sidebarVisible,
  onClose,
}: {
  pathname: string;
  sidebarVisible: boolean;
  onClose: () => void;
}) {
  const { push } = useRouter();

  const handleLogout = () => {
    try {
      document.cookie = `token=''; path=/admin`;

      // redirect the user to /dashboard
      push("/admin/sign-in");
    } catch (e) {
      const error = e as AxiosError;

      alert(error.message);
    }
  };

  return (
    <div
      className={`md:bg-white/60 bg-white/95 p-10 rounded-xl flex items-center flex-col absolute md:relative transition-all h-full md:h-auto z-10 md:left-0 ${
        sidebarVisible ? "left-0" : "-left-52"
      }`}
    >
      <span
        onClick={onClose}
        className={`absolute right-2 top-2 bg-emerald-300 text-white px-2 self-end rounded-full cursor-pointer md:hidden`}
      >
        x
      </span>
      <div className="bg-gray-400 h-20 w-20 rounded-full mb-2"></div>
      <p className="font-extrabold mb-10">Administrator</p>
      <div>
        <Link href={"/admin"} className="cursor-pointer block mb-5">
          <div
            className={`flex items-center space-x-3 ${
              pathname === "/admin" &&
              "bg-gradient-to-t from-5% from-emerald-200"
            }`}
          >
            <FaClipboardList size={20} /> <span>Events</span>
          </div>
        </Link>
        <Link
          href={"/admin/registered-users"}
          className="cursor-pointer block mb-5"
        >
          <div
            className={`flex items-center space-x-3 ${
              pathname === "/registered-users" &&
              "bg-gradient-to-t from-5% from-emerald-200"
            }`}
          >
            <FaUsers size={20} /> <span>Participants</span>
          </div>
        </Link>
        <div className="cursor-pointer" onClick={handleLogout}>
          <div
            className={`flex items-center space-x-3 ${
              pathname === "/logout" &&
              "bg-gradient-to-t from-5% from-emerald-200"
            }`}
          >
            <CgLogOut size={20} /> <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );

  <aside
    className={`h-full w-52 py-5 absolute transition-all ${
      sidebarVisible ? "left-0" : "-left-52"
    } sm:relative sm:left-0 font-medium bg-blue-900 text-white`}
  >
    <div className="flex flex-col relative pt-10">
      <p
        // onClick={() => setSidebarVisible(!sidebarVisible)}
        className="absolute -right-7 -top-3.5 sm:hidden bg-blue-900 px-3 py-1 rounded-e-full font-bold text-end cursor-pointer"
      >
        {sidebarVisible ? "x" : ">"}
      </p>
      {/*<Link
          href={"/admin/dashboard"}
          className={`py-3 px-2 ${
            pathname.includes("dashboard") && "bg-blue-500"
          }`}
        >
          Dashboard
        </Link>*/}
      <Link
        href={"/admin"}
        className={`py-3 px-2 ${pathname === "/admin" && "bg-blue-500"}`}
      >
        Events
      </Link>
      <Link
        href={"/admin/registered-users"}
        className={`py-3 px-2 ${
          pathname.includes("registered-users") && "bg-blue-500"
        }`}
      >
        Participants
      </Link>
      <button onClick={handleLogout} className={`py-3 px-2 text-start mt-10`}>
        Logout
      </button>
    </div>
  </aside>;
}
