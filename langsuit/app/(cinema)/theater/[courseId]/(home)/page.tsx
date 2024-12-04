'use client'
import { useState, useEffect } from 'react';
import Player from "../_components/Player";
import { useParams } from 'next/navigation';

const DEFAULT_PLAYLIST = [
//   {
//     id: '1',
//     title: 'Introduction to React Fundamentals',
//     duration: '15:30',
//     videoUrl: '/BehindTheScenes1.mp4',
//     // thumbnail: '/thumbnails/react-basics.jpg',
//   },
];

const Page = () => {
    // const [courseId,setCourseId] = useState();
    const [playlist, setPlaylist] = useState(DEFAULT_PLAYLIST);
    const [videoData, setVideoData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { courseId } = useParams();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                const playlistResponse = await fetch('/api/courses/playlist', {
                    method: "POST",
                    body: JSON.stringify({courseId})
                });
                
                if (!playlistResponse.ok) {
                    throw new Error('Failed to fetch videos');
                }
                
                const playlistData = await playlistResponse.json();
                
                // Directly use the first video for initial state
                const firstVideo = playlistData[0];
                const initialVideoData = {
                    id: firstVideo.id,
                    videoUrl: firstVideo.videoUrl,
                    title: firstVideo.title
                };
                
                // Update both states in one go
                setVideoData(initialVideoData);
                setPlaylist(playlistData);
                console.log(videoData);
                console.log(playlist);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching videos:', err);
            } finally {
                setLoading(false);
            }
        };
    
        if(courseId)
            fetchVideos();
    }, [courseId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-white">Loading video...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900">
            {error && (
                <div className="p-4 mb-4 text-red-500 bg-red-100 rounded">
                    Error loading video: {error}
                </div>
            )}
            <Player 
                videoUrl={videoData?.videoUrl}
                title={videoData?.title || "Course Video"}
                isAuthenticated={true}
                hasAccess={true}
                playlist={playlist}
                onProgressUpdate={(progress) => {
                    console.log('Progress:', progress);
                    fetch('/api/progress/update', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            videoId: videoData?.id,
                            progress: progress.percentage,
                            currentTime: progress.currentTime
                        })
                    });
                }}
            />
        </div>
    );
};

export default Page;