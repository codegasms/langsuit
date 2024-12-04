"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/nextjs";

const LanguagesPage = () => {
    const { userId } = useAuth();
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchLanguages = async () => {
        if (!userId) {
          console.error("User not authenticated");
          return;
        }
  
        try {
          const response = await axios.get(`/api/user/${userId}/languages`);
          setLanguages(response.data);
        } catch (error) {
          console.error("Error fetching languages:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchLanguages();
    }, [userId]);
  
    // Dummy data for demonstration purposes
    const dummyData = [
      { languageId: 1, languageName: "English", progress: 100 },
      { languageId: 2, languageName: "Spanish", progress: 75 },
      { languageId: 3, languageName: "French", progress: 50 },
      { languageId: 4, languageName: "German", progress: 25 },
      { languageId: 5, languageName: "Italian", progress: 0 },
    ];
  
    // If no data is available, use dummy data
    const dataToDisplay = languages.length > 0 ? languages : dummyData;
  
    const completedLanguages = dataToDisplay.filter(
      (lang) => lang.progress === 100
    ).length;
    const remainingLanguages = dataToDisplay.length - completedLanguages;
  
    const pieData = [
      { name: "Completed Languages", value: completedLanguages },
      { name: "Remaining Languages", value: remainingLanguages },
    ];
  
    return (
      <div
        style={{
          color: "#f0f4fc",
          padding: "20px",
          position: "relative",
          overflow: "hidden",
          background: "#1c1c1c",
        }}
      >
        {/* Background Animation with Moving Bubbles */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden" }}>
          {Array.from({ length: 30 }).map((_, index) => (
            <motion.div
              key={index}
              style={{
                position: "absolute",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.2)",
                width: `${Math.random() * 50 + 20}px`,
                height: `${Math.random() * 50 + 20}px`,
                bottom: "-50px",
                left: `${Math.random() * 100}vw`,
              }}
              animate={{
                y: ["-100px", "100vh"],
                x: [0, `${Math.random() * 50 - 25}px`],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
  
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", fontSize: "2.5rem" }}
        >
          Your Languages
        </motion.h1>
  
        {/* Pie Chart for language completion */}
        <div style={{ marginTop: "20px", width: "100%", height: "300px" }}>
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ textAlign: "center", fontSize: "2rem" }}
          >
            Language Completion Overview
          </motion.h2>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? "#82ca9d" : "#d0ed57"}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          {dataToDisplay.length === 0 && (
            <div>No language data available.</div>
          )}
        </div>
  
        {/* Bar Chart for language progress distribution */}
        <div style={{ marginTop: "40px" }}>
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ textAlign: "center", fontSize: "2rem" }}
          >
            Language Progress Distribution
          </motion.h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dataToDisplay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="languageName" stroke="#f0f4fc" />
              <YAxis stroke="#f0f4fc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="progress" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          {dataToDisplay.length === 0 && (
            <div>No language data available.</div>
          )}
        </div>
  
        {/* Language list in a card */}
        <motion.div
          style={{
            marginTop: "40px",
            padding: "20px",
            borderRadius: "10px",
            background: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ textAlign: "center", fontSize: "2rem" }}
          >
            Languages List
          </motion.h2>
          <ul style={{ marginTop: "20px", listStyleType: "none", padding: 0 }}>
            {dataToDisplay.length > 0 ? (
              dataToDisplay.map((language) => (
                <li
                  key={language.languageId}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #444",
                    textAlign: "center",
                    fontSize: "1.2rem",
                    transition: "background 0.3s, transform 0.3s",
                    borderRadius: "5px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#2c2c2c";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {language.languageName} - {language.progress}%
                </li>
              ))
            ) : (
              <li style={{ textAlign: "center", fontSize: "1.2rem" }}>
                No languages available.
              </li>
            )}
          </ul>
        </motion.div>
      </div>
    );
  };
  

export default LanguagesPage;
