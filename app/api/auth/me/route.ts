import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();

  console.log(cookieStore);
}
