import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
};

export const POST = async () => {
  return new NextResponse("Method not allowed", { status: 405 });
};
