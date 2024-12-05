import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/drizzle';
import { userQuests } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { User } from '@clerk/nextjs/server'; // Correct server-side import



// GET handler
export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const user_id = url.searchParams.get('user_id');
    if(!user_id){
      return  NextResponse.json(
        {
          message: "User Id is not present",
        },
        { status: 400 }
      );
    }
    const userQuestsData = await db.select().from (userQuests).where(eq(userQuests.userId, Number(user_id)));
    
    return NextResponse.json(userQuestsData, { status: 200 });
  } catch (err) {
    console.error('Error in GET method:', err);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
