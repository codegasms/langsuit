import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/drizzle';
import { eq } from 'drizzle-orm';
import { guidance, instructor, users } from '@/db/schema';
export async function POST(req: NextRequest) {
  try {
    const { title, visits, price, username } = await req.json();

    if (!title || !visits || !price || !username) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    console.log('Title:', title, 'Username:', username);

    // Find instructor by username through user table
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

    if (!instructor) {
      return NextResponse.json({ message: 'Instructor not found' }, { status: 404 });
    }

    // Add new course
    const newCourse = await db.insert(guidance).values({
      name: title,
      price,
      durationInHours:2,
      instructorId,
    });

    return NextResponse.json({title,price,visits}, { status: 201 });
  } catch (error) {
    console.error('Error adding course:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
