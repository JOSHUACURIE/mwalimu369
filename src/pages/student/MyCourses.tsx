import React, { useState } from 'react';
import { BookOpen, Clock, Users, Star, Play, Download, Calendar, BarChart3, FileText } from 'lucide-react';
import StudentLayout from '../../layout/StudentLayout';
import Button from '../../components/ui/Button';
import { mockCourses } from '../../data/mockCourses';
import { mockUsers } from '../../data/mockUsers';
import './MyCourses.css';

const MyCourses: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'in-progress' | 'completed' | 'new'>('all');

  // Get current student's enrolled courses
  const currentStudent = mockUsers.find(user => user.role === 'student');
  const enrolledCourses = mockCourses.filter(course => 
    currentStudent?.enrolledSubjects?.includes(course.title)
  );

  // Mock progress data for each course
  const courseProgress = {
    'c1': { progress: 75, completedLessons: 9, totalLessons: 12, lastAccessed: '2024-02-10' },
    'c2': { progress: 60, completedLessons: 6, totalLessons: 10, lastAccessed: '2024-02-08' },
    'c3': { progress: 85, completedLessons: 7, totalLessons: 8, lastAccessed: '2024-02-12' },
    'c4': { progress: 45, completedLessons: 4, totalLessons: 8, lastAccessed: '2024-02-05' }
  };

  // Filter courses based on active filter
  const filteredCourses = enrolledCourses.filter(course => {
    const progress = courseProgress[course.id as keyof typeof courseProgress];
    switch (activeFilter) {
      case 'in-progress':
        return progress && progress.progress > 0 && progress.progress < 100;
      case 'completed':
        return progress && progress.progress === 100;
      case 'new':
        return progress && progress.progress === 0;
      default:
        return true;
    }
  });

  const getTeacherName = (teacherId: string) => {
    const teacher = mockUsers.find(user => user.id === teacherId);
    return teacher?.name || 'Unknown Teacher';
  };

  const getProgressData = (courseId: string) => {
    return courseProgress[courseId as keyof typeof courseProgress] || { 
      progress: 0, 
      completedLessons: 0, 
      totalLessons: 0, 
      lastAccessed: 'Never' 
    };
  };

  const handleContinueLearning = (courseId: string) => {
    // In real app, this would navigate to the course/lesson
    console.log('Continue learning:', courseId);
    alert(`Continuing course: ${courseId}`);
  };

  const handleViewDetails = (courseId: string) => {
    // In real app, this would navigate to course details
    console.log('View course details:', courseId);
    alert(`Viewing details for course: ${courseId}`);
  };

  const formatLastAccessed = (dateString: string) => {
    if (dateString === 'Never') return 'Never accessed';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <StudentLayout>
      <div className="my-courses">
        {/* Header */}
        <div className="courses-header">
          <div className="header-left">
            <h1 className="page-title">My Courses</h1>
            <p className="page-subtitle">
              Continue your learning journey with {enrolledCourses.length} enrolled courses
            </p>
          </div>
          <div className="header-actions">
            <Button variant="primary">
              <BookOpen size={18} />
              Browse Courses
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="courses-stats">
          <div className="stat-card">
            <div className="stat-icon primary">
              <BookOpen size={24} />
            </div>
            <div className="stat-content">
              <h3>{enrolledCourses.length}</h3>
              <p>Total Courses</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon success">
              <BarChart3 size={24} />
            </div>
            <div className="stat-content">
              <h3>
                {Math.round(
                  enrolledCourses.reduce((acc, course) => {
                    const progress = getProgressData(course.id);
                    return acc + progress.progress;
                  }, 0) / enrolledCourses.length
                )}%
              </h3>
              <p>Average Progress</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon warning">
              <Clock size={24} />
            </div>
            <div className="stat-content">
              <h3>
                {enrolledCourses.reduce((acc, course) => {
                  const progress = getProgressData(course.id);
                  return acc + progress.completedLessons;
                }, 0)}
              </h3>
              <p>Lessons Completed</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon info">
              <Star size={24} />
            </div>
            <div className="stat-content">
              <h3>
                {enrolledCourses.filter(course => {
                  const progress = getProgressData(course.id);
                  return progress.progress === 100;
                }).length}
              </h3>
              <p>Courses Completed</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="courses-filters">
          <div className="filter-tabs">
            <button
              className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Courses
            </button>
            <button
              className={`filter-tab ${activeFilter === 'in-progress' ? 'active' : ''}`}
              onClick={() => setActiveFilter('in-progress')}
            >
              In Progress
            </button>
            <button
              className={`filter-tab ${activeFilter === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveFilter('completed')}
            >
              Completed
            </button>
            <button
              className={`filter-tab ${activeFilter === 'new' ? 'active' : ''}`}
              onClick={() => setActiveFilter('new')}
            >
              New
            </button>
          </div>

          <div className="filter-actions">
            <Button variant="secondary" size="sm">
              <Download size={16} />
              Export Progress
            </Button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {filteredCourses.length === 0 ? (
            <div className="no-courses">
              <BookOpen size={48} className="no-courses-icon" />
              <h3>No courses found</h3>
              <p>You don't have any courses matching the current filter.</p>
              <Button 
                variant="primary"
                onClick={() => setActiveFilter('all')}
              >
                View All Courses
              </Button>
            </div>
          ) : (
            filteredCourses.map((course) => {
              const progress = getProgressData(course.id);
              const teacherName = getTeacherName(course.teacherId);
              const isCompleted = progress.progress === 100;
              const isNew = progress.progress === 0;

              return (
                <div key={course.id} className="course-card">
                  <div className="course-header">
                    <div className="course-thumbnail">
                      {course.thumbnail ? (
                        <img src={course.thumbnail} alt={course.title} />
                      ) : (
                        <div className="thumbnail-placeholder">
                          <BookOpen size={24} />
                        </div>
                      )}
                      {isNew && <span className="new-badge">New</span>}
                      {isCompleted && <span className="completed-badge">Completed</span>}
                    </div>

                    <div className="course-actions">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleViewDetails(course.id)}
                      >
                        <FileText size={16} />
                        Details
                      </Button>
                    </div>
                  </div>

                  <div className="course-content">
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-description">{course.description}</p>

                    <div className="course-meta">
                      <div className="meta-item">
                        <Users size={14} />
                        <span>{teacherName}</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={14} />
                        <span>{progress.totalLessons} lessons</span>
                      </div>
                      <div className="meta-item">
                        <Calendar size={14} />
                        <span>Last: {formatLastAccessed(progress.lastAccessed)}</span>
                      </div>
                    </div>

                    <div className="progress-section">
                      <div className="progress-header">
                        <span className="progress-label">Course Progress</span>
                        <span className="progress-value">{progress.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${progress.progress}%` }}
                        ></div>
                      </div>
                      <div className="progress-stats">
                        <span>{progress.completedLessons}/{progress.totalLessons} lessons completed</span>
                      </div>
                    </div>

                    <div className="course-footer">
                      <Button
                        variant={isCompleted ? "secondary" : "primary"}
                        size="sm"
                        onClick={() => handleContinueLearning(course.id)}
                        className="continue-btn"
                      >
                        {isCompleted ? (
                          <>
                            <Star size={16} />
                            Review Course
                          </>
                        ) : (
                          <>
                            <Play size={16} />
                            Continue Learning
                          </>
                        )}
                      </Button>
                      
                      <div className="course-rating">
                        <Star size={14} fill="currentColor" />
                        <span>4.8</span>
                        <span className="rating-count">(124)</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Learning Tips */}
        <div className="learning-tips">
          <h3>Learning Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <Clock size={20} />
              <h4>Set a Schedule</h4>
              <p>Dedicate specific times for learning to build consistency.</p>
            </div>
            <div className="tip-card">
              <BookOpen size={20} />
              <h4>Take Notes</h4>
              <p>Write down key concepts to improve retention and understanding.</p>
            </div>
            <div className="tip-card">
              <BarChart3 size={20} />
              <h4>Track Progress</h4>
              <p>Regularly review your progress to stay motivated and on track.</p>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default MyCourses;