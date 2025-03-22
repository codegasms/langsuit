import { auth } from "@clerk/nextjs/server";

export const GET = async (req: Request) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response(
        JSON.stringify({ message: "User not authenticated" }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({ userId }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching userId:", err);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
