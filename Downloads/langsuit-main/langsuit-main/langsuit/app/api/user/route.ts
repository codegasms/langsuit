import { getAuth } from '@clerk/nextjs/server';

export const POST = async (req: Request, res: Response) => {
  try {
    const body = await req.json();
    const { username } = body; // Assuming 'role' is no longer needed with Clerk
    console.log(body);

    // Authenticate the request
    const { userId } = getAuth(req);
    if (!userId) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    // Fetch all users from Clerk (you may want to filter more efficiently if Clerk supports it)
    const response = await fetch(`https://api.clerk.dev/v1/users`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users from Clerk.");
    }

    const users = await response.json();

    // Find the user with the matching username
    const user = users.find((user: any) => user.username === username);

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};
