import React from 'react';
import { Hero } from '../Hero';
import { RandomPlayCard } from '../RandomPlayCard';
import { books, genres, narrators, authors, languages } from '../../data/books';
import { useLanguage } from '../../contexts/LanguageContext';
import { BookOpen, Users, Globe, Star, TrendingUp, Clock, Shuffle, Headphones, Radio } from 'lucide-react';

export const Home: React.FC = () => {
  const { t } = useLanguage();

  // Calculate statistics from actual data
  const totalBooks = books.length;
  const totalGenres = genres.length;
  const totalNarrators = narrators.length;
  const totalAuthors = authors.length;
  const totalLanguages = languages.length;
  const averageRating = (books.reduce((sum, book) => sum + book.rating, 0) / books.length).toFixed(1);
  const totalDuration = books.reduce((sum, book) => sum + book.duration, 0);
  const totalHours = Math.floor(totalDuration / 60);
  const popularBooksCount = books.filter(book => book.isPopular).length;
  const newBooksCount = books.filter(book => book.isNew).length;

  const stats = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: t.totalBooks,
      value: totalBooks.toString(),
      description: t.booksAvailable,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t.languages,
      value: totalLanguages.toString(),
      description: t.languagesSupported,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t.narrators,
      value: totalNarrators.toString(),
      description: t.professionalNarrators,
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: t.averageRating,
      value: averageRating,
      description: t.userRating,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t.popularBooks,
      value: popularBooksCount.toString(),
      description: t.trendingContent,
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: t.totalHours,
      value: `${totalHours}h`,
      description: t.listeningTime,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const additionalStats = [
    { label: t.genres, value: totalGenres },
    { label: t.authors, value: totalAuthors },
    { label: t.newBooks, value: newBooksCount },
    { label: t.averageBookLength, value: `${Math.round(totalDuration / totalBooks)}m` }
  ];

  // Random play cards data
  const randomPlayCards = [
    {
      title: 'Surprise Me',
      description: 'Let us pick a random audiobook for you to discover something new and exciting.',
      icon: <Shuffle className="w-8 h-8" />,
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Random Discovery',
      description: 'Explore our collection with a randomly selected audiobook from our library.',
      icon: <Radio className="w-8 h-8" />,
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Lucky Pick',
      description: 'Feeling adventurous? Let chance decide your next listening experience.',
      icon: <Headphones className="w-8 h-8" />,
      gradient: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Hero />
      
      {/* Random Play Cards Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Random Discovery
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Not sure what to listen to? Let us surprise you with a random selection from our curated collection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {randomPlayCards.map((card, index) => (
              <RandomPlayCard
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
                gradient={card.gradient}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.platformStatistics}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t.platformStatisticsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Statistics */}
          <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl p-12 text-white">
            <div className="text-center mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                {t.moreStatistics}
              </h3>
              <p className="text-xl opacity-90">
                {t.moreStatisticsDesc}
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {additionalStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg opacity-90">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Quality Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.contentQuality}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t.contentQualityDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t.diverseContent}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t.diverseContentDesc}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t.expertNarrators}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t.expertNarratorsDesc}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t.culturalHeritage}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t.culturalHeritageDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};