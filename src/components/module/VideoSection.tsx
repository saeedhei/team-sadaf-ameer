import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Sparkles, AlertCircle, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { moduleContents } from '../../moduleContentData';

interface VideoSectionProps {
  moduleId: number;
  onCompleted: (isDone: boolean) => void;
  isCompleted: boolean;
}

export default function VideoSection({ moduleId, onCompleted, isCompleted }: VideoSectionProps) {
  const currentContent = moduleContents[moduleId] || moduleContents[1];
  const videoTitle = currentContent.videoTitle;
  const totalDuration = currentContent.videoDuration;
  const videoSubtitles = currentContent.videoSubtitles;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset video state when the module changes
  useEffect(() => {
    setCurrentTime(0);
    setIsPlaying(false);
  }, [moduleId]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);

      // Mark as completed once played for a bit
      if (!isCompleted) {
        onCompleted(true);
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, playbackSpeed, isCompleted, onCompleted, totalDuration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const getSubtitles = (seconds: number) => {
    const matching = [...videoSubtitles]
      .sort((a, b) => b.time - a.time)
      .find((s) => seconds >= s.time);
    return matching ? matching.text : "Video started...";
  };

  return (
    <div className="bg-white rounded-2xl border border-blue-100/80 shadow-sm p-4 sm:p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Chapter 3</span>
          <h3 className="text-sm sm:text-base font-bold text-slate-900">🎬 Video Seminar: {videoTitle}</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100/60">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Interactive Player
        </span>
      </div>

      {/* Styled Simulated Video Player Screen */}
      <div className="relative aspect-[4/3] sm:aspect-video w-full max-h-[60vh] sm:max-h-none rounded-xl bg-slate-950 overflow-hidden group shadow-md border border-slate-900">
        
        {/* Absolute Video Screen Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4 z-10 select-none">
          {/* Top Info Banner */}
          <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[10px] sm:text-[11px] text-white font-bold">Acuity Learn</span>
            </div>
            <div className="bg-black/60 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-mono text-slate-300 border border-white/5">
              HD 1080p
            </div>
          </div>

          {/* Center Play Overlay / Animated Graphic */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence>
              {!isPlaying && (
                <motion.button
                  onClick={handlePlayPause}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl border border-white/20 cursor-pointer pointer-events-auto"
                >
                  <Play className="w-5 h-5 sm:w-7 sm:h-7 text-white fill-white ml-0.5 sm:ml-1" />
                </motion.button>
              )}
            </AnimatePresence>
            
            {/* Pulsing graphic when playing */}
            {isPlaying && (
              <div className="flex items-center gap-0.5 sm:gap-1 opacity-20">
                <span className="w-0.5 sm:w-1 h-6 sm:h-8 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <span className="w-0.5 sm:w-1 h-10 sm:h-12 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-0.5 sm:w-1 h-12 sm:h-16 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                <span className="w-0.5 sm:w-1 h-8 sm:h-10 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            )}
          </div>

          {/* Dynamic Captions overlay */}
          <div className="mt-auto mb-1 flex justify-center w-full px-2">
            <div className="bg-black/85 backdrop-blur-sm border border-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl max-w-[90%] sm:max-w-md text-center text-[10px] sm:text-xs md:text-sm text-amber-200 shadow-md">
              {getSubtitles(currentTime)}
            </div>
          </div>

          {/* Bottom control bar */}
          <div className="bg-gradient-to-t from-black/95 via-black/60 to-transparent absolute bottom-0 inset-x-0 p-2 sm:p-3 pt-6 sm:pt-8 flex flex-col gap-1.5 sm:gap-2 z-20">
            {/* Time progress bar */}
            <div className="relative w-full h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              />
            </div>

            {/* Playback Controls Row */}
            <div className="flex items-center justify-between text-white gap-1.5 text-[10px] sm:text-xs">
              <div className="flex items-center gap-1.5 sm:gap-3">
                <button 
                  onClick={handlePlayPause}
                  className="p-1 sm:p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" />
                  ) : (
                    <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" />
                  )}
                </button>

                <button 
                  onClick={handleReset}
                  className="p-1 sm:p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title="Reset Video"
                >
                  <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>

                <span className="text-[9px] sm:text-xs font-mono text-slate-300">
                  {formatTime(currentTime)} / {formatTime(totalDuration)}
                </span>
              </div>

              {/* Right side controls */}
              <div className="flex items-center gap-1.5 sm:gap-3">
                {/* Playback speeds */}
                <div className="flex gap-0.5 bg-white/10 p-0.5 rounded-md border border-white/5">
                  {[1, 1.5, 2].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      className={`text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0.5 rounded font-mono cursor-pointer ${
                        playbackSpeed === speed ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>

                {/* Mute/Volume button */}
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1 sm:p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </button>

                <button className="p-1 sm:p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Video Thumbnail Background Frame */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex flex-col items-center justify-center p-3 sm:p-6 text-center select-none">
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-red-600 text-white text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest flex items-center gap-1">
            <Radio className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-ping" />
            <span>Digital Citizen Seminar</span>
          </div>
          <p className="text-slate-400 text-[9px] sm:text-xs uppercase tracking-widest font-semibold mb-1">Interactive Video Lesson</p>
          <h4 className="text-white text-xs xs:text-sm sm:text-lg md:text-2xl font-black max-w-[85%] sm:max-w-md leading-snug drop-shadow">
            "{videoTitle}"
          </h4>
          <p className="text-slate-500 text-[9px] sm:text-xs mt-1.5 sm:mt-2 font-mono">
            Duration: {formatTime(totalDuration)} • Subtitles Active • HD Quality
          </p>
        </div>

      </div>

      {/* Video Description Cards / Help Details */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-500 border-t border-slate-100 pt-4">
        <div className="flex gap-2.5 items-start">
          <div className="p-1.5 bg-blue-50 text-blue-600 border border-blue-100/60 rounded-lg shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-slate-800 block">Interactive Subtitles</span>
            <p>Subtitles update in real-time. Speed up playback if needed (1.5x / 2x).</p>
          </div>
        </div>
        <div className="flex gap-2.5 items-start">
          <div className="p-1.5 bg-amber-50 text-amber-600 border border-amber-100/60 rounded-lg shrink-0 mt-0.5">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-slate-800 block">Practical Verification Tip</span>
            <p>Use "reverse video search" on keyframes to locate the original, unedited video footage.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
