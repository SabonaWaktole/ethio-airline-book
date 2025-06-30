import React from 'react';
import { genres } from '../../data/books';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Grid3X3, BookOpen, TrendingUp } from 'lucide-react';

export const Genres: React.FC = () => {
  const { setCurrentView, updateFilters } = useApp();
  const { t } = useLanguage();

  const handleGenreClick = (genreName: string) => {
    updateFilters({ genre: genreName });
    setCurrentView('library');
  };

  const getIconForGenre = (genreName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'Religious': '🕊️',
      'History': '🏛️',
      'Literature': '📖',
      'Children': '🧸',
      'Science': '🔬',
      'Philosophy': '🤔'
    };
    return iconMap[genreName] || '📚';
  };

  const getColorForGenre = (index: number) => {
    const colors = [
      'from-emerald-500 to-teal-500',
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-violet-500',
      'from-pink-500 to-rose-500',
      'from-orange-500 to-red-500',
      'from-yellow-500 to-orange-500',
      'from-green-500 to-emerald-500',
      'from-indigo-500 to-purple-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Grid3X3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.genres}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.genresDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Genres Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {genres.map((genre, index) => (
            <button
              key={genre.name}
              onClick={() => handleGenreClick(genre.name)}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 text-left"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getColorForGenre(index)} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Border effect */}
              <div className={`absolute inset-0 border-2 border-transparent group-hover:border-opacity-20 group-hover:bg-gradient-to-br group-hover:${getColorForGenre(index)} rounded-2xl transition-all duration-300`}></div>
              
              <div className="relative p-8">
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{getIconForGenre(genre.name)}</span>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-cyan-600 transition-all duration-300">
                    {genre.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {genre.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <BookOpen size={16} className="text-gray-500 dark:text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {genre.count} {t.books}
                      </span>
                    </div>
                    
                    {genre.count > 20 && (
                      <div className="flex items-center space-x-1">
                        <TrendingUp size={14} className="text-emerald-500" />
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          {t.popular}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <div className="w-8 h-8 bg-white dark:bg-gray-700 rounded-full shadow-md flex items-center justify-center">
                    <span className="text-emerald-600 dark:text-emerald-400">→</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t.genreStats}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t.genreStatsDesc}
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {genres.reduce((sum, genre) => sum + genre.count, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t.totalBooks}</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
                {genres.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t.genres}</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                {Math.round(genres.reduce((sum, genre) => sum + genre.count, 0) / genres.length)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t.averagePerGenre}</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {Math.max(...genres.map(g => g.count))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{t.highestCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};