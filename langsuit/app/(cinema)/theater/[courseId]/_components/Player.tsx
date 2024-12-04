import React, { useEffect, useRef, useState } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { X, Play, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_PLAYLIST = [
  {
    id: '1',
    title: 'Introduction to React Fundamentals',
    duration: '15:30',
    videoUrl: '/videos/react-fundamentals.mp4',
    thumbnail: '/thumbnails/react-basics.jpg',
  }
];

const Player = ({ 
  videoUrl, 
  title = 'React Development Course',
  isAuthenticated, 
  hasAccess, 
  onProgressUpdate,
  playlist = DEFAULT_PLAYLIST
}) => {
  console.log(playlist);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [completedVideos, setCompletedVideos] = useState(new Set());
  const [progress, setProgress] = useState({});

  useEffect(() => {
    if (typeof window !== 'undefined' && videoRef.current && !playerRef.current) {
      try {
        playerRef.current = new Plyr(videoRef.current, {
          controls: [
            'play-large',
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'settings',
            'fullscreen',
          ],
          settings: ['quality', 'speed'],
          autoplay: false,
        });

        playerRef.current.on('ended', handleVideoComplete);

        playerRef.current.on('timeupdate', () => {
          const currentProgress = {
            currentTime: playerRef.current.currentTime,
            duration: playerRef.current.duration,
            percentage: (playerRef.current.currentTime / playerRef.current.duration) * 100,
          };
          
          setProgress(prev => ({
            ...prev,
            [currentVideoIndex]: currentProgress.percentage
          }));
          
          onProgressUpdate?.(currentProgress);
        });

        setLoading(false);
      } catch (err) {
        console.error('Error initializing Plyr:', err);
        setError('Failed to load video player');
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  const handleVideoComplete = () => {
    setCompletedVideos(prev => new Set([...prev, currentVideoIndex]));
    
    // Auto advance to next video if available
    if (currentVideoIndex < playlist.length - 1) {
      handleVideoSelect(currentVideoIndex + 1);
    }
  };

  useEffect(() => {
    if (playerRef.current && videoUrl) {
      try {
        playerRef.current.source = {
          type: 'video',
          sources: [{ src: videoUrl, type: 'video/mp4' }],
        };
      } catch (err) {
        console.error('Error updating video source:', err);
        setError('Failed to load video');
      }
    }
  }, [videoUrl]);

  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index);
    if (playlist[index]?.videoUrl) {
      try {
        playerRef.current.source = {
          type: 'video',
          sources: [{ src: playlist[index].videoUrl, type: 'video/mp4' }],
        };
      } catch (err) {
        console.error('Error updating video source:', err);
        setError('Failed to load video');
      }
    }
  };

  const handleDismissError = () => setError(null);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <h2 className="text-xl text-white mb-4">Please login to watch this content</h2>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center">
          <h2 className="text-xl text-white mb-4">Purchase access to watch this content</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen bg-black">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="relative flex items-center justify-center flex-1 bg-gradient-to-b from-black via-gray-900 to-black">
          <div className="relative z-10 w-full max-w-4xl p-6">
            <div className="mb-4 text-center">
              <h1 className="text-2xl font-bold text-white">{playlist[currentVideoIndex]?.title || title}</h1>
            </div>

            <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-inner ring-4 ring-gray-700">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              )}

              {error && (
                <div className="absolute top-4 left-4 right-4 z-50">
                  <Alert variant="destructive" className="bg-red-950 border-red-900">
                    <div className="flex items-center justify-between">
                      <AlertTitle className="text-red-400">Error</AlertTitle>
                      <button onClick={handleDismissError} className="p-1 hover:bg-red-800 rounded-full transition-colors">
                        <X className="h-4 w-4 text-red-400 hover:text-red-300" />
                      </button>
                    </div>
                    <AlertDescription className="text-red-300">{error}</AlertDescription>
                  </Alert>
                </div>
              )}

              <video
                ref={videoRef}
                className="plyr-react plyr w-full h-full"
                playsInline
                controls
                crossOrigin="anonymous"
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                Video {currentVideoIndex + 1} of {playlist.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist Sidebar */}
      <div className="w-80 bg-gray-900 border-l border-gray-800 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-white mb-4">Course Videos</h2>
          <div className="space-y-2">
            {playlist.map((video, index) => {
              const isCompleted = completedVideos.has(index);
              const isCurrentVideo = currentVideoIndex === index;
              const currentProgress = progress[index] || 0;

              return (
                <button
                  key={video.id}
                  onClick={() => handleVideoSelect(index)}
                  className={cn(
                    "w-full p-3 rounded-lg text-left transition-colors relative",
                    "hover:bg-gray-800",
                    isCurrentVideo ? "bg-gray-800" : "bg-gray-900"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : isCurrentVideo ? (
                      <Play className="w-4 h-4 text-blue-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-600" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium truncate">
                        {video.title}
                      </p>
                      <p className="text-xs text-gray-400">{video.duration}</p>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  {currentProgress > 0 && !isCompleted && (
                    <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${currentProgress}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;