import { Book, Genre } from '../types';

export const genres: Genre[] = [
  {
    id: 'religious',
    name: 'Religious',
    description: 'Spiritual and religious texts exploring faith, wisdom, and divine teachings.',
    icon: 'BookOpen',
    count: 45
  },
  {
    id: 'history',
    name: 'History',
    description: 'Chronicles of Ethiopian heritage, ancient civilizations, and historical events.',
    icon: 'Scroll',
    count: 32
  },
  {
    id: 'literature',
    name: 'Literature',
    description: 'Classic and contemporary literary works from Ethiopian and global authors.',
    icon: 'Feather',
    count: 38
  },
  {
    id: 'children',
    name: 'Children',
    description: 'Educational and entertaining stories designed for young minds.',
    icon: 'Heart',
    count: 28
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Scientific discoveries, innovations, and educational content.',
    icon: 'Atom',
    count: 21
  },
  {
    id: 'philosophy',
    name: 'Philosophy',
    description: 'Philosophical thoughts and wisdom from Ethiopian and global thinkers.',
    icon: 'Brain',
    count: 19
  },
  {
    id: 'biography',
    name: 'Biography',
    description: 'Life stories of influential figures in Ethiopian and world history.',
    icon: 'User',
    count: 25
  }
];

export const books: Book[] = [
  {
    id: '1',
    title: 'Qaalii',
    author: 'Obsii fi Baqqalaa',
    narrator: 'Unknown',
    genre: 'Biography',
    language: 'Afaan Oromo',
    duration: 4,
    description: 'A gripping account of Ethiopia during one of its most turbulent periods, exploring the personal stories behind the political upheaval.',
    coverImage: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/imagebooks//qaalii.jpg',
    audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Qaalii.mp3',
    pdfUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/pdfbook//Qaalii%20.pdf',
    publishedYear: 2022,
    rating: 4.8,
    totalRatings: 1247,
    isNew: true,
    isPopular: true,
    chapters: [
      { id: '1-1', title: 'Chapter 1', duration: 175, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Qaalii.mp3' },
      { id: '1-2', title: 'Chapter 2', duration: 175, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Qaalii.mp3' },
      { id: '1-3', title: 'Chapter 3', duration: 175, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Qaalii.mp3' },
    ]
  },
  {
    id: '2',
    title: 'Abdii akka hin kutanne, Abdii kutadhu',
    author: 'Mihretu Shanko Giddi',
    narrator: 'unknown',
    genre: 'Philosophy',
    language: 'Afaan Oromo',
    duration: 7,
    description: 'An epic novel about twin brothers born in Ethiopia to an Indian nun and British surgeon, exploring themes of love, betrayal, and redemption.',
    coverImage: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/imagebooks//abdii-akka-hin-kutanne-abdii-kutadhu-cover.png',
    audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Abdi-Akka-hin-Kutanne-Abdii-kutadhu.mp3',
    pdfUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/pdfbook//Abdiiakkahinkutanna.pdf',
    publishedYear: 2021,
    rating: 4.9,
    totalRatings: 0,
    isPopular: true,
    chapters: [
      { id: '2-1', title: 'Chapter 1', duration: 250, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Abdi-Akka-hin-Kutanne-Abdii-kutadhu.mp3' },
      { id: '2-2', title: 'Chapter 2', duration: 250, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Abdi-Akka-hin-Kutanne-Abdii-kutadhu.mp3' },
      { id: '2-3', title: 'Chapter 3', duration: 250, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Abdi-Akka-hin-Kutanne-Abdii-kutadhu.mp3' },
    ]
  },
  {
    id: '3',
    title: 'Endih Yale Yelem',
    author: 'Habtamu Hadari',
    narrator: 'unknown',
    genre: 'Fiction',
    language: 'Amharic',
    duration: 4,
    description: 'A collection of traditional Ethiopian stories and legends passed down through generations, rich with cultural wisdom and moral teachings.',
    coverImage: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/imagebooks//endihyelem.jpg',
    audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//endiyelem.mp3',
    pdfUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/pdfbook//endihyelem.pdf',
    publishedYear: 2023,
    rating: 4.7,
    totalRatings: 892,
    isNew: true,
    chapters: [
      { id: '3-1', title: 'Chapter 1', duration: 127, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//endiyelem.mp3' },
      { id: '3-2', title: 'Chapter 2', duration: 127, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//endiyelem.mp3' },
      { id: '3-3', title: 'Chapter 3', duration: 126, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//endiyelem.mp3' },
    ]
  },
  {
    id: '4',
    title: 'Eyedane Hede',
    author: 'Migbar Sraj',
    narrator: 'Temesgen Birhanu',
    genre: 'Fiction',
    language: 'Amharic',
    duration: 7,
    description: 'A classic Ethiopian romance novel exploring themes of love, sacrifice, and the enduring power of human connection across social boundaries.',
    coverImage: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/imagebooks//eyedanehede.jpg',
    audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//eyedanehede.mp3',
    pdfUrl: '',
    publishedYear: 2020,
    rating: 4.6,
    totalRatings: 1543,
    chapters: [
      { id: '4-1', title: 'Chapter 1', duration: 85, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//eyedanehede.mp3' },
      { id: '4-2', title: 'Chapter 2', duration: 85, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//eyedanehede.mp3' },
      { id: '4-3', title: 'Chapter 3', duration: 85, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//eyedanehede.mp3' },
    ]
  },
  {
    id: '5',
    title: 'Irbooricha',
    author: 'Webi Kebede',
    narrator: 'unknown',
    genre: 'History',
    language: 'Afaan Oromo',
    duration: 7,
    description: 'A masterful portrait of the rise and fall of Ethiopia\'s last emperor, exploring power, tradition, and the end of an era.',
    coverImage: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/imagebooks//irbooricha%20-%20cover.jpg',
    audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Irbooricha%201.mp3',
    pdfUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/pdfbook//Irbooricha.pdf',
    publishedYear: 2019,
    rating: 4.5,
    totalRatings: 987,
    chapters: [
      { id: '5-1', title: 'Chapter 1', duration: 143, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Irbooricha%201.mp3' },
      { id: '5-2', title: 'Chapter 2', duration: 143, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Irbooricha%201.mp3' },
      { id: '5-3', title: 'Chapter 3', duration: 144, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Irbooricha%201.mp3' },
    ]
  },
  {
    id: '6',
    title: 'Mamush',
    author: 'Various Authors',
    narrator: 'unknown',
    genre: 'Philosophy',
    language: 'Amharic',
    duration: 11,
    description: 'Philosophical teachings and wisdom from ancient Ethiopian manuscripts, offering insights into traditional Ethiopian thought and spirituality.',
    coverImage: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/imagebooks//mamush.jpg',
    audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//mamush.mp3',
    pdfUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/pdfbook//mamush.pdf',
    publishedYear: 2023,
    rating: 4.8,
    totalRatings: 654,
    isNew: true,
    chapters: [
      { id: '6-1', title: 'Chapter 1', duration: 110, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//mamush.mp3' },
      { id: '6-2', title: 'Chapter 2', duration: 110, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//mamush.mp3' },
      { id: '6-3', title: 'Chapter 3', duration: 110, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//mamush.mp3' },
    ]
  },
  {
    id: '7',
    title: 'Ye Meri Maninet ena mninet',
    author: 'Unknown',
    narrator: 'Unknown',
    genre: 'Philosophy',
    language: 'Amharic',
    duration: 10,
    description: 'A powerful narration of spiritual stories revolving around the grace of Meri Mihretu.',
    coverImage: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/imagebooks//merimihretu.jpg',
    audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//merimihretu.mp3',
    pdfUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/pdfbook//merimihretu.pdf',
    publishedYear: 2022,
    rating: 4.4,
    totalRatings: 834,
    chapters: [
      { id: '7-1', title: 'Chapter 1', duration: 100, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//merimihretu.mp3' },
      { id: '7-2', title: 'Chapter 2', duration: 100, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//merimihretu.mp3' },
      { id: '7-3', title: 'Chapter 3', duration: 100, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//merimihretu.mp3' },
    ]
  },
  {
    id: '8',
    title: 'Mneneh',
    author: 'Yared Teshome',
    narrator: 'Temesgen Birhanu',
    genre: 'Fiction',
    language: 'Amharic',
    duration: 9,
    description: `This collection of seven unique short stories explores the human experience through mystery, drama, love, loss, and unexpected twists. Each tale stands alone—yet together they offer a rich tapestry of emotions, characters, and moments that linger long after the last page is turned.
                  From quiet encounters that change a life to dramatic revelations that shake the soul, these stories invite readers on a journey across different worlds, cultures, and perspectives. Whether you enjoy suspenseful turns, heartfelt journeys, or reflective moments, this collection has something for every fiction lover`,
    coverImage: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/imagebooks//mneneh.jpg',
    audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//mneneh.mp3',
    pdfUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/pdfbook//mneneh.pdf',
    publishedYear: 2023,
    rating: 4.3,
    totalRatings: 412,
    chapters: [
      { id: '8-1', title: 'Chapter 1', duration: 90, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//mneneh.mp3' },
      { id: '8-2', title: 'Chapter 2', duration: 90, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//mneneh.mp3' },
      { id: '8-3', title: 'Chapter 3', duration: 90, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//mneneh.mp3' },
    ]
  },
  {
    id: '9',
    title: 'Qooxii',
    author: 'Hafte Bekele',
    narrator: 'Hafte Bekele',
    genre: 'Fiction',
    language: 'Afaan Oromo',
    duration: 5,
    description: 'A vibrant folktale from the Oromo community.',
    coverImage: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/imagebooks//qooxii.png',
    audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Qooxii.mp3',
    pdfUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/pdfbook//Qooxii.pdf',
    publishedYear: 2021,
    rating: 4.1,
    totalRatings: 352,
    chapters: [
      { id: '9-1', title: 'Chapter 1', duration: 82, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Qooxii.mp3' },
      { id: '9-2', title: 'Chapter 2', duration: 82, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Qooxii.mp3' },
      { id: '9-3', title: 'Chapter 3', duration: 81, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Qooxii.mp3' },
    ]
  },
  {
    id: '10',
    title: 'Sabiyyicha Shonkoora',
    author: 'Belayneh Aknaw',
    narrator: 'Unknown',
    genre: 'Biography',
    language: 'Afaan Oromo',
    duration: 6,
    description: "A delightful children's story from the Oromo culture.",
    coverImage: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/imagebooks//sabiyyicha-shankoora-qexu-cv.png',
    audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Sabiyyicha-shonkoora-qexu.mp3',
    pdfUrl: '',
    publishedYear: 2021,
    rating: 4.0,
    totalRatings: 298,
    chapters: [
      { id: '10-1', title: 'Chapter 1', duration: 67, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Sabiyyicha-shonkoora-qexu.mp3' },
      { id: '10-2', title: 'Chapter 2', duration: 67, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Sabiyyicha-shonkoora-qexu.mp3' },
      { id: '10-3', title: 'Chapter 3', duration: 66, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Sabiyyicha-shonkoora-qexu.mp3' },
    ]
  },
  {
    id: '11',
    title: 'Sansakka Sakaalame',
    author: 'Abdisa Ejeta',
    narrator: 'Marge Tasfa',
    genre: 'Philosophy',
    language: 'Afaan Oromo',
    duration: 11,
    description: 'A traditional tale with lessons woven in the fabric of oral storytelling.',
    coverImage: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/imagebooks//sansakkaa-sakaalame-cover%20.jpg',
    audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Sansakkasakaalame.mp3',
    pdfUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/pdfbook//Sansakkaa%20Sakaalame.pdf',
    publishedYear: 2022,
    rating: 4.2,
    totalRatings: 315,
    chapters: [
      { id: '11-1', title: 'Chapter 1', duration: 72, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Sansakkasakaalame.mp3' },
      { id: '11-2', title: 'Chapter 2', duration: 72, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Sansakkasakaalame.mp3' },
      { id: '11-3', title: 'Chapter 3', duration: 71, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Sansakkasakaalame.mp3' },
    ]
  },
  {
    id: '12',
    title: 'Ilaalcha Misoomaa',
    author: 'Amanuel Oljira',
    narrator: 'Unknown',
    genre: 'Philosophy',
    language: 'Afaan Oromo',
    duration: 3,
    description: 'The story of the capital city Finfinnee.',
    coverImage: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/imagebooks//IlaalchaMisoomaa.jpg',
    audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Ilaalcha%20Misoomaa.mp3',
    pdfUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/pdfbook//IlaalchaMisoomaa.pdf',
    publishedYear: 2022,
    rating: 4.3,
    totalRatings: 389,
    chapters: [
      { id: '12-1', title: 'Chapter 1', duration: 95, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Ilaalcha%20Misoomaa.mp3' },
      { id: '12-2', title: 'Chapter 2', duration: 95, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Ilaalcha%20Misoomaa.mp3' },
      { id: '12-3', title: 'Chapter 3', duration: 95, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Ilaalcha%20Misoomaa.mp3' },
    ]
  },
  {
    id: '13',
    title: 'Tajooma',
    author: 'Hika Lema',
    narrator: 'Unknown',
    genre: 'Drama',
    language: 'Afaan Oromo',
    duration: 7,
    description: 'A dramatic story capturing emotional and social dynamics.',
    coverImage: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/imagebooks//tajooma%20-%20cover.jpg',
    audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Tajoma.mp3',
    pdfUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/pdfbook//Tajooma%20.pdf',
    publishedYear: 2022,
    rating: 4.5,
    totalRatings: 421,
    chapters: [
      { id: '13-1', title: 'Chapter 1', duration: 87, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Tajoma.mp3' },
      { id: '13-2', title: 'Chapter 2', duration: 87, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Tajoma.mp3' },
      { id: '13-3', title: 'Chapter 3', duration: 86, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//Tajoma.mp3' },
    ]
  },
  {
    id: '14',
    title: '5 Guday',
    author: 'Yared Teshome',
    narrator: 'Nesrullah Beshir',
    genre: 'Drama',
    language: 'Amharic',
    duration: 7,
    description: `This book is a rich tapestry of storytelling, featuring seven distinct short stories, each with its own unique style, theme, and narrative voice. From heartwarming tales to thrilling adventures, thought-provoking dramas to whimsical fantasies, this collection offers a diverse literary experience. Perfect for readers who love variety, these stories come together to create a compelling journey through different worlds, emotions, and ideas.
መድብሏ በውስጧ ሰባት አጫጭር ታሪኮችን አካትታለች። የእንጎቻ ታሪክ እንደሚሉቱ አጠር ተደርገው በየራሳቸው ታሪክ ጀምረው ጨርሰዋል። በሀገር ውስጥም ሆነ ከኢትዩጵያ ውጪ ከተኖረ ህይወት ተጨልፈው በአንደኛና ሁለተኛ መደብ የተተረኩ ስለሆኑ በሁለቱም ቦታ የሚኖር ተደራሲ ቢያነባቸው ለስሜት ቅርብ ናቸው። በመሆኑም ለናንተም ለእኛም ተፅፈዋልና አይወክሉንም አይባልም።`,
    coverImage: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/imagebooks//5guday.jpg',
    audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//5guday.mp3',
    pdfUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/pdfbook//5guday.pdf',
    publishedYear: 2024,
    rating: 4.6,
    totalRatings: 377,
    chapters: [
      { id: '14-1', title: 'Chapter 1', duration: 92, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//5guday.mp3' },
      { id: '14-2', title: 'Chapter 2', duration: 92, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//5guday.mp3' },
      { id: '14-3', title: 'Chapter 3', duration: 91, audioUrl: 'https://rjiozcbtszmyehzffzpa.supabase.co/storage/v1/object/public/audiobook//5guday.mp3' },
      ]
  }
];


export const narrators = [...new Set(books.map(book => book.narrator))];
export const authors = [...new Set(books.map(book => book.author))];
export const languages = [...new Set(books.map(book => book.language))];