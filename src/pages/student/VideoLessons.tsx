import React, { useState, useEffect, useMemo } from 'react';
import { Play, Clock, Eye, ThumbsUp, Download, Filter, Search, BookOpen, Star, CheckCircle } from 'lucide-react';
import StudentLayout from '../../layout/StudentLayout';
import Button from '../../components/ui/Button';
import { videoService } from '../../services/Videoservice';
import { type VideoLesson } from '../../data/mockVideoLessons';
import './VideoLessons.css';

const VideoPlayerModal: React.FC<{ video: VideoLesson | null; onClose: () => void }> = ({ video, onClose }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (video && videoRef.current) {
      // Load the video
      videoRef.current.load();
    }
  }, [video]);

  const handleTimeUpdate = () => {
    if (videoRef.current && video) {
      const currentTime = videoRef.current.currentTime;
      setCurrentTime(currentTime);
      
      const duration = videoRef.current.duration;
      
      if (duration > 0 && currentTime > 0) {
        const progress = (currentTime / duration) * 100;
        
        // Save progress at intervals
        if (Math.floor(currentTime) % 10 === 0) {
          videoService.updateProgress(video.id, Math.round(progress));
        }
      }
    }
  };

  const handlePlay = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing video:', error);
      }
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  if (!video) return null;

  return (
    <div className="video-player-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{video.title}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="video-container">
          <video
            ref={videoRef}
            controls
            onPlay={handlePlay}
            onPause={handlePause}
            onTimeUpdate={handleTimeUpdate}
            className="video-element"
          >
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {!isPlaying && (
            <div className="play-overlay" onClick={handlePlay}>
              <div className="play-overlay-content">
                <Play size={48} fill="currentColor" />
                <p>Click to play video</p>
              </div>
            </div>
          )}
        </div>
        <div className="video-info">
          <div className="teacher-info">
            <span>By {video.teacherName}</span>
            <span>{video.subject}</span>
          </div>
          <div className="video-stats">
            <span><Eye size={16} /> {video.views} views</span>
            <span><ThumbsUp size={16} /> {video.likes} likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoLessons: React.FC = () => {
  const [videoLessons, setVideoLessons] = useState<VideoLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'watched' | 'in-progress' | 'new'>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentVideo, setCurrentVideo] = useState<VideoLesson | null>(null);

  // Fetch videos on component mount
  useEffect(() => {
    loadVideoLessons();
  }, []);

  const loadVideoLessons = async () => {
    try {
      setLoading(true);
      const response = await videoService.getVideoLessons();
      setVideoLessons(response.lessons);
    } catch (err) {
      setError('Failed to load video lessons');
      console.error('Error loading videos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get unique subjects and difficulties for filters
  const subjects = useMemo(() => 
    ['all', ...new Set(videoLessons.map(lesson => lesson.subject))]
  , [videoLessons]);

  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  // Filter video lessons
  const filteredLessons = useMemo(() => {
    return videoLessons.filter(lesson => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchLower === '' || 
        lesson.title.toLowerCase().includes(searchLower) ||
        lesson.description.toLowerCase().includes(searchLower) ||
        lesson.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      const matchesSubject = subjectFilter === 'all' || lesson.subject === subjectFilter;
      const matchesDifficulty = difficultyFilter === 'all' || lesson.difficulty === difficultyFilter;

      let matchesStatus = true;
      switch (activeFilter) {
        case 'watched':
          matchesStatus = lesson.isWatched === true;
          break;
        case 'in-progress':
          matchesStatus = (lesson.progress || 0) > 0 && (lesson.progress || 0) < 100;
          break;
        case 'new':
          matchesStatus = (lesson.progress || 0) === 0;
          break;
        default:
          matchesStatus = true;
      }

      return matchesSearch && matchesSubject && matchesDifficulty && matchesStatus;
    });
  }, [videoLessons, searchTerm, subjectFilter, difficultyFilter, activeFilter]);

  // Get recommended lessons
  const recommendedLessons = useMemo(() => {
    return videoLessons
      .filter(lesson => !lesson.isWatched)
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);
  }, [videoLessons]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalLessons = videoLessons.length;
    const completedLessons = videoLessons.filter(lesson => lesson.isWatched).length;
    const totalHours = Math.round(videoLessons.reduce((total, lesson) => total + lesson.duration, 0) / 60);
    const avgRating = totalLessons > 0 
      ? Math.round(videoLessons.reduce((total, lesson) => total + lesson.likes, 0) / totalLessons)
      : 0;
    
    return { totalLessons, completedLessons, totalHours, avgRating };
  }, [videoLessons]);

  const handlePlayVideo = async (lessonId: string) => {
    try {
      const lesson = await videoService.getVideoLesson(lessonId);
      setCurrentVideo(lesson);
    } catch (err) {
      console.error('Error loading video:', err);
      alert('Failed to load video. Please try again.');
    }
  };

  const handleDownloadMaterials = (lessonId: string) => {
    console.log('Download materials for:', lessonId);
    alert(`Downloading materials for lesson: ${lessonId}`);
  };

  const handleMarkAsWatched = async (lessonId: string) => {
    try {
      await videoService.markAsWatched(lessonId);
      // Update local state
      setVideoLessons(prev => prev.map(lesson => 
        lesson.id === lessonId 
          ? { ...lesson, isWatched: true, progress: 100 }
          : lesson
      ));
    } catch (err) {
      console.error('Error marking as watched:', err);
    }
  };

  const handleCloseVideo = () => {
    setCurrentVideo(null);
  };

  const formatDuration = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hrs > 0) {
      return `${hrs}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  const getProgressText = (progress: number) => {
    if (progress === 0) return 'Not started';
    if (progress === 100) return 'Completed';
    return `${progress}% watched`;
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="video-lessons loading">
          <div className="loader">Loading video lessons...</div>
        </div>
      </StudentLayout>
    );
  }

  if (error) {
    return (
      <StudentLayout>
        <div className="video-lessons error">
          <div className="error-message">
            <h3>Error Loading Videos</h3>
            <p>{error}</p>
            <Button variant="primary" onClick={loadVideoLessons}>
              Try Again
            </Button>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="video-lessons">
        {/* Header */}
        <div className="lessons-header">
          <div className="header-left">
            <h1 className="page-title">Video Lessons</h1>
            <p className="page-subtitle">
              Learn at your own pace with our comprehensive video library
            </p>
          </div>
          <div className="header-actions">
            <Button variant="primary">
              <Play size={18} />
              Continue Learning
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="lessons-stats">
          <div className="stat-card">
            <div className="stat-icon primary">
              <Play size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.totalLessons}</h3>
              <p>Total Lessons</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon success">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.completedLessons}</h3>
              <p>Completed</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon warning">
              <Clock size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.totalHours}</h3>
              <p>Hours of Content</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon info">
              <Star size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.avgRating}</h3>
              <p>Avg Rating</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="lessons-controls">
          <div className="controls-left">
            <div className="search-container">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search lessons by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-group">
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="filter-select"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>

              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="filter-select"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>

              <div className="filter-tabs">
                <button
                  className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  All
                </button>
                <button
                  className={`filter-tab ${activeFilter === 'new' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('new')}
                >
                  New
                </button>
                <button
                  className={`filter-tab ${activeFilter === 'in-progress' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('in-progress')}
                >
                  In Progress
                </button>
                <button
                  className={`filter-tab ${activeFilter === 'watched' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('watched')}
                >
                  Watched
                </button>
              </div>
            </div>
          </div>

          <div className="controls-right">
            <Button variant="secondary" size="sm">
              <Filter size={16} />
              More Filters
            </Button>
          </div>
        </div>

        <div className="lessons-content">
          {/* Main Lessons Grid */}
          <div className="lessons-main">
            <div className="section-header">
              <h2>Available Lessons ({filteredLessons.length})</h2>
            </div>

            <div className="lessons-grid">
              {filteredLessons.length === 0 ? (
                <div className="no-lessons">
                  <Play size={48} className="no-lessons-icon" />
                  <h3>No lessons found</h3>
                  <p>Try adjusting your filters or search terms.</p>
                  <Button 
                    variant="primary"
                    onClick={() => {
                      setActiveFilter('all');
                      setSubjectFilter('all');
                      setDifficultyFilter('all');
                      setSearchTerm('');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                filteredLessons.map((lesson) => (
                  <div key={lesson.id} className="lesson-card">
                    <div className="lesson-thumbnail">
                      {lesson.thumbnail ? (
                        <img src={lesson.thumbnail} alt={lesson.title} />
                      ) : (
                        <div className="thumbnail-placeholder">
                          <Play size={32} />
                        </div>
                      )}
                      
                      <div className="thumbnail-overlay">
                        <button 
                          className="play-button"
                          onClick={() => handlePlayVideo(lesson.id)}
                        >
                          <Play size={24} fill="currentColor" />
                        </button>
                        
                        <div className="video-duration">
                          <Clock size={12} />
                          {formatDuration(lesson.duration)}
                        </div>
                      </div>

                      {(lesson.progress || 0) > 0 && (
                        <div className="progress-indicator">
                          <div 
                            className="progress-fill"
                            style={{ width: `${lesson.progress}%` }}
                          ></div>
                        </div>
                      )}

                      {lesson.isWatched && (
                        <div className="watched-badge">
                          <CheckCircle size={16} />
                        </div>
                      )}
                    </div>

                    <div className="lesson-content">
                      <div className="lesson-header">
                        <h3 className="lesson-title">{lesson.title}</h3>
                        <span className={`difficulty-badge difficulty-${lesson.difficulty}`}>
                          {lesson.difficulty}
                        </span>
                      </div>

                      <p className="lesson-description">{lesson.description}</p>

                      <div className="lesson-meta">
                        <div className="meta-item">
                          <BookOpen size={14} />
                          <span>{lesson.subject}</span>
                        </div>
                        <div className="meta-item">
                          <span>By {lesson.teacherName}</span>
                        </div>
                      </div>

                      <div className="lesson-stats">
                        <div className="stat">
                          <Eye size={14} />
                          <span>{formatViews(lesson.views)} views</span>
                        </div>
                        <div className="stat">
                          <ThumbsUp size={14} />
                          <span>{lesson.likes}</span>
                        </div>
                        <div className="stat">
                          <span>{new Date(lesson.uploadDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="lesson-tags">
                        {lesson.tags.map((tag, index) => (
                          <span key={index} className="tag">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="lesson-progress">
                        <span className="progress-text">
                          {getProgressText(lesson.progress || 0)}
                        </span>
                      </div>

                      <div className="lesson-actions">
                        <Button
                          variant={lesson.isWatched ? "secondary" : "primary"}
                          size="sm"
                          onClick={() => handlePlayVideo(lesson.id)}
                          className="action-button"
                        >
                          <Play size={16} />
                          {lesson.isWatched ? 'Watch Again' : 'Watch Now'}
                        </Button>

                        {lesson.relatedMaterials && lesson.relatedMaterials.length > 0 && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleDownloadMaterials(lesson.id)}
                          >
                            <Download size={16} />
                            Materials
                          </Button>
                        )}

                        {!lesson.isWatched && (lesson.progress || 0) < 100 && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleMarkAsWatched(lesson.id)}
                          >
                            <CheckCircle size={16} />
                            Mark Done
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recommended Sidebar */}
          <div className="lessons-sidebar">
            <div className="recommended-section">
              <h3>Recommended For You</h3>
              <div className="recommended-list">
                {recommendedLessons.map(lesson => (
                  <div key={lesson.id} className="recommended-card">
                    <div className="recommended-thumbnail">
                      {lesson.thumbnail ? (
                        <img src={lesson.thumbnail} alt={lesson.title} />
                      ) : (
                        <div className="thumbnail-placeholder small">
                          <Play size={16} />
                        </div>
                      )}
                    </div>
                    <div className="recommended-content">
                      <h4>{lesson.title}</h4>
                      <div className="recommended-meta">
                        <span>{lesson.subject}</span>
                        <span>{formatDuration(lesson.duration)}</span>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handlePlayVideo(lesson.id)}
                      >
                        <Play size={14} />
                        Watch
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Tips */}
            <div className="learning-tips">
              <h3>Learning Tips</h3>
              <div className="tips-list">
                <div className="tip">
                  <Play size={16} />
                  <span>Take notes while watching to improve retention</span>
                </div>
                <div className="tip">
                  <Clock size={16} />
                  <span>Watch in 25-minute intervals for better focus</span>
                </div>
                <div className="tip">
                  <BookOpen size={16} />
                  <span>Review related materials after each lesson</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player Modal */}
        <VideoPlayerModal video={currentVideo} onClose={handleCloseVideo} />
      </div>
    </StudentLayout>
  );
};

export default VideoLessons;