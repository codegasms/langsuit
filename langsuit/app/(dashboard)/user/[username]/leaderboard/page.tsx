// app/(dashboard)/user/[username]/leaderboard/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';


const dummyLeaderboardData = {
    weekly: [
        { day: 'Mon', points: 30 },
        { day: 'Tue', points: 20 },
        { day: 'Wed', points: 50 },
        { day: 'Thu', points: 40 },
        { day: 'Fri', points: 70 },
        { day: 'Sat', points: 60 },
        { day: 'Sun', points: 80 },
    ],
    monthly: [
        { month: 'Jan', points: 150 },
        { month: 'Feb', points: 200 },
        { month: 'Mar', points: 180 },
        { month: 'Apr', points: 220 },
        { month: 'May', points: 250 },
        { month: 'Jun', points: 300 },
        { month: 'Jul', points: 350 },
        { month: 'Aug', points: 400 },
        { month: 'Sep', points: 450 },
        { month: 'Oct', points: 500 },
        { month: 'Nov', points: 550 },
        { month: 'Dec', points: 600 },
    ],
};

const dummyChartData = {
    weekly: [
        { day: 'Mon', points: 30 },
        { day: 'Tue', points: 20 },
        { day: 'Wed', points: 50 },
        { day: 'Thu', points: 40 },
        { day: 'Fri', points: 70 },
        { day: 'Sat', points: 60 },
        { day: 'Sun', points: 80 },
    ],
    monthly: [
        { month: 'Jan', points: 150 },
        { month: 'Feb', points: 200 },
        { month: 'Mar', points: 180 },
        { month: 'Apr', points: 220 },
        { month: 'May', points: 250 },
    ],
};

const LeaderboardPage = () => {
    const [leaderboardData, setLeaderboardData] = useState(dummyLeaderboardData.weekly);
    const [chartData, setChartData] = useState(dummyChartData.weekly);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeframe, setTimeframe] = useState('weekly');

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`http://localhost:3000/api/leaderboard/read?user_id=1`); 
                console.log(response);// Replace with dynamic user ID if necessary

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if (data && data.length > 0) {
                    // Assuming data contains leaderboard info
                    setLeaderboardData(data);
                    setChartData(dummyChartData.weekly); // Update chart data based on fetched data if necessary
                } else {
                    // Fall back to dummy data if no data is returned
                    setLeaderboardData(dummyLeaderboardData.weekly);
                    setChartData(dummyChartData.weekly);
                }
            } catch (err) {
                setError(err.message);
                // Fall back to dummy data in case of error
                setLeaderboardData(dummyLeaderboardData.weekly);
                setChartData(dummyChartData.weekly);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboardData();
    }, []);

    const handleTimeframeChange = (event) => {
        const selectedTimeframe = event.target.value;
        setTimeframe(selectedTimeframe);
        setLeaderboardData(dummyLeaderboardData[selectedTimeframe]);
        setChartData(dummyChartData[selectedTimeframe]);
    };

    // Bubble component defined inline
    const Bubble = ({ size, duration }) => {
        const bubbleStyle = {
            position: 'absolute',
            borderRadius: '50%',
            background: `rgba(255, 255, 255, 0.3)`, // Light bubbles
            opacity: 0.5,
        };

        return (
            <motion.div
                style={{
                    ...bubbleStyle,
                    width: size,
                    height: size,
                    bottom: '0%',
                    left: Math.random() * 100 + '%',
                }}
                animate={{
                    y: ['100vh', '-10vh'], // Animate from bottom to top
                    transition: {
                        duration: duration,
                        ease: 'linear',
                        repeat: Infinity,
                        repeatType: 'loop',
                    },
                }}
            />
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px', color: '#f0f4fc', position: 'relative', overflow: 'hidden' }}>
            {/* Bubbles Background */}
            {[...Array(10)].map((_, index) => (
                <Bubble key={index} size={`${Math.random() * 50 + 20}px`} duration={Math.random() * 4 + 3} />
            ))}

            <motion.h1 
                initial={{ y: -20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.5 }}
            >
                Leaderboard
            </motion.h1>
            
            {/* Button to switch between weekly and monthly */}
            <div style={{ marginBottom: '20px' }}>
                <select onChange={handleTimeframeChange} value={timeframe} style={{ marginRight: '10px', padding: '8px', borderRadius: '5px' }}>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
                <motion.button 
    onClick={() => {
        const newTimeframe = timeframe === 'weekly' ? 'monthly' : 'weekly';
        setTimeframe(newTimeframe);
        setLeaderboardData(dummyLeaderboardData[newTimeframe]);
        setChartData(dummyChartData[newTimeframe]);
    }}
    initial={{ scale: 0.9, opacity: 0 }} 
    animate={{ scale: 1, opacity: 1 }} 
    transition={{ duration: 0.3 }}
    style={{
        padding: '10px 15px',
        background: '#4caf50',
        border: 'none',
        borderRadius: '5px',
        color: '#fff',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'background 0.3s ease',
    }}
    whileHover={{ background: '#45a049' }}
>
    {timeframe === 'weekly' ? 'Switch to Monthly' : 'Switch to Weekly'}
</motion.button>
            </div>

            <motion.h2 
                initial={{ y: -20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Leaderboard
            </motion.h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {leaderboardData.map((user, index) => (
                    <motion.div 
                        key={user.id} 
                        initial={{ scale: 0.9, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }} 
                        transition={{ duration: 0.3, delay: index * 0.1 }} 
                        style={{
                            padding: '15px',
                            background: '#292929',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <strong>{index + 1}. {user.userName}</strong> - {user.points} points
                    </motion.div>
                ))}
            </div>

            <motion.h2 
                initial={{ y: -20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} Points Trend
            </motion.h2>
            <div style={{ borderRadius: '8px', overflow: 'hidden', background: '#292929', padding: '20px' }}>
                <ResponsiveContainer width="100%" height={300}>
                    {timeframe === 'weekly' ? (
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="points" stroke="#8884d8" />
                        </LineChart>
                    ) : (
                        <AreaChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="points" fill="#8884d8" stroke="#8884d8" />
                        </AreaChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default LeaderboardPage;
