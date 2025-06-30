import React from 'react';
import { Heart, Globe, Users, Headphones, Award, Target } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: t.multiLanguage,
      description: t.multiLanguageDesc,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t.professionalNarrators,
      description: t.professionalNarratorsDesc,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: t.highQuality,
      description: t.highQualityDesc,
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: t.curatedContent,
      description: t.curatedContentDesc,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { number: '14+', label: t.books, color: 'text-emerald-600 dark:text-emerald-400' },
    { number: '6+', label: t.narrators, color: 'text-blue-600 dark:text-blue-400' },
    { number: '2', label: t.languages, color: 'text-purple-600 dark:text-purple-400' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-cyan-50 to-violet-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70"></div>
        
        {/* Decorative shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-200/30 dark:bg-cyan-500/10 rounded-full blur-xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t.aboutTitle}
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t.aboutSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t.ourMission}
              </h2>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                <p>{t.missionParagraph1}</p>
                <p>{t.missionParagraph2}</p>
                <p>{t.missionParagraph3}</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square relative">
                <img
                  src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Ethiopian culture"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
              </div>
              
              {/* Floating stats */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">2023</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t.foundedYear}</div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">24/7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t.serviceHours}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.whyEthioBook}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t.whyEthioBookDesc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t.ourSuccess}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t.ourSuccessDesc}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t.contactUs}
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              {t.contactUsDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@nordicict.com"
                className="inline-flex items-center justify-center bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                contact@nordicict.com
              </a>
              <a
                href="tel:+251911234567"
                className="inline-flex items-center justify-center bg-white/20 text-white border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white/30 transition-colors"
              >
                +251 92 581 8585
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};