import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppProvider } from './contexts/AppContext';
import { TooltipProvider } from './components/ui/tooltip';
import { Header } from './components/Header';
import { AudioPlayer } from './components/AudioPlayer';
import { Footer } from './components/Footer';
import { Home } from './components/views/Home';
import { Library } from './components/views/Library';
import { Genres } from './components/views/Genres';
import { About } from './components/views/About';
import { BookDetail } from './components/BookDetail';
import { useApp } from './contexts/AppContext';

const AppContent: React.FC = () => {
  const { state } = useApp();

  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'home':
        return <Home />;
      case 'library':
        return <Library />;
      case 'genres':
        return <Genres />;
      case 'about':
        return <About />;
      case 'book-detail':
        return <BookDetail />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="pb-20">
        {renderCurrentView()}
      </main>
      <Footer />
      <AudioPlayer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppProvider>
          <TooltipProvider>
            <AppContent />
          </TooltipProvider>
        </AppProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;