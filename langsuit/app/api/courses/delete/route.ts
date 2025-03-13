import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import db from '@/db/drizzle';
import { courses } from '@/db/schema';
import redis from '@/lib/redis';

export async function DELETE(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { courseId } = body;

    console.log(courseId);

    // Validate input
    if (!courseId) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }

    // Check if the course exists
    const existingCourse = await db
      .select()
      .from(courses)
      .where(eq(courses.id, courseId))
      .limit(1);

    if (existingCourse.length === 0) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Delete the course
    await db.delete(courses).where(eq(courses.id, courseId));

    // Remove from the cache
    await redis.del("get_available_courses");
    // Return success response
    return NextResponse.json(
      { message: 'Course deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Course deletion error:', error);

    // Handle different types of errors
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unexpected error' },
      { status: 500 }
    );
  }
}
