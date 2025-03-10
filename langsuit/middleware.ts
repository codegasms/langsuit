import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

// Rate limit settings
const rateLimit = new Map();
const RATE_LIMIT_TIME_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100; // Maximum requests per window

export default clerkMiddleware(async (auth, request) => {
  const ip = request.ip ?? "127.0.0.1";
  const now = Date.now();

  // Get current rate limit data for this IP
  const rateLimitData = rateLimit.get(ip) ?? { count: 0, startTime: now };

  // Reset count if time window has passed
  if (now - rateLimitData.startTime > RATE_LIMIT_TIME_WINDOW) {
    rateLimitData.count = 0;
    rateLimitData.startTime = now;
  }

  // Increment request count
  rateLimitData.count++;
  rateLimit.set(ip, rateLimitData);

  // Check if rate limit exceeded
  if (rateLimitData.count > MAX_REQUESTS) {
    return new NextResponse("Rate limit exceeded", { status: 429 });
  }

  // Continue with auth protection
  if (!isPublicRoute(request)) {
    auth().protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
