import db from '@/db/drizzle';  
import { leaderboard, leaderboardRelations, user } from '@/db/schema';
import { eq, desc } from 'drizzle-orm/expressions';  
import { startOfWeek, startOfMonth, endOfWeek, endOfMonth } from 'date-fns';  


const formatLeaderboardData = (data: any[]) => {
    return data.map((entry) => ({
        id: entry.user.id,
        userName: entry.user.username,
        points: entry.points,
    }));
};


export const getLeaderboardData = async () => {
    const now = new Date();

    
    const weeklyStart = startOfWeek(now);
    const weeklyEnd = endOfWeek(now);
    const monthlyStart = startOfMonth(now);
    const monthlyEnd = endOfMonth(now);

    
    const weeklyData = await db.select({
        id: leaderboard.userId,
        user: {
            id: user.id,
            username: user.username,
        },
        points: leaderboard.points,
    })
    .from(leaderboard)
    .innerJoin(user, leaderboard.userId.eq(user.id))
    .where(leaderboard.updatedAt.between(weeklyStart, weeklyEnd))  
    .orderBy(leaderboard.points.desc())  
    .limit(10);  

   
    const monthlyData = await db.select({
        id: leaderboard.userId,
        user: {
            id: user.id,
            username: user.username,
        },
        points: leaderboard.points,
    })
    .from(leaderboard)
    .innerJoin(user,eq(leaderboard.userId,user.id))
    .where(leaderboard.updatedAt.between(monthlyStart, monthlyEnd))  // Filter by the current month
    .orderBy(leaderboard.points.desc())  // Order by points descending
    .limit(10);  // Top 10 users

    // Format the leaderboard data
    const weeklyLeaderboard = formatLeaderboardData(weeklyData);
    const monthlyLeaderboard = formatLeaderboardData(monthlyData);

    return {
        weekly: weeklyLeaderboard,
        monthly: monthlyLeaderboard,
    };
};

// Fetches chart data (weekly or monthly aggregated points)
export const getChartData = async (period: 'weekly' | 'monthly') => {
    const now = new Date();
    let start, end;

    if (period === 'weekly') {
        start = startOfWeek(now);
        end = endOfWeek(now);
    } else {
        start = startOfMonth(now);
        end = endOfMonth(now);
    }

    // Fetch data to aggregate points for each day/week
    const chartData = await db.select({
        date: leaderboard.updatedAt,  // This will be grouped by day or week
        points: leaderboard.points,   // Points to be aggregated
    })
    .from(leaderboard)
    .where(leaderboard.updatedAt.between(start, end))  // Filter by the time range (weekly/monthly)
    .groupBy(leaderboard.updatedAt)  // Group by the date (you can adjust it to group by day/week/month)
    .orderBy(leaderboard.updatedAt.asc());

    
    const formattedChartData = chartData.map((entry) => ({
        day: entry.date,  // For weekly
        points: entry.points,
    }));

    return formattedChartData;
};


export const getLeaderboardAndChartData = async () => {
    
    const leaderboardData = await getLeaderboardData();

    
    const weeklyChartData = await getChartData('weekly');
    const monthlyChartData = await getChartData('monthly');

    return {
        leaderboard: leaderboardData,
        chartData: {
            weekly: weeklyChartData,
            monthly: monthlyChartData,
        },
    };
};
