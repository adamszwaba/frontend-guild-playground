// middleware.ts
import type { NextRequest } from "next/server";
import { client } from "./server/router/client";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/_next")) {
    return;
  }
  await client.mutation("example.pathnames", { pathname });
}
