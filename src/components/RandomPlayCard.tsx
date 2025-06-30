import React from 'react';
import { Shuffle, Play, Headphones } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { books } from '../data/books';

interface RandomPlayCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

export const RandomPlayCard: React.FC<RandomPlayCardProps> = ({ 
  title, 
  description, 
  icon, 
  gradient 
}) => {
  const { setCurrentBook, updateAudioPlayer } = useApp();
  const { t } = useLanguage();

  const handleRandomPlay = () => {
    // Select a random book from the library
    const randomIndex = Math.floor(Math.random() * books.length);
    const randomBook = books[randomIndex];
    
    // Set the book as current and start playing main audio immediately
    setCurrentBook(randomBook);
    
    // Always play the main audio, no chapter checking
    updateAudioPlayer({
      isPlaying: true,
      currentTime: 0
    });
  };

  return (
    <div 
      onClick={handleRandomPlay}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 cursor-pointer h-full"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      {/* Content */}
      <div className="relative p-8 h-full flex flex-col justify-center items-center text-center">
        {/* Icon */}
        <div className={`w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          <div className="text-white text-2xl">
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-cyan-600 transition-all duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Play Button */}
        <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <div className={`bg-gradient-to-r ${gradient} text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:scale-105 transition-transform duration-200 shadow-lg`}>
            <Play size={16} className="ml-0.5" />
            <span className="font-medium">{t.play}</span>
          </div>
        </div>

        {/* Shuffle Icon */}
        <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
          <Shuffle size={20} className="text-gray-600 dark:text-gray-400" />
        </div>
      </div>

      {/* Hover border effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-200 dark:group-hover:border-emerald-700 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
    </div>
  );
};