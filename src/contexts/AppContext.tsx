import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, Book, ViewType, FilterState, AudioPlayerState, ReadingProgress, Chapter } from '../types';

interface AppContextType {
  state: AppState;
  setCurrentView: (view: ViewType) => void;
  setCurrentBook: (book: Book | null) => void;
  setSelectedBookId: (bookId: string | null) => void;
  updateAudioPlayer: (playerState: Partial<AudioPlayerState>) => void;
  updateFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  updateReadingProgress: (bookId: string, progress: Partial<ReadingProgress>) => void;
  getReadingProgress: (bookId: string) => ReadingProgress | null;
  markChapterCompleted: (bookId: string, chapterId: string) => void;
  setCurrentChapter: (chapter: Chapter) => void;
}

type Action =
  | { type: 'SET_CURRENT_VIEW'; payload: ViewType }
  | { type: 'SET_CURRENT_BOOK'; payload: Book | null }
  | { type: 'SET_SELECTED_BOOK_ID'; payload: string | null }
  | { type: 'UPDATE_AUDIO_PLAYER'; payload: Partial<AudioPlayerState> }
  | { type: 'UPDATE_FILTERS'; payload: Partial<FilterState> }
  | { type: 'RESET_FILTERS' }
  | { type: 'UPDATE_READING_PROGRESS'; payload: { bookId: string; progress: Partial<ReadingProgress> } }
  | { type: 'LOAD_READING_PROGRESS'; payload: Record<string, ReadingProgress> }
  | { type: 'MARK_CHAPTER_COMPLETED'; payload: { bookId: string; chapterId: string } }
  | { type: 'SET_CURRENT_CHAPTER'; payload: Chapter };

const initialState: AppState = {
  currentView: 'home',
  currentBook: null,
  selectedBookId: null,
  audioPlayerState: {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    isLoading: false,
    buffered: 0
  },
  filterState: {
    search: '',
    genre: '',
    language: '',
    narrator: '',
    author: ''
  },
  readingProgress: {}
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_CURRENT_VIEW':
      return { ...state, currentView: action.payload };
    case 'SET_CURRENT_BOOK':
      return { ...state, currentBook: action.payload };
    case 'SET_SELECTED_BOOK_ID':
      return { ...state, selectedBookId: action.payload };
    case 'UPDATE_AUDIO_PLAYER':
      return {
        ...state,
        audioPlayerState: { ...state.audioPlayerState, ...action.payload }
      };
    case 'UPDATE_FILTERS':
      return {
        ...state,
        filterState: { ...state.filterState, ...action.payload }
      };
    case 'RESET_FILTERS':
      return {
        ...state,
        filterState: {
          search: '',
          genre: '',
          language: '',
          narrator: '',
          author: ''
        }
      };
    case 'UPDATE_READING_PROGRESS':
      const updatedProgress = {
        ...state.readingProgress[action.payload.bookId],
        ...action.payload.progress,
        lastReadAt: new Date().toISOString()
      };
      const newReadingProgress = {
        ...state.readingProgress,
        [action.payload.bookId]: updatedProgress
      };
      // Save to localStorage
      localStorage.setItem('readingProgress', JSON.stringify(newReadingProgress));
      return {
        ...state,
        readingProgress: newReadingProgress
      };
    case 'LOAD_READING_PROGRESS':
      return {
        ...state,
        readingProgress: action.payload
      };
    case 'MARK_CHAPTER_COMPLETED':
      const currentProgress = state.readingProgress[action.payload.bookId] || {
        bookId: action.payload.bookId,
        currentChapter: '',
        currentTime: 0,
        completedChapters: [],
        lastReadAt: new Date().toISOString(),
        totalProgress: 0
      };
      
      const completedChapters = [...currentProgress.completedChapters];
      if (!completedChapters.includes(action.payload.chapterId)) {
        completedChapters.push(action.payload.chapterId);
      }
      
      const updatedProgressWithChapter = {
        ...currentProgress,
        completedChapters,
        lastReadAt: new Date().toISOString()
      };
      
      const progressWithChapter = {
        ...state.readingProgress,
        [action.payload.bookId]: updatedProgressWithChapter
      };
      
      localStorage.setItem('readingProgress', JSON.stringify(progressWithChapter));
      return {
        ...state,
        readingProgress: progressWithChapter
      };
    case 'SET_CURRENT_CHAPTER':
      return {
        ...state,
        audioPlayerState: { ...state.audioPlayerState, currentChapter: action.payload }
      };
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load reading progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('readingProgress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        dispatch({ type: 'LOAD_READING_PROGRESS', payload: progress });
      } catch (error) {
        console.error('Failed to load reading progress:', error);
      }
    }
  }, []);

  const setCurrentView = (view: ViewType) => {
    dispatch({ type: 'SET_CURRENT_VIEW', payload: view });
  };

  const setCurrentBook = (book: Book | null) => {
    dispatch({ type: 'SET_CURRENT_BOOK', payload: book });
  };

  const setSelectedBookId = (bookId: string | null) => {
    dispatch({ type: 'SET_SELECTED_BOOK_ID', payload: bookId });
  };

  const updateAudioPlayer = (playerState: Partial<AudioPlayerState>) => {
    dispatch({ type: 'UPDATE_AUDIO_PLAYER', payload: playerState });
  };

  const updateFilters = (filters: Partial<FilterState>) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: filters });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const updateReadingProgress = (bookId: string, progress: Partial<ReadingProgress>) => {
    dispatch({ type: 'UPDATE_READING_PROGRESS', payload: { bookId, progress } });
  };

  const getReadingProgress = (bookId: string): ReadingProgress | null => {
    return state.readingProgress[bookId] || null;
  };

  const markChapterCompleted = (bookId: string, chapterId: string) => {
    dispatch({ type: 'MARK_CHAPTER_COMPLETED', payload: { bookId, chapterId } });
  };

  const setCurrentChapter = (chapter: Chapter) => {
    dispatch({ type: 'SET_CURRENT_CHAPTER', payload: chapter });
  };

  return (
    <AppContext.Provider value={{
      state,
      setCurrentView,
      setCurrentBook,
      setSelectedBookId,
      updateAudioPlayer,
      updateFilters,
      resetFilters,
      updateReadingProgress,
      getReadingProgress,
      markChapterCompleted,
      setCurrentChapter
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};