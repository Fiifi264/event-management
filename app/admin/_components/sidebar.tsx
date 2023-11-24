import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar({ pathname }: { pathname: string }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

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
    <aside
      className={`h-full w-52 py-5 absolute transition-all ${
        sidebarVisible ? "left-0" : "-left-52"
      } sm:relative sm:left-0 font-medium bg-blue-900 text-white`}
    >
      <div className="flex flex-col relative pt-10">
        <p
          onClick={() => setSidebarVisible(!sidebarVisible)}
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
    </aside>
  );
}
