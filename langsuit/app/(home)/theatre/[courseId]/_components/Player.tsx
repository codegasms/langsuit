import React, { useRef, useState } from 'react';

const Player = ({ 
  playlist = [], 
  isAuthenticated, 
  hasAccess, 
  onProgressUpdate 
}) => {
  const videoRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnd = () => {
    if (currentVideoIndex < playlist.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleProgressUpdate = () => {
    const video = videoRef.current;
    if (video && onProgressUpdate) {
      const progress = {
        currentTime: video.currentTime,
        duration: video.duration,
        percentage: (video.currentTime / video.duration) * 100,
      };
      onProgressUpdate(progress);
    }
  };

  if (!isAuthenticated) {
    return <div>Please login to access the video.</div>;
  }

  if (!hasAccess) {
    return <div>Access is restricted. Please purchase the course.</div>;
  }

  return (
    <div className="flex h-screen bg-black">
      {/* Video Player Section */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-white text-xl mb-4">
          {playlist[currentVideoIndex]?.title || 'Course Video'}
        </h1>
        <div className="relative w-full max-w-4xl aspect-video">
          <video
            ref={videoRef}
            className="w-full h-full"
            controls
            onEnded={handleVideoEnd}
            onTimeUpdate={handleProgressUpdate}
            src={playlist[currentVideoIndex]?.videoUrl}
          />
        </div>
      </div>

      {/* Playlist Section */}
      <div className="w-80 bg-gray-900 border-l border-gray-800 overflow-y-auto">
        <h2 className="text-lg font-semibold text-white p-4">Playlist</h2>
        <ul>
          {playlist.map((video, index) => (
            <li key={video.id}>
              <button
                onClick={() => setCurrentVideoIndex(index)}
                className={`block w-full text-left p-3 hover:bg-gray-800 ${
                  currentVideoIndex === index ? 'bg-gray-800 text-white' : 'text-gray-300'
                }`}
              >
                {video.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Player;
