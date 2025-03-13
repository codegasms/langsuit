import { eq } from 'drizzle-orm';
import db from '@/db/drizzle';
import { guidance, instructor, users } from '@/db/schema';

export const POST = async (req: Request) => {
  try {
    const { username } = await req.json();
    console.log(username);
    if (!username) {
      return new Response(
        JSON.stringify({ message: "Username is required" }),
        { status: 400 }
      );
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

      console.log(user);

    if (user.length === 0) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    const userId = user[0].id;

    const _instructor = await db
      .select()
      .from(instructor)
      .where(eq(instructor.userId, userId))
      .limit(1);

      console.log(_instructor);

    if (_instructor.length === 0) {
      return new Response(
        JSON.stringify({ message: "Instructor not found" }),
        { status: 404 }
      );
    }

    const instructorId = _instructor[0].id;

    const instructorGuidance = await db
      .select()
      .from(guidance)
      .where(eq(guidance.instructorId, instructorId));

    return new Response(
      JSON.stringify({ courses : instructorGuidance }),
      { status: 200 }
    );
  } catch (err) {
    console.error('Error:', err);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500 }
    );
  }
};
