"use client";

import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const chartVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.5, duration: 0.8, ease: "easeOut" } }
};

const darkThemeColors = {
  background: '#1f2937', // Dark gray for the background
  cardBackground: '#374151', // Slightly lighter dark gray for cards
  text: '#e5e7eb', // Light gray for text
  highlightText: '#d1d5db', // Slightly darker gray for smaller text
  axisLine: '#9ca3af', // Color for X and Y axis lines
  tooltipBackground: '#333333', // Tooltip background color
};

const CourseManagement = () => {
  const courses = [
    { id: 1, title: "Introduction to React", visits: 1200, price: 4999 },
    { id: 2, title: "Advanced JavaScript", visits: 800, price: 5999 },
    { id: 3, title: "Python for Beginners", visits: 1500, price: 3999 },
    { id: 4, title: "Data Science Fundamentals", visits: 1000, price: 6999 },
  ];

  const totalVisits = courses.reduce((sum, course) => sum + course.visits, 0);
  const avgPrice = (courses.reduce((sum, course) => sum + course.price, 0) / courses.length / 100).toFixed(2);

  return (
    <div className="space-y-4" style={{ backgroundColor: darkThemeColors.background, minHeight: '100vh', padding: '20px' }}>
      <MotionCard className="w-full" variants={cardVariants} initial="hidden" animate="visible" style={{ backgroundColor: darkThemeColors.cardBackground }}>
        <CardHeader>
          <h2 className="text-2xl font-bold" style={{ color: darkThemeColors.text }}>Course Management</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MotionCard variants={cardVariants} initial="hidden" animate="visible" style={{ backgroundColor: darkThemeColors.cardBackground }}>
              <CardContent>
                <p className="text-lg font-semibold" style={{ color: darkThemeColors.highlightText }}>Total Courses</p>
                <p className="text-3xl font-bold" style={{ color: darkThemeColors.text }}>{courses.length}</p>
              </CardContent>
            </MotionCard>
            <MotionCard variants={cardVariants} initial="hidden" animate="visible" style={{ backgroundColor: darkThemeColors.cardBackground }}>
              <CardContent>
                <p className="text-lg font-semibold" style={{ color: darkThemeColors.highlightText }}>Total Visits</p>
                <p className="text-3xl font-bold" style={{ color: darkThemeColors.text }}>{totalVisits}</p>
              </CardContent>
            </MotionCard>
            <MotionCard variants={cardVariants} initial="hidden" animate="visible" style={{ backgroundColor: darkThemeColors.cardBackground }}>
              <CardContent>
                <p className="text-lg font-semibold" style={{ color: darkThemeColors.highlightText }}>Avg. Price</p>
                <p className="text-3xl font-bold" style={{ color: darkThemeColors.text }}>${avgPrice}</p>
              </CardContent>
            </MotionCard>
          </div>
        </CardContent>
      </MotionCard>

      <MotionCard variants={chartVariants} initial="hidden" animate="visible" style={{ backgroundColor: darkThemeColors.cardBackground }}>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courses}>
              <XAxis dataKey="title" stroke={darkThemeColors.axisLine} />
              <YAxis stroke={darkThemeColors.axisLine} />
              <Tooltip
                contentStyle={{ backgroundColor: darkThemeColors.tooltipBackground, color: darkThemeColors.text }}
                itemStyle={{ color: darkThemeColors.text }}
              />
              <Legend />
              <Bar dataKey="visits" fill="#82ca9d" name="Visits" />
              <Bar dataKey="price" fill="#8884d8" name="Price" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </MotionCard>
    </div>
  );
};

export default CourseManagement;