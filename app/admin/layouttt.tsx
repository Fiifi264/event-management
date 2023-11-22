"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SignIn from "./sign-in/page";

interface UserResponse {
  user: string | null;
  error: AxiosError | null;
}

export default function Adminlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      if (error) {
        router.push("/admin/sign-in");
        return;
      }

      setIsSuccess(true);
    })();
  }, []);

  return <main>{children}</main>;
}

async function getUser(): Promise<UserResponse> {
  try {
    const { data } = await axios.get("/api/auth/me");

    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;

    return { user: null, error };
  }
}
