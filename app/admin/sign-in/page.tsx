"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    };

    try {
      const { data } = await axios.post("/api/auth/login", payload);
      const token = data.token;
      document.cookie = `token=${token}; path=/admin`;

      // redirect the user to /dashboard
      push("/admin");
    } catch (e) {
      const error = e as AxiosError;

      alert(error.message);
    }
  };

  return (
    <div className="h-screen bg-blue-50 text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="h-full overflow-hidden">
          <div className="relative h-full">
            <div className="absolute space-y-6 z-10 text-white h-full w-full bg-black/50 flex flex-col items-center justify-center">
              <p className="font-bold text-xl">Hello Admin</p>
              <p className="px-3 text-center">
                To be able to enter the system, please provide your login
                details.
              </p>
              <Link
                href="/"
                className="bg-blue-500 px-10 py-1 mx-auto rounded-md text-white"
              >
                Goto homepage
              </Link>
            </div>
            <Image
              src="/images/sign-in-img.png"
              alt="sign-in"
              objectFit="cover"
              // layout="responsive"
              // height={500}
              // width={500}
              fill
            />
          </div>
        </div>
        <div className="flex items-center flex-col container mx-auto px-4 py-10 md:py-0 md:justify-center h-full md:px-10">
          <p className="font-bold mb-10">
            Event <span className="text-blue-500">Management</span>
          </p>
          <p className="text-xl mb-10 capitalize font-bold">
            Sign in to event management{" "}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="w-full">
              <label htmlFor="email" className="block font-bold mb-1">
                Email
              </label>
              <input
                type="text"
                name="username"
                className="border w-full px-2 py-1 rounded-md"
                placeholder="Enter admin email"
              />
            </div>

            <div className="w-full">
              <label htmlFor="password" className="block font-bold mb-1">
                Password
              </label>
              <input
                type="text"
                name="password"
                className="border w-full px-2 py-1 rounded-md"
                placeholder="Enter admin email"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 px-10 py-1 mx-auto rounded-md text-white"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <form onSubmit={handleSubmit}>
        <input type="text" name="username" />
        <input type="text" name="password" />
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
}
