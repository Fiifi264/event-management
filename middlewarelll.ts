import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
  let verify = req.cookies.get("loggedin");
  let url = req.url;

  if (!verify && url.includes("/admin")) {
    return NextResponse.redirect("localhost:3000/admin/sign-in");
  } else {
    console.log("What is happening");
  }
}
