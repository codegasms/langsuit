'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Table } from 'react-bootstrap';
import { motion } from 'framer-motion';

const dummyQuests = [
  {
    id: 1,
    title: "Learn JavaScript Basics",
    progress: 80,
    description: "Complete the beginner JavaScript quest.",
    rewardPoints: 100,
    difficulty: "Easy",
    timeSpent: 5,
    completed: false,
    expiresAt: "2024-10-01",
  },
  {
    id: 2,
    title: "Master React",
    progress: 50,
    description: "Learn advanced concepts in React.",
    rewardPoints: 150,
    difficulty: "Hard",
    timeSpent: 15,
    completed: false,
    expiresAt: "2024-11-01",
  },
  {
    id: 3,
    title: "Intro to Next.js",
    progress: 100,
    description: "Complete the Next.js introduction course.",
    rewardPoints: 200,
    difficulty: "Medium",
    timeSpent: 10,
    completed: true,
    expiresAt: "2024-12-01",
  },
];

const COLORS = ['#FFEC99', '#FFD700', '#FFB6C1'];

const QuestsPage = () => {
  const { username } = useParams();
  const [quests, setQuests]  = useState(dummyQuests);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch data from the API
    const fetchQuests = async () => {
      try {
        setLoading(true); // Set loading to true at the start of fetch
        const response = await fetch(`http://localhost:3000/api/quests/read?username=${username}`);

        if (!response.ok) {
          throw new Error('Failed to fetch quests');
        }

        const data = await response.json();
        console.log(data);
        setQuests(data); // Update quests state with API data
      } catch (err) {
        console.error(err);
        setError(err.message); // Set error message if fetch fails
      } finally {
        setLoading(false); // Stop loading once fetch is done
      }
    };

    fetchQuests();
  }, []); // Empty array ensures the fetch runs only once on component mount

  const pieData = quests.map((quest, index) => ({
    name: quest.title,
    value: quest.progress,
    color: COLORS[index % COLORS.length],
  }));

  const barData = quests.map((quest) => ({
    name: quest.title,
    progress: quest.progress,
    timeSpent: quest.timeSpent,
  }));

  return (
    <div style={{ background: '#1c1c1c', color: '#f0f4fc', padding: '20px', minHeight: '100vh', position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>{username}'s Quests</h1>

        {/* Pie Chart for Quest Completion */}
        <div style={{ marginBottom: '2rem', borderRadius: '8px', padding: '20px', background: '#2c2c2c', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          <h2>{username}'s Quest Completion Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart for Quest Progress */}
        <div style={{ marginBottom: '2rem', borderRadius: '8px', padding: '20px', background: '#2c2c2c', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          <h2>{username}'s Quest Progress and Time Spent</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="progress" fill="#8884d8" name="Progress (%)" />
              <Bar dataKey="timeSpent" fill="#82ca9d" name="Time Spent (hrs)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table for Detailed Quest Information */}
        <div style={{ borderRadius: '8px', padding: '20px', background: '#2c2c2c', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
          <h2>{username}'s Quest Details</h2>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Progress (%)</th>
                <th>Reward Points</th>
                <th>Difficulty</th>
                <th>Time Spent (hrs)</th>
                <th>Expires At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {quests.map((quest) => (
                <tr key={quest.id}>
                  <td style={{ padding: '10px' }}>{quest.title}</td>
                  <td style={{ padding: '10px' }}>{quest.description}</td>
                  <td style={{ padding: '10px' }}>{quest.progress}%</td>
                  <td style={{ padding: '10px' }}>{quest.rewardPoints}</td>
                  <td style={{ padding: '10px' }}>{quest.difficulty}</td>
                  <td style={{ padding: '10px' }}>{quest.timeSpent}</td>
                  <td style={{ padding: '10px' }}>{new Date(quest.expiresAt).toLocaleDateString()}</td>
                  <td style={{ padding: '10px' }}>{quest.completed ? 'Completed' : 'In Progress'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </motion.div>

      {/* Optional: Adding a moving bubble background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'url("https://www.transparenttextures.com/patterns/black-paper.png")',
        opacity: 0.05,
        pointerEvents: 'none'
      }}></div>
    </div>
  );
};

export default QuestsPage;
