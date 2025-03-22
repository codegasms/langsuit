import db from '@/db/drizzle';
import {userProgress} from '@/db/schema';
import { NextRequest,NextResponse } from 'next/server';
export async function GET(req:NextRequest){
    try {
        const userProgressData = await db.select({
            userId:userProgress.userId,
            userName:userProgress.userName,
            points:userProgress.points
        }).from(userProgress).orderBy(userProgress.points).limit(10);
        const orderedData = userProgressData.reverse();

        return NextResponse.json({
            status :true,
            data:orderedData
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status:false,
            message:error?.message
        })
        
    }
}

