import { NextResponse } from 'next/server';
import db from '@/db/drizzle';
import { guidance, videosList } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { guidanceId } = body;

    if (!guidanceId) {
      return NextResponse.json({ message: 'Missing guidanceId' }, { status: 400 });
    }

    // Check if the guidance exists
    const course = await db
      .select()
      .from(guidance)
      .where(eq(guidance.id, guidanceId))
      .execute();

    console.log(course);
    if (!course.length) {
      return NextResponse.json({ message: 'Guidance not found' }, { status: 404 });
    }

    // Fetch videos related to this guidance
    const videos = await db
      .select()
      .from(videosList)
      .where(eq(videosList.courseId, guidanceId))
      .execute();

    console.log(videos);
    if (!videos.length) {
      return NextResponse.json({ message: 'No videos found for this guidance' }, { status: 404 });
    }

    const formattedVideos = videos.map((video) => ({
      id: video.id,
      title: video.title,
      duration: video.duration_in_minutes, // Assuming you have a `duration_in_minutes` field in your schema
      videoUrl: video.url,
    }));

    return NextResponse.json(formattedVideos, { status: 200 });
  } catch (error) {
    console.error('Error fetching playlist:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
