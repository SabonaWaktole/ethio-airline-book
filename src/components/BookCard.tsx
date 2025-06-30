import React from 'react';
import {  Star, Clock, User, Play } from 'lucide-react';
import { Book } from '../types';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { setCurrentView, setSelectedBookId, setCurrentBook, updateAudioPlayer } = useApp();
  const { t } = useLanguage();

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleBookClick = () => {
    // Set the book as current and start playing main audio immediately
    setCurrentBook(book);
    
    // Always play the main audio, no chapter checking
    updateAudioPlayer({
      isPlaying: true,
      currentTime: 0
    });

    // Navigate to book detail page
    setSelectedBookId(book.id);
    setCurrentView('book-detail');
  };

  return (
    <div 
      onClick={handleBookClick}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
    >
      {/* Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-emerald-600/90 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-emerald-600 hover:scale-110 transition-all duration-300 shadow-lg">
            <Play size={20} className="ml-0.5" />
            <span className="font-medium">{t.play}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {book.isNew && (
            <span className="bg-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {t.new}
            </span>
          )}
          {book.isPopular && (
            <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {t.popular}
            </span>
          )}
        </div>

        {/* Language Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full">
            {book.language}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(book.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {book.rating}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-500">
            ({book.totalRatings})
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
          {t.by} {book.author}
        </p>

        {/* Genre */}
        <div className="mb-4">
          <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-3 py-1 rounded-full">
            {book.genre}
          </span>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{formatDuration(book.duration)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User size={14} />
            <span className="truncate max-w-20">{book.narrator.split(' ')[0]}</span>
          </div>
        </div>
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-200 dark:group-hover:border-emerald-700 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
    </div>
  );
};