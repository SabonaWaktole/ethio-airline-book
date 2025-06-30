import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, FileText, Download, Clock, Star, User, Calendar, CheckCircle, SkipForward, SkipBack, X, ChevronUp, ChevronDown, BookOpen, RotateCcw } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { books } from '../data/books';
import { Chapter } from '../types';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { PdfViewer } from './PdfViewer';

export const BookDetail: React.FC = () => {
  const { state, setCurrentView, setCurrentBook, updateAudioPlayer, updateReadingProgress, getReadingProgress, markChapterCompleted, setCurrentChapter } = useApp();
  const { t } = useLanguage();
  const [showPdf, setShowPdf] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isPlaylistCollapsed, setIsPlaylistCollapsed] = useState(false);
  const [pdfViewMode, setPdfViewMode] = useState<'continuous' | 'pagination'>('continuous');

  const book = books.find(b => b.id === state.selectedBookId);
  const readingProgress = book ? getReadingProgress(book.id) : null;

  useEffect(() => {
    if (book && readingProgress) {
      const chapterIndex = book.chapters.findIndex(ch => ch.id === readingProgress.currentChapter);
      if (chapterIndex !== -1) {
        setCurrentChapterIndex(chapterIndex);
      }
    }
  }, [book, readingProgress]);

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t.bookNotFound}</h2>
          <button
            onClick={() => setCurrentView('library')}
            className="text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            {t.returnToLibrary}
          </button>
        </div>
      </div>
    );
  }

  const currentChapter = book.chapters[currentChapterIndex];
  const completedChapters = readingProgress?.completedChapters || [];
  const totalProgress = completedChapters.length / book.chapters.length * 100;

  // Check if this book is currently being played
  const isCurrentlyPlaying = state.currentBook?.id === book.id;
  
  // Get the actual playing chapter index if this book is currently playing
  const getPlayingChapterIndex = () => {
    if (!isCurrentlyPlaying || !state.audioPlayerState.currentChapter) {
      return -1;
    }
    return book.chapters.findIndex(ch => ch.id === state.audioPlayerState.currentChapter?.id);
  };

  const playingChapterIndex = getPlayingChapterIndex();

  const handlePlayChapter = (chapter: Chapter, index: number) => {
    setCurrentChapter(chapter);
    setCurrentBook(book);
    setCurrentChapterIndex(index);
    updateAudioPlayer({
      currentChapter: chapter,
      isPlaying: true,
      currentTime: 0
    });
    
    // Update reading progress
    updateReadingProgress(book.id, {
      bookId: book.id,
      currentChapter: chapter.id,
      currentTime: 0,
      completedChapters,
      totalProgress: completedChapters.length / book.chapters.length * 100
    });
  };

  const handleToggleChapterCompleted = (chapterId: string) => {
    const isCompleted = completedChapters.includes(chapterId);
    if (isCompleted) {
      // Remove from completed chapters
      const updatedCompleted = completedChapters.filter(id => id !== chapterId);
      updateReadingProgress(book.id, {
        bookId: book.id,
        currentChapter: readingProgress?.currentChapter || '',
        currentTime: readingProgress?.currentTime || 0,
        completedChapters: updatedCompleted,
        totalProgress: updatedCompleted.length / book.chapters.length * 100,
        lastReadAt: new Date().toISOString()
      });
    } else {
      // Add to completed chapters
      markChapterCompleted(book.id, chapterId);
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < book.chapters.length - 1) {
      const nextIndex = currentChapterIndex + 1;
      handlePlayChapter(book.chapters[nextIndex], nextIndex);
    }
  };

  const handlePreviousChapter = () => {
    if (currentChapterIndex > 0) {
      const prevIndex = currentChapterIndex - 1;
      handlePlayChapter(book.chapters[prevIndex], prevIndex);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Check if PDF is available for this book
  const hasPdf = book.pdfUrl && book.pdfUrl.trim() !== '';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header - Always visible with book info when PDF is open */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setCurrentView('library')}
                    className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <ArrowLeft size={20} />
                    <span>{t.library}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t.returnToLibrary}</p>
                </TooltipContent>
              </Tooltip>
              
              {/* Book info in header when PDF is open - centered */}
              {showPdf && book && (
                <div className="flex-1 flex items-center justify-center space-x-4">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate max-w-64">
                      {book.title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t.by} {book.author}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {showPdf && book && (
              <div className="flex items-center space-x-2">
                {/* PDF View Mode Toggle */}
                <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setPdfViewMode('continuous')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          pdfViewMode === 'continuous'
                            ? 'bg-emerald-600 text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <BookOpen size={16} className="inline mr-1" />
                        {t.continuousReading}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t.continuousReading}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setPdfViewMode('pagination')}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          pdfViewMode === 'pagination'
                            ? 'bg-emerald-600 text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        <RotateCcw size={16} className="inline mr-1" />
                        {t.pagination}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t.pagination}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handlePlayChapter(currentChapter, currentChapterIndex)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <Play size={16} />
                      <span className="hidden sm:inline">{t.play}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t.play} {currentChapter.title}</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setShowPdf(false)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <X size={16} />
                      <span className="hidden sm:inline">{t.closePdf}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t.closePdf}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showPdf && hasPdf && book ? (
          /* PDF View Layout */
          <div className="grid lg:grid-cols-4 gap-6">
            {/* PDF Viewer - Takes most space */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden h-[calc(100vh-200px)]">
                <PdfViewer
                  pdfUrl={book.pdfUrl!}
                  mode={pdfViewMode}
                  bookTitle={book.title}
                />
              </div>
            </div>

            {/* Collapsible Playlist */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.chapters}</h3>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setIsPlaylistCollapsed(!isPlaylistCollapsed)}
                          className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          {isPlaylistCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isPlaylistCollapsed ? t.expandChapters : t.collapseChapters}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {!isPlaylistCollapsed && (
                  <div className="max-h-96 overflow-y-auto">
                    {book.chapters.map((chapter, index) => {
                      const isCompleted = completedChapters.includes(chapter.id);
                      const isCurrentlyPlayingChapter = isCurrentlyPlaying && playingChapterIndex === index;
                      
                      return (
                        <div
                          key={chapter.id}
                          className={`p-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                            isCurrentlyPlayingChapter ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700' : ''
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => handlePlayChapter(chapter, index)}
                                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                    isCurrentlyPlayingChapter 
                                      ? 'bg-emerald-600 text-white' 
                                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 hover:bg-emerald-600 hover:text-white'
                                  }`}
                                >
                                  {state.audioPlayerState.isPlaying && isCurrentlyPlayingChapter ? (
                                    <Pause size={12} />
                                  ) : (
                                    <Play size={12} className="ml-0.5" />
                                  )}
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{state.audioPlayerState.isPlaying && isCurrentlyPlayingChapter ? t.pause : t.play} {chapter.title}</p>
                              </TooltipContent>
                            </Tooltip>

                            <div className="flex-1 min-w-0">
                              <h4 className={`text-sm font-medium truncate ${
                                isCurrentlyPlayingChapter ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-900 dark:text-white'
                              }`}>
                                {chapter.title}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDuration(chapter.duration)}
                              </p>
                            </div>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => handleToggleChapterCompleted(chapter.id)}
                                  className={`transition-colors ${
                                    isCompleted 
                                      ? 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300' 
                                      : 'text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                                  }`}
                                >
                                  <CheckCircle size={16} />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{isCompleted ? t.markAsUnread : t.markAsRead}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Regular Layout */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Book Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Book Cover & Details */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="aspect-[3/4] relative">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Play Button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handlePlayChapter(currentChapter, currentChapterIndex)}
                        className="absolute inset-0 flex items-center justify-center group"
                      >
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                          <Play size={24} className="text-emerald-600 ml-1" />
                        </div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{readingProgress ? t.continueReading : t.startReading}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(book.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {book.rating} ({book.totalRatings})
                    </span>
                  </div>

                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {book.title}
                  </h1>

                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t.by} {book.author}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">{t.narrator}: {book.narrator}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">{t.duration}: {formatDuration(book.duration)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">{t.publishedYear}: {book.publishedYear}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  {readingProgress && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{t.progress}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(totalProgress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${totalProgress}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {completedChapters.length} / {book.chapters.length} {t.chapters} {t.completed}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-6 space-y-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handlePlayChapter(currentChapter, currentChapterIndex)}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                        >
                          <Play size={20} />
                          <span>{readingProgress ? t.continueReading : t.startReading}</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{readingProgress ? t.continueReading : t.startReading}</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* PDF Actions - Only show if PDF is available */}
                    {hasPdf && (
                      <div className="flex space-x-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => setShowPdf(true)}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                            >
                              <FileText size={20} />
                              <span>{t.readPdf}</span>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t.readPdf}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    )}

                    {/* Show message if no PDF available */}
                    {!hasPdf && (
                      <div className="text-center py-3 text-gray-500 dark:text-gray-400 text-sm">
                        {t.pdfNotAvailable}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t.description}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {book.description}
                </p>
              </div>
            </div>

            {/* Right Column - Chapter Playlist */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t.chapters}</h2>
                    <div className="flex items-center space-x-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={handlePreviousChapter}
                            disabled={currentChapterIndex === 0}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <SkipBack size={20} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t.previousChapter}</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={handleNextChapter}
                            disabled={currentChapterIndex === book.chapters.length - 1}
                            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <SkipForward size={20} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t.nextChapter}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {book.chapters.map((chapter, index) => {
                    const isCompleted = completedChapters.includes(chapter.id);
                    const isCurrentlyPlayingChapter = isCurrentlyPlaying && playingChapterIndex === index;
                    
                    return (
                      <div
                        key={chapter.id}
                        className={`p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          isCurrentlyPlayingChapter ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => handlePlayChapter(chapter, index)}
                                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                    isCurrentlyPlayingChapter 
                                      ? 'bg-emerald-600 text-white' 
                                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 hover:bg-emerald-600 hover:text-white'
                                  }`}
                                >
                                  {state.audioPlayerState.isPlaying && isCurrentlyPlayingChapter ? (
                                    <Pause size={16} />
                                  ) : (
                                    <Play size={16} className="ml-0.5" />
                                  )}
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{state.audioPlayerState.isPlaying && isCurrentlyPlayingChapter ? t.pause : t.play} {chapter.title}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className={`font-medium truncate ${
                              isCurrentlyPlayingChapter ? 'text-emerald-700 dark:text-emerald-300' : 'text-gray-900 dark:text-white'
                            }`}>
                              {chapter.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDuration(chapter.duration)}
                            </p>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => handleToggleChapterCompleted(chapter.id)}
                                  className={`transition-colors ${
                                    isCompleted 
                                      ? 'text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300' 
                                      : 'text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                                  }`}
                                >
                                  <CheckCircle size={20} />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{isCompleted ? t.markAsUnread : t.markAsRead}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};