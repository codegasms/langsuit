'use client'

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/redux/searchSlice';

// Course interface for type safety
interface Course {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  price: number;
}

const CourseSelectionPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchQuery = useSelector((state: { search: { query: string } }) => state.search.query); // Accessing search query from Redux store
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchAvailableCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/courses/available', {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        setCourses(data.courses);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Unable to load courses. Please try again later.');
        setLoading(false);
      }
    };

    fetchAvailableCourses();
  }, []);

  const handleCourseSelect = (courseId: string) => {
    // Navigate to seat selection for the chosen course
    router.push(`/tickets/${courseId}`);
  };

  // Filter courses based on the search query
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-amber-500">Loading available courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-amber-500">
        Available Courses
      </h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 rounded-lg border border-gray-300"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card 
            key={course.id} 
            className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white mb-2">{course.title}</h2>
              <p className="text-gray-400 mb-4">{course.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="text-white">{course.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="text-white">{course.time}</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-amber-500 font-bold text-lg">${course.price}</div>
              <Button 
                onClick={() => handleCourseSelect(course.id)}
                className="bg-amber-500 text-black hover:bg-amber-600"
              >
                Select Course
              </Button>
            </div>
          </Card>
        ))}
      </div>


      {filteredCourses.length === 0 && (
        <div className="text-center text-gray-500">
          No courses are currently available.
        </div>
      )}
    </div>
  );
};

export default CourseSelectionPage;
