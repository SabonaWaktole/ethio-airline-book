import React from 'react';
import { Play, Star, TrendingUp, BookOpen, Plane, Globe, Shuffle, Headphones, Radio } from 'lucide-react';
import { books, narrators, languages } from '../data/books';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';

export const Hero: React.FC = () => {
  // Calculate real statistics from actual data
  const totalBooks = books.length;
  const totalNarrators = narrators.length;
  const totalLanguages = languages.length;
  console.log(`Total Books: ${totalBooks}, Total Narrators: ${totalNarrators}, Total Languages: ${totalLanguages}`);
  const { setCurrentBook, setCurrentView, updateAudioPlayer } = useApp();
  const { t } = useLanguage();
  const featuredBook = books.find(book => book.isPopular && book.isNew) || books[0];

  const handlePlayBook = () => {
    setCurrentBook(featuredBook);
    
    // Always play the main audio, no chapter checking
    updateAudioPlayer({
      isPlaying: true,
      currentTime: 0
    });
  };

  const handleRandomPlay = (cardType: string) => {
    console.log(cardType)
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

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Random play cards data
  const randomPlayCards = [
    {
      id: 'surprise',
      title: 'Surprise Me',
      description: 'Let us pick a random audiobook for you to discover something new and exciting.',
      icon: <Shuffle className="w-8 h-8" />,
      gradient: 'from-emerald-500 to-teal-500',
      image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'discovery',
      title: 'Random Discovery',
      description: 'Explore our collection with a randomly selected audiobook from our library.',
      icon: <Radio className="w-8 h-8" />,
      gradient: 'from-purple-500 to-violet-500',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'lucky',
      title: 'Lucky Pick',
      description: 'Feeling adventurous? Let chance decide your next listening experience.',
      icon: <Headphones className="w-8 h-8" />,
      gradient: 'from-blue-500 to-cyan-500',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div>
      {/* Main Hero Section with Alliance Banner Background */}
      <section className="relative overflow-hidden min-h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/imagebooks//kidairlinenordic.jpg')`
          }}
        ></div>
        
        {/* Subtle Dark Overlay - keeps image visible but enhances text readability */}
        <div className="absolute inset-0 bg-black/25 dark:bg-black/35"></div>
        
        {/* Gradient Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
        
        {/* Decorative blur elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-violet-500/20 rounded-full blur-xl"></div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Content */}
            <div className="space-y-8">
              {/* Alliance Header */}
              <div className="mb-8">
                <div className="inline-flex items-center space-x-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg">
                  <Plane className="w-6 h-6 text-blue-600" />
                  <span className="text-gray-900 dark:text-white font-bold text-lg">Ethiopian Airlines</span>
                  <span className="text-gray-400">×</span>
                  <Globe className="w-6 h-6 text-emerald-600" />
                  <span className="text-gray-900 dark:text-white font-bold text-lg">Nordic ICT</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                  United for Ethiopian Audiobook Innovation
                </h1>
                
                <p className="text-xl lg:text-2xl text-white/95 leading-relaxed drop-shadow-md">
                  {t.heroSubtitle}
                </p>
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-emerald-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  <TrendingUp size={16} />
                  <span>Trending</span>
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight drop-shadow-lg">
                  {t.heroTitle}
                </h2>

                {/* Partnership Information Card */}
                <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center space-x-2">
                      <Plane className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">Ethiopian Airlines</span>
                    </div>
                    <span className="text-gray-400">×</span>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">Nordic ICT</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Welcome to the Book Review Portal – For Ethiopian Airlines OnlyThis website has been created exclusively for Ethiopian Airlines and its representatives. The purpose is to present and evaluate a selection of audiobooks proposed for possible use onboard Ethiopian Airlines flights
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCurrentView('library')}
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-emerald-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl backdrop-blur-sm"
                >
                  <BookOpen size={24} />
                  <span>{t.exploreBooks}</span>
                </button>
                
                <button
                  onClick={() => setCurrentView('about')}
                  className="inline-flex items-center justify-center space-x-2 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white border-2 border-white/50 dark:border-gray-600/50 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white dark:hover:bg-gray-700 transition-colors backdrop-blur-sm shadow-lg"
                >
                  <span>{t.aboutUs}</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="text-3xl font-bold text-white drop-shadow-md">{totalBooks}+</div>
                  <div className="text-sm text-white/90">{t.books}</div>
                </div>
                <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="text-3xl font-bold text-white drop-shadow-md">{totalLanguages}+</div>
                  <div className="text-sm text-white/90">{t.languages}</div>
                  
                </div>
                <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="text-3xl font-bold text-white drop-shadow-md">{totalNarrators}+</div>
                  <div className="text-sm text-white/90">{t.narrators}</div>
                </div>
              </div>
            </div>

            {/* Featured Book and Random Play Cards */}
            <div className="space-y-8">
              {/* Featured Book */}
              <div className="relative">
                <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="aspect-[3/4] relative">
                    <img
                      src={featuredBook.coverImage}
                      alt={featuredBook.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Play Button Overlay */}
                    <button
                      onClick={handlePlayBook}
                      className="absolute inset-0 flex items-center justify-center group"
                    >
                      <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-xl">
                        <Play size={32} className="text-emerald-600 ml-1" />
                      </div>
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < Math.floor(featuredBook.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {featuredBook.rating} ({featuredBook.totalRatings})
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {featuredBook.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      by {featuredBook.author}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        {formatDuration(featuredBook.duration)}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {featuredBook.language}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Random Play Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {randomPlayCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleRandomPlay(card.id)}
                    className="group relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 cursor-pointer"
                  >
                    {/* Background Image */}
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
                      
                      {/* Icon */}
                      <div className="absolute top-4 left-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <div className="text-white">
                            {card.icon}
                          </div>
                        </div>
                      </div>

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/95 text-gray-900 px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg">
                          <Play size={16} className="ml-0.5" />
                          <span className="font-medium text-sm">{t.play}</span>
                        </div>
                      </div>

                      {/* Shuffle Icon */}
                      <div className="absolute top-4 right-4 opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                        <Shuffle size={20} className="text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {card.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    {/* Hover border effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-200 dark:group-hover:border-emerald-700 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};