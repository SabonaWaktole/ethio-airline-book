import { ReactNode } from "react";

export interface Book {
  id: string;
  title: string;
  author: string;
  narrator: string;
  genre: string;
  language: string;
  duration: number; // in minutes
  description: string;
  coverImage: string;
  audioUrl: string;
  pdfUrl?: string;
  publishedYear: number;
  rating: number;
  totalRatings: number;
  isNew?: boolean;
  isPopular?: boolean;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  duration: number; // in minutes
  audioUrl: string;
  startTime?: number; // for PDF synchronization
  endTime?: number;
}

export interface Genre {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export interface FilterState {
  search: string;
  genre: string;
  language: string;
  narrator: string;
  author: string;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
  buffered: number;
  currentChapter?: Chapter;
}

export interface ReadingProgress {
  bookId: string;
  currentChapter: string;
  currentTime: number;
  completedChapters: string[];
  lastReadAt: string;
  totalProgress: number; // percentage
}

export type ViewType = 'home' | 'library' | 'genres' | 'about' | 'book-detail';
export type ThemeMode = 'light' | 'dark';
export type Language = 'en' | 'am' | 'om';

export interface AppState {
  currentView: ViewType;
  currentBook: Book | null;
  selectedBookId: string | null;
  audioPlayerState: AudioPlayerState;
  filterState: FilterState;
  readingProgress: Record<string, ReadingProgress>;
}

export interface Translation {
  allRightsReserved: ReactNode;
  // Navigation
  home: string;
  library: string;
  genres: string;
  about: string;
  
  // Common
  search: string;
  play: string;
  pause: string;
  loading: string;
  duration: string;
  author: string;
  narrator: string;
  genre: string;
  language: string;
  rating: string;
  description: string;
  chapters: string;
  by:string;
  new:string;
  viewDetails: string;
  
  // Book Detail
  readPdf: string;
  downloadPdf: string;
  bookDetails: string;
  publishedYear: string;
  totalRatings: string;
  currentChapter: string;
  nextChapter: string;
  previousChapter: string;
  markAsCompleted: string;
  continueReading: string;
  startReading: string;
  closePdf: string;
  pdfViewer: string;
  continuousReading: string;
  pagination: string;
  bookPdf: string;
  bookNotFound: string;
  returnToLibrary: string;
  markAsRead: string;
  markAsUnread: string;
  expandChapters: string;
  collapseChapters: string;
  pdfNotAvailable: string;
  
  // Progress
  progress: string;
  completed: string;
  remaining: string;
  lastRead: string;
  
  // Filters
  filters: string;
  clearAll: string;
  allGenres: string;
  allLanguages: string;
  allNarrators: string;
  allAuthors: string;
  
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  exploreBooks: string;
  aboutUs: string;
  
  // Stats
  books: string;
  languages: string;
  narrators: string;
  listeners: string;
  
  // Home page sections
  popularBooks: string;
  popularBooksDesc: string;
  newBooks: string;
  newBooksDesc: string;
  recentlyAdded: string;
  recentlyAddedDesc: string;

  // Footer
  audioBooksplatform: string;
  footerDescription: string;
  quickLinks: string;
  categories: string;
  religious: string;
  history: string;
  literature:string;
  children: string;
  science: string;
  location: string;
  followUs: string;
  privacyPolicy: string;
  termsOfService: string;
  support: string

  // Library
  booksFound: string;
  noBooksFound: string;
  noBooksFoundDesc: string;
  
  // Genres
  genresDesc: string;
  genreStats: string;
  genreStatsDesc: string;
  totalBooks: string;
  averagePerGenre: string;
  highestCount: string;
  popular: string;
  
  // About
  aboutTitle: string;
  aboutSubtitle: string;
  ourMission: string;
  missionParagraph1: string;
  missionParagraph2: string;
  missionParagraph3: string;
  multiLanguage: string;
  multiLanguageDesc: string;
  professionalNarrators: string;
  professionalNarratorsDesc: string;
  highQuality: string;
  highQualityDesc: string;
  curatedContent: string;
  curatedContentDesc: string;
  whyEthioBook: string;
  whyEthioBookDesc: string;
  ourSuccess: string;
  ourSuccessDesc: string;
  foundedYear: string;
  serviceHours: string;
  contactUs: string;
  contactUsDesc: string;

  // Home page statistics

  platformStatistics: string;
  platformStatisticsDesc: string;
  booksAvailable: string;
  languagesSupported: string;
  averageRating: string;
  userRating: string;
  trendingContent: string;
  totalHours: string;
  listeningTime:string;
  moreStatistics: string;
  moreStatisticsDesc: string;
  authors: string;
  averageBookLength: string;
  contentQuality: string;
  contentQualityDesc: string;
  diverseContent: string;
  diverseContentDesc: string;
  expertNarrators: string;
  expertNarratorsDesc: string;
  culturalHeritage: string;
  culturalHeritageDesc: string;
  
  // Audio Player Tooltips
  skipBack10: string;
  skipForward10: string;
  seekAudio: string;
  adjustVolume:string;
  closePlayer: string;
  viewBookDetails: string;

  // PDF Viewer
    previousPage: string;
    nextPage: string;
    pages: string;
    zoomIn: string;
    zoomOut: string;
    rotate: string;
    pdfLoadError: string;
    loadingPdf: string;
    pageLoading: string;
}