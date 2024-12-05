// `app/api/courses/available/route.ts`

import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/drizzle';
import { courses } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    // Fetch all courses with basic information
    const availableCourses = await db
      .select({
        id: courses.id,
        title: courses.title,
        description: courses.description,
        category: courses.category,
        price: courses.price,
        level: courses.level,
        imageSrc: courses.imageSrc,
        visits: courses.visits,
      })
      .from(courses)
      .orderBy(courses.visits); // Example: order by most visited courses

    // Transform the data to match the expected frontend structure
    const formattedCourses = availableCourses.map((course) => ({
      id: course.id.toString(), // Ensure ID is a string
      title: course.title,
      description: course.description || '',
      date: new Date().toISOString().split('T')[0], // Default to current date
      time: '19:30', // Default time
      price: course.price || 0,
      category: course.category,
      level: course.level,
      imageSrc: course.imageSrc,
      visits: course.visits, // Include visits for frontend usage
    }));

    return NextResponse.json(
      {
        courses: formattedCourses,
        total: formattedCourses.length,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching courses:', error);

    return NextResponse.json(
      {
        message: 'Failed to fetch courses',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
