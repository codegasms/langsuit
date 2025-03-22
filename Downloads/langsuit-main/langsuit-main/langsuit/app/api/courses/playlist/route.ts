import db from '@/db/drizzle';
import { courses, videos } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
 try {
   const body = await request.json();
   const { courseId } = body;

   if (!courseId) {
     return NextResponse.json(
       { error: 'Course ID is required' }, 
       { status: 400 }
     );
   }

   const courseVideos = await db.query.videos.findMany({
     where: eq(videos.courseId, Number(courseId)),
     orderBy: (videos, { asc }) => [asc(videos.order)]
   });

   return NextResponse.json(courseVideos);
 } catch (error) {
   console.error('Failed to fetch course playlist:', error);
   return NextResponse.json(
     { error: 'Failed to retrieve course playlist' }, 
     { status: 500 }
   );
 }
}