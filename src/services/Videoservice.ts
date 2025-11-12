// services/videoService.ts
import { type VideoLesson } from '../data/mockVideoLessons';

// For development - use mock data when API is not available
const USE_MOCK_DATA = true;
const MOCK_DELAY = 1000; // Simulate network delay

const API_BASE_URL = 'https://your-api-domain.com/api';

// Mock data fallback
const mockVideoLessons: VideoLesson[] = [
  {
    id: 'v1',
    title: 'Introduction to Algebra',
    description: 'Learn the fundamentals of algebraic expressions and equations with practical examples.',
    subject: 'Mathematics',
    teacherId: 'teacher-1',
    teacherName: 'Caleb Odhiambo',
    duration: 45,
    thumbnail: 'https://images.pexels.com/photos/356043/pexels-photo-356043.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-whiteboard-with-mathematical-formulas-1170-large.mp4',
    views: 1247,
    likes: 89,
    uploadDate: '2024-01-15',
    difficulty: 'beginner',
    tags: ['algebra', 'equations', 'expressions'],
    isWatched: true,
    progress: 100,
    relatedMaterials: ['worksheet.pdf', 'practice_problems.docx']
  },
  {
    id: 'v2',
    title: 'Newton\'s Laws of Motion',
    description: 'Explore Newton\'s three laws of motion with real-world applications and demonstrations.',
    subject: 'Physics',
    teacherId: 'teacher-1',
    teacherName: 'Mary Jaoko',
    duration: 38,
    thumbnail: 'https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=400',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-physics-class-with-experiments-1175-large.mp4',
    views: 892,
    likes: 67,
    uploadDate: '2024-01-20',
    difficulty: 'intermediate',
    tags: ['physics', 'motion', 'newton'],
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
    teacherId: 'teacher-3',
    teacherName: 'Kennedy Odoyo',
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
    teacherId: 'teacher-2',
    teacherName: 'Brian Odoyo',
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

class VideoService {
  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    // Use mock data if enabled or if API fails
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
      throw new Error('Mock data mode enabled');
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      // Fall back to mock data
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
      throw new Error('API unavailable, using mock data');
    }
  }

  // Get all video lessons with filtering
  async getVideoLessons(filters?: {
    subject?: string;
    difficulty?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ lessons: VideoLesson[]; total: number }> {
    try {
      const params = new URLSearchParams();
      if (filters?.subject) params.append('subject', filters.subject);
      if (filters?.difficulty) params.append('difficulty', filters.difficulty);
      if (filters?.search) params.append('search', filters.search);
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());

      return await this.fetchAPI(`/videos?${params.toString()}`);
    } catch (error) {
      // Return mock data when API fails
      let filteredLessons = [...mockVideoLessons];
      
      if (filters?.subject && filters.subject !== 'all') {
        filteredLessons = filteredLessons.filter(lesson => lesson.subject === filters.subject);
      }
      
      if (filters?.difficulty && filters.difficulty !== 'all') {
        filteredLessons = filteredLessons.filter(lesson => lesson.difficulty === filters.difficulty);
      }
      
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filteredLessons = filteredLessons.filter(lesson => 
          lesson.title.toLowerCase().includes(searchLower) ||
          lesson.description.toLowerCase().includes(searchLower) ||
          lesson.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }

      return {
        lessons: filteredLessons,
        total: filteredLessons.length
      };
    }
  }

  // Get single video lesson
  async getVideoLesson(id: string): Promise<VideoLesson> {
    try {
      return await this.fetchAPI(`/videos/${id}`);
    } catch (error) {
      // Return mock data when API fails
      const lesson = mockVideoLessons.find(lesson => lesson.id === id);
      if (!lesson) {
        throw new Error(`Video lesson with id ${id} not found`);
      }
      return lesson;
    }
  }

  // Update video progress
  async updateProgress(videoId: string, progress: number): Promise<void> {
    try {
      await this.fetchAPI(`/videos/${videoId}/progress`, {
        method: 'PUT',
        body: JSON.stringify({ progress }),
      });
    } catch (error) {
      // Mock implementation - update local mock data
      console.log(`Mock: Updated progress for ${videoId} to ${progress}%`);
      // In a real app, you might want to update a local state manager
    }
  }

  // Mark as watched
  async markAsWatched(videoId: string): Promise<void> {
    try {
      await this.fetchAPI(`/videos/${videoId}/watched`, {
        method: 'POST',
      });
    } catch (error) {
      // Mock implementation
      console.log(`Mock: Marked ${videoId} as watched`);
    }
  }

  // Get video streaming URL (with proper authentication)
  async getVideoStreamUrl(videoId: string, quality: string = '720p'): Promise<string> {
    try {
      const response = await this.fetchAPI(`/videos/${videoId}/stream?quality=${quality}`);
      return response.streamUrl;
    } catch (error) {
      // Return mock video URL
      const lesson = mockVideoLessons.find(lesson => lesson.id === videoId);
      if (!lesson) {
        throw new Error(`Video lesson with id ${videoId} not found`);
      }
      return lesson.videoUrl;
    }
  }

  // Search videos
  async searchVideos(query: string): Promise<VideoLesson[]> {
    try {
      return await this.fetchAPI(`/videos/search?q=${encodeURIComponent(query)}`);
    } catch (error) {
      // Mock search implementation
      const searchLower = query.toLowerCase();
      return mockVideoLessons.filter(lesson => 
        lesson.title.toLowerCase().includes(searchLower) ||
        lesson.description.toLowerCase().includes(searchLower) ||
        lesson.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
  }
}

export const videoService = new VideoService();