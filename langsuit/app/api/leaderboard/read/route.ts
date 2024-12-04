// import { authMiddleware } from '@clerk/nextjs';
import db from '@/db/drizzle';
import {  users } from '@/db/schema';
import { eq, desc } from 'drizzle-orm/expressions';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';
import { NextResponse,NextRequest } from 'next/server';
const formatLeaderboardData = (data: any[]) => {
  return data.map((entry) => ({
    id: entry.user.id,
    userName: entry.user.username,
    points: entry.points,
  }));
};

// export const getLeaderboardData = authMiddleware(async (req, res) => {
//   console.log("hit");
//   const { userId } = req.auth;

//   if (!userId) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   try {
//     const now = new Date();

//     const weeklyStart = startOfWeek(now);
//     const weeklyEnd = endOfWeek(now);
//     const monthlyStart = startOfMonth(now);
//     const monthlyEnd = endOfMonth(now);

//     const weeklyData = await db
//       .select({
//         id: leaderboard.userId,
//         user: {
//           id: user.id,
//           username: user.username,
//         },
//         points: leaderboard.points,
//       })
//       .from(leaderboard)
//       .innerJoin(user, eq(leaderboard.userId, user.id))
//       .where(leaderboard.updatedAt.between(weeklyStart, weeklyEnd))
//       .orderBy(desc(leaderboard.points))
//       .limit(10);

//     const monthlyData = await db
//       .select({
//         id: leaderboard.userId,
//         user: {
//           id: user.id,
//           username: user.username,
//         },
//         points: leaderboard.points,
//       })
//       .from(leaderboard)
//       .innerJoin(user, eq(leaderboard.userId, user.id))
//       .where(leaderboard.updatedAt.between(monthlyStart, monthlyEnd))
//       .orderBy(desc(leaderboard.points))
//       .limit(10);

//     const weeklyLeaderboard = formatLeaderboardData(weeklyData);
//     const monthlyLeaderboard = formatLeaderboardData(monthlyData);

//     return res.json({
//       weekly: weeklyLeaderboard,
//       monthly: monthlyLeaderboard,
//     });
//   } catch (error) {
//     console.error("Error fetching leaderboard data:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });


export const GET =(req:NextRequest)=>{
  try {
    const url  = new URL(req.url);
    const user_id = url.searchParams.get('user_id');
    
     return NextResponse.json({
      status:true
     })
    
  } catch (error) {
    return NextResponse.json({
      status:false
     })
    console.log(error);

    
  }

}
