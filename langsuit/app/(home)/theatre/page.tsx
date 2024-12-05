'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Play, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";

// Type definition for a Course
interface Course {
  id: string;
  title: string;
  description: string | null;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | null;
  price: number | null;
  visits: number | null;
  instructorId: number;
  category: string;
}

export default function TheaterPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses/available');

        // Log the raw response for debugging
        const rawData = await response.json();
        console.log('Raw response:', rawData);

        // Ensure data is an array
        const coursesData = Array.isArray(rawData) 
          ? rawData 
          : rawData.courses 
            ? rawData.courses 
            : [];

        // Validate course data structure
        const validCourses = coursesData.filter(course => 
          course && 
          typeof course.id === 'string' && 
          typeof course.title === 'string'
        );

        if (validCourses.length === 0) {
          throw new Error('No valid courses found');
        }

        setCourses(validCourses);
        setLoading(false);
      } catch (err) {
        console.error('Courses fetch error:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseSelect = (course: Course) => {
    router.push(`/theatre/${course.id}`);
  };

  const handlePreviewClose = () => {
    setSelectedCourse(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-red-500">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Error Loading Courses</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl mb-4">No Courses Available</h2>
          <p>Please check back later or contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-300 text-yellow">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Available Courses
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card 
              key={course.id} 
              className="bg-gray-900 border-gray-800 hover:border-blue-600 transition-all duration-300"
            >
              <CardHeader className="p-4">
                <CardTitle className="text-xl text-white">
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-400 space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>{course.category}</span>
                    <Clock className="w-5 h-5 ml-4" />
                    <span>${course.price || 0}</span>
                  </div>
                  <p className="text-gray-300 line-clamp-3">
                    {course.description || 'No description available'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span 
                      className={cn(
                        "px-3 py-1 rounded-full text-sm",
                        course.level === 'Beginner' && "bg-green-900 text-green-300",
                        course.level === 'Intermediate' && "bg-yellow-900 text-yellow-300",
                        course.level === 'Advanced' && "bg-red-900 text-red-300"
                      )}
                    >
                      {course.level || 'Unknown'}
                    </span>
                    <Button 
                      onClick={() => handleCourseSelect(course)}
                      className="group"
                    >
                      Start Course
                      <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}