export interface VideoLesson {
  id: string;
  title: string;
  description: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  duration: number; // in minutes
  thumbnail: string;
  videoUrl: string;
  views: number;
  likes: number;
  uploadDate: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  isWatched?: boolean;
  progress?: number; // 0-100 for partially watched videos
  relatedMaterials?: string[];
}


export interface VideoFormat {
  quality: '360p' | '480p' | '720p' | '1080p';
  url: string;
  size: number; // in bytes
}

export interface Subtitle {
  language: string;
  url: string;
}export const mockVideoLessons: VideoLesson[] = [
  {
    id: 'v1',
    title: 'Algebra Fundamentals',
    description: 'Learn basic algebraic concepts and equations.',
    subject: 'Mathematics',
    teacherId: 'teacher-1',
    teacherName: 'Caleb Odhiambo',
    duration: 15, // Actual video duration in minutes
    thumbnail: 'https://images.pexels.com/photos/356043/pexels-photo-356043.jpeg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-whiteboard-with-mathematical-formulas-1170-large.mp4',
    views: 1247,
    likes: 89,
    uploadDate: '2024-01-15',
    difficulty: 'beginner',
    tags: ['algebra', 'math', 'equations'],
    isWatched: true,
    progress: 100
  },
  {
    id: 'v2',
    title: 'Physics Experiments',
    description: 'Hands-on physics demonstrations and experiments.',
    subject: 'Physics', 
    teacherId: 'teacher-1',
    teacherName: 'Mary Jaoko',
    duration: 12,
    thumbnail: 'https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-physics-class-with-experiments-1175-large.mp4',
    views: 892,
    likes: 67,
    uploadDate: '2024-01-20',
    difficulty: 'intermediate',
    tags: ['physics', 'experiments', 'science'],
    isWatched: false,
    progress: 0
  },
  {
    id: 'v3',
    title: 'Essay Writing Techniques',
    description: 'Master the art of essay writing with proven techniques and structure guidelines.',
    subject: 'English Language',
    teacherId: 'teacher-2',
    teacherName: 'Brian Odoyo',
    duration: 52,
    thumbnail: 'https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-typing-on-a-computer-1174-large.mp4',
    views: 1563,
    likes: 124,
    uploadDate: '2024-01-10',
    difficulty: 'beginner',
    tags: ['writing', 'essay', 'composition'],
    isWatched: false,
    progress: 25,
    relatedMaterials: ['essay_rubric.pdf', 'sample_essays.zip']
  },
  {
    id: 'v4',
    title: 'Cell Biology Fundamentals',
    description: 'Dive into the world of cells and understand their structure and functions.',
    subject: 'Biology',
    teacherId: 'teacher-3',  // Changed to new teacher ID
    teacherName: 'Kennedy Odoyo',  // Fixed spelling
    duration: 41,
    thumbnail: 'https://images.pexels.com/photos/7158986/pexels-photo-7158986.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-scientist-studying-a-sample-1177-large.mp4',
    views: 734,
    likes: 45,
    uploadDate: '2024-02-01',
    difficulty: 'beginner',
    tags: ['biology', 'cells', 'microbiology'],
    isWatched: false,
    progress: 0
  },
  {
    id: 'v5',
    title: 'Chemical Reactions & Equations',
    description: 'Learn to balance chemical equations and understand different types of reactions.',
    subject: 'Chemistry',
    teacherId: 'teacher-2',  // Same as Brian Odoyo
    teacherName: 'Brian Odoyo',  // Changed to match teacher-2
    duration: 49,
    thumbnail: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-chemistry-lab-with-experiments-1172-large.mp4',
    views: 623,
    likes: 38,
    uploadDate: '2024-01-25',
    difficulty: 'intermediate',
    tags: ['chemistry', 'reactions', 'equations'],
    isWatched: true,
    progress: 100
  },
  {
    id: 'v6',
    title: 'Advanced Trigonometry',
    description: 'Master trigonometric functions, identities, and their applications in real-world problems.',
    subject: 'Mathematics',
    teacherId: 'teacher-1',
    teacherName: 'Caleb Odhiambo',
    duration: 58,
    thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-geometry-and-mathematics-calculations-1171-large.mp4',
    views: 456,
    likes: 29,
    uploadDate: '2024-02-05',
    difficulty: 'advanced',
    tags: ['mathematics', 'trigonometry', 'functions'],
    isWatched: false,
    progress: 0
  }
];