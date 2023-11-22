"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

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
      alert(JSON.stringify(data));

      // redirect the user to /dashboard
      push("/admin");
    } catch (e) {
      const error = e as AxiosError;

      alert(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" />
        <input type="text" name="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
