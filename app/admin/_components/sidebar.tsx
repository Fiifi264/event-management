import Link from "next/link";

export default function Sidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="h-full w-52 py-5 absolute sm:relative font-medium bg-blue-900 text-white">
      <div className="flex flex-col">
        <Link
          href={"/admin/dashboard"}
          className={`py-3 px-2 ${
            pathname.includes("dashboard") && "bg-blue-500"
          }`}
        >
          Dashboard
        </Link>
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
      </div>
    </aside>
  );
}
