import React, { useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export const AudioPlayer: React.FC = () => {
  const { state, setCurrentBook, updateAudioPlayer, setCurrentView, setSelectedBookId } = useApp();
  const { t } = useLanguage();
  const { currentBook, audioPlayerState } = state;
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentBook) return;

    const handleLoadStart = () => {
      updateAudioPlayer({ isLoading: true });
    };

    const handleCanPlay = () => {
      // Use the real duration from the current chapter data
      const realDuration = audioPlayerState.currentChapter?.duration ? audioPlayerState.currentChapter.duration * 60 : audio.duration || 0;
      updateAudioPlayer({ 
        isLoading: false,
        duration: realDuration
      });
    };

    const handleTimeUpdate = () => {
      updateAudioPlayer({ 
        currentTime: audio.currentTime,
        buffered: audio.buffered.length > 0 ? audio.buffered.end(0) : 0
      });
    };

    const handleProgress = () => {
      if (audio.buffered.length > 0) {
        updateAudioPlayer({ 
          buffered: audio.buffered.end(audio.buffered.length - 1)
        });
      }
    };

    const handleEnded = () => {
      updateAudioPlayer({ 
        isPlaying: false,
        currentTime: 0
      });
    };

    const handleWaiting = () => {
      updateAudioPlayer({ isLoading: true });
    };

    const handleCanPlayThrough = () => {
      updateAudioPlayer({ isLoading: false });
    };

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('progress', handleProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('progress', handleProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [currentBook, updateAudioPlayer, audioPlayerState.currentChapter]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = audioPlayerState.volume;
  }, [audioPlayerState.volume]);

  // Effect to handle autoplay when isPlaying state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentBook) return;

    if (audioPlayerState.isPlaying && audio.paused) {
      // Ensure audio is not muted and volume is audible
      audio.muted = false;
      if (audio.volume === 0) {
        audio.volume = audioPlayerState.volume || 0.7;
      }
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio started playing successfully
            console.log('Audio started playing');
          })
          .catch((error) => {
            console.error('Error playing audio:', error);
            updateAudioPlayer({ isPlaying: false, isLoading: false });
          });
      }
    } else if (!audioPlayerState.isPlaying && !audio.paused) {
      audio.pause();
    }
  }, [audioPlayerState.isPlaying, currentBook, audioPlayerState.volume, updateAudioPlayer]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audioPlayerState.isPlaying) {
      audio.pause();
      updateAudioPlayer({ isPlaying: false });
    } else {
      // Ensure audio is not muted and volume is audible
      audio.muted = false;
      if (audio.volume === 0) {
        audio.volume = audioPlayerState.volume || 0.7;
      }
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            updateAudioPlayer({ isPlaying: true });
          })
          .catch((error) => {
            console.error('Error playing audio:', error);
            updateAudioPlayer({ isPlaying: false, isLoading: false });
          });
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    updateAudioPlayer({ currentTime: newTime });
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    updateAudioPlayer({ volume: newVolume });
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds));
    audio.currentTime = newTime;
    updateAudioPlayer({ currentTime: newTime });
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const closePlayer = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    setCurrentBook(null);
    updateAudioPlayer({
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      isLoading: false,
      buffered: 0,
      currentChapter: undefined
    });
  };

  const handleBookInfoClick = () => {
    if (currentBook) {
      setSelectedBookId(currentBook.id);
      setCurrentView('book-detail');
    }
  };

  if (!currentBook) return null;

  const progressPercentage = audioPlayerState.duration > 0 ? (audioPlayerState.currentTime / audioPlayerState.duration) * 100 : 0;
  const bufferedPercentage = audioPlayerState.duration > 0 ? (audioPlayerState.buffered / audioPlayerState.duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 shadow-2xl z-50">
      <audio
        ref={audioRef}
        src={audioPlayerState.currentChapter?.audioUrl || currentBook.audioUrl}
        preload="auto"
        muted={false}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-4">
          {/* Book Info - Clickable */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleBookInfoClick}
                className="flex items-center space-x-3 min-w-0 flex-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors group"
              >
                <img
                  src={currentBook.coverImage}
                  alt={currentBook.title}
                  className="w-12 h-12 rounded-lg object-cover shadow-md group-hover:scale-105 transition-transform duration-200"
                />
                <div className="min-w-0 flex-1 text-left">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {currentBook.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {audioPlayerState.currentChapter ? audioPlayerState.currentChapter.title : currentBook.author}
                  </p>
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t.viewBookDetails}</p>
            </TooltipContent>
          </Tooltip>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => skipTime(-10)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                  aria-label="Skip back 10 seconds"
                >
                  <SkipBack size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.skipBack10}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={togglePlayPause}
                  disabled={audioPlayerState.isLoading}
                  className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                  aria-label={audioPlayerState.isPlaying ? 'Pause' : 'Play'}
                >
                  {audioPlayerState.isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : audioPlayerState.isPlaying ? (
                    <Pause size={20} />
                  ) : (
                    <Play size={20} className="ml-0.5" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{audioPlayerState.isPlaying ? t.pause : t.play}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => skipTime(10)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                  aria-label="Skip forward 10 seconds"
                >
                  <SkipForward size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.skipForward10}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Progress Section */}
          <div className="flex-1 max-w-md mx-4">
            <div className="flex items-center space-x-3 text-xs text-gray-600 dark:text-gray-400">
              <span className="min-w-[35px] text-right font-mono">
                {formatTime(audioPlayerState.currentTime)}
              </span>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex-1 relative group h-4 flex items-center cursor-pointer">
                    {/* Background track */}
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full h-1 top-1/2 transform -translate-y-1/2"></div>
                    
                    {/* Buffer bar */}
                    <div 
                      className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-600 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(bufferedPercentage, 100)}%` }}
                    ></div>
                    
                    {/* Progress bar */}
                    <div 
                      className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-emerald-600 h-1 rounded-full transition-all duration-150"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                    
                    {/* Interactive range input - perfectly overlapped */}
                    <input
                      type="range"
                      min="0"
                      max={audioPlayerState.duration || 0}
                      value={audioPlayerState.currentTime}
                      onChange={handleSeek}
                      className="absolute inset-0 w-full h-4 bg-transparent appearance-none cursor-pointer opacity-0"
                    />
                    
                    {/* Single progress thumb - only visible on hover */}
                    <div 
                      className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-emerald-600 border border-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none"
                      style={{ 
                        left: `calc(${Math.min(progressPercentage, 100)}% - 6px)`,
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
                      }}
                    ></div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t.seekAudio}</p>
                </TooltipContent>
              </Tooltip>
              
              <span className="min-w-[35px] font-mono">
                {formatTime(audioPlayerState.duration)}
              </span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="hidden md:flex items-center space-x-3">
            <Volume2 size={20} className="text-gray-600 dark:text-gray-400" />
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative group w-20 h-4 flex items-center cursor-pointer">
                  {/* Volume track */}
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full h-1 top-1/2 transform -translate-y-1/2"></div>
                  
                  {/* Volume progress */}
                  <div 
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-emerald-600 h-1 rounded-full transition-all duration-150"
                    style={{ width: `${audioPlayerState.volume * 100}%` }}
                  ></div>
                  
                  {/* Volume input - perfectly overlapped */}
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={audioPlayerState.volume}
                    onChange={handleVolumeChange}
                    className="absolute inset-0 w-full h-4 bg-transparent appearance-none cursor-pointer opacity-0"
                  />
                  
                  {/* Single volume thumb - only visible on hover */}
                  <div 
                    className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-emerald-600 border border-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none"
                    style={{ left: `calc(${audioPlayerState.volume * 100}% - 6px)` }}
                  ></div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.adjustVolume}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Close Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={closePlayer}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                aria-label="Close player"
              >
                <X size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t.closePlayer}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};