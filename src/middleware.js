import { NextResponse } from "next/server";

// Guard the /dashboard area: no admin cookie => bounce to login.
// (Cookie presence is the edge check; the dashboard layout re-verifies staff
//  status server-side via Django, so a forged/expired cookie still can't get in.)
export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard/login")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
