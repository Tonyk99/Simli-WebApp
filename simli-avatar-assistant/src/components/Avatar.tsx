import React, { useRef, useEffect, useState } from 'react';
import { EmotionState } from '../types';

interface AvatarProps {
  isConnected: boolean;
  isLoading: boolean;
  emotion: EmotionState;
  onVideoRef: (ref: React.RefObject<HTMLVideoElement | null>) => void;
  onAudioRef: (ref: React.RefObject<HTMLAudioElement | null>) => void;
}

const Avatar: React.FC<AvatarProps> = ({
  isConnected,
  isLoading,
  emotion,
  onVideoRef,
  onAudioRef,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    onVideoRef(videoRef);
    onAudioRef(audioRef);
  }, [onVideoRef, onAudioRef]);

  const getEmotionColor = (emotion: EmotionState): string => {
    switch (emotion.emotion) {
      case 'happy':
        return '#10B981'; // green
      case 'excited':
        return '#F59E0B'; // yellow
      case 'sad':
        return '#6B7280'; // gray
      case 'confused':
        return '#8B5CF6'; // purple
      case 'thinking':
        return '#3B82F6'; // blue
      default:
        return '#6B7280'; // neutral gray
    }
  };

  const getEmotionIntensity = (emotion: EmotionState): number => {
    return Math.max(0.3, emotion.intensity);
  };

  return (
    <div className="avatar-container w-full max-w-md mx-auto">
      <div className="relative">
        {/* Video Element */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={false}
          className={`w-full h-auto rounded-lg shadow-2xl transition-all duration-300 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoadedData={() => setIsVideoLoaded(true)}
          onError={(e) => console.error('Video error:', e)}
        />
        
        {/* Audio Element */}
        <audio
          ref={audioRef}
          autoPlay
          className="hidden"
        />
        
        {/* Loading Overlay */}
        {(isLoading || !isVideoLoaded) && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-text/70">
                {isLoading ? 'Connecting to avatar...' : 'Loading video...'}
              </p>
            </div>
          </div>
        )}
        
        {/* Connection Status Indicator */}
        <div className="absolute top-4 right-4">
          <div
            className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-secondary' : 'bg-red-500'
            } ${isConnected ? 'animate-pulse-slow' : ''}`}
            title={isConnected ? 'Connected' : 'Disconnected'}
          />
        </div>
        
        {/* Emotion Ring */}
        {isConnected && (
          <div
            className="absolute inset-0 rounded-lg border-2 pointer-events-none transition-all duration-500"
            style={{
              borderColor: getEmotionColor(emotion),
              opacity: getEmotionIntensity(emotion),
              boxShadow: `0 0 20px ${getEmotionColor(emotion)}${Math.floor(getEmotionIntensity(emotion) * 255).toString(16).padStart(2, '0')}`,
            }}
          />
        )}
        
        {/* Emotion Label */}
        {isConnected && emotion.emotion !== 'neutral' && (
          <div className="absolute bottom-4 left-4">
            <div
              className="px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm"
              style={{
                backgroundColor: getEmotionColor(emotion),
                opacity: getEmotionIntensity(emotion),
              }}
            >
              {emotion.emotion.charAt(0).toUpperCase() + emotion.emotion.slice(1)}
            </div>
          </div>
        )}
        
        {/* Placeholder when not connected */}
        {!isConnected && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface rounded-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <p className="text-text/70">Avatar not connected</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Avatar;