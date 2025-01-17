import { languageProgress } from '@/db/schema';
import db from '@/db/drizzle';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    
    const url = new URL(req.url);
    const username = url.searchParams.get('username');
    
    
    if (!username) {
      return NextResponse.json(
        {
          message: 'UserName is not present',
        },
        { status: 400 }
      );
    }
    
    const userQuestsData = await db.select().from(languageProgress).where(eq(languageProgress.username, username));

    return NextResponse.json(userQuestsData, { status: 200 });
  } catch (err) {
    console.error('Error in GET method:', err);
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}



