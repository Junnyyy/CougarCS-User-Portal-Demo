import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  const supabaseClient = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (session) {
    return NextResponse.next();
  }

  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/login";
  redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);

  return NextResponse.redirect(redirectUrl);
};

export const config = {
  matcher: ["/profile/:path*", "/"],
};
