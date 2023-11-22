"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { user, error } = await getUser();

        if (error) {
          router.push("/admin/sign-in");
          return;
        }

        setIsSuccess(true);
      } finally {
        // Set loading state to false regardless of success or failure
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isSuccess) {
    return null; // or any other error handling UI you want to display
  }

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
