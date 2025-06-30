import React, { useMemo } from 'react';
import { BookCard } from '../BookCard';
import { FilterBar } from '../FilterBar';
import { books } from '../../data/books';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Search } from 'lucide-react';

export const Library: React.FC = () => {
  const { state } = useApp();
  const { t } = useLanguage();
  const { filterState } = state;

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = !filterState.search || 
        book.title.toLowerCase().includes(filterState.search.toLowerCase()) ||
        book.author.toLowerCase().includes(filterState.search.toLowerCase()) ||
        book.narrator.toLowerCase().includes(filterState.search.toLowerCase());

      const matchesGenre = !filterState.genre || book.genre === filterState.genre;
      const matchesLanguage = !filterState.language || book.language === filterState.language;
      const matchesNarrator = !filterState.narrator || book.narrator === filterState.narrator;
      const matchesAuthor = !filterState.author || book.author === filterState.author;

      return matchesSearch && matchesGenre && matchesLanguage && matchesNarrator && matchesAuthor;
    });
  }, [filterState]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <FilterBar />

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t.noBooksFound}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              {t.noBooksFoundDesc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};