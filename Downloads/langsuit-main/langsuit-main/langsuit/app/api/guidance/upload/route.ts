import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import unzipper from 'unzipper';
import path from 'path';
import db from '@/db/drizzle';
import { guidance, instructor, videosList, users } from '@/db/schema';

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req: NextRequest) => {
  try {
    // Parse FormData
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const price = formData.get('price') as string;
    const username = formData.get('username') as string;

    if (!file || !title || !price || !username) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    // Find instructor by username (using db.query)
    const foundUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, username),
    });

    if (!foundUser) {
      return NextResponse.json({ message: 'Instructor not found' }, { status: 404 });
    }

    const foundInstructor = await db.query.instructor.findFirst({
      where: (instructor, { eq }) => eq(instructor.userId, foundUser.id),
    });

    if (!foundInstructor) {
      return NextResponse.json({ message: 'Instructor not found' }, { status: 404 });
    }

    // Create course path
    const coursePath = path.join(process.cwd(), 'public', 'courses', `${Date.now()}_${title}`);
    await fs.ensureDir(coursePath);

    // Save zip file temporarily
    const buffer = Buffer.from(await file.arrayBuffer());
    const zipPath = path.join(coursePath, `${file.name}`);
    await fs.writeFile(zipPath, buffer);

    // Extract zip file
    await fs.createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: coursePath }))
      .promise();

    const files = await fs.readdir(coursePath);
    const videoFiles = files.filter(file => file.endsWith('.mp4') || file.endsWith('.mkv'));

    if (videoFiles.length === 0) {
      return NextResponse.json({ message: 'No valid video files found in the zip' }, { status: 400 });
    }

    // Insert new course into the database
    const [newCourse] = await db
      .insert(guidance)
      .values({
        name: title,
        price: parseInt(price),
        durationInHours: 2,
        instructorId: foundInstructor.id,
      })
      .returning();

    // Insert video details into the database
    for (const video of videoFiles) {
      await db.insert(videosList).values({
        courseId: newCourse.id,
        title: video,
        url: `/courses/${path.basename(coursePath)}/${video}`,
      });
    }

    // Remove zip file after extraction
    await fs.remove(zipPath);

    return NextResponse.json({ message: 'Course created successfully', course: newCourse }, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
