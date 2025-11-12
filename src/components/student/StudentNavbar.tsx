import React, { useState } from 'react';
import { Menu, Bell, Search, User, LogOut, BookOpen, Award, Home, TrendingUp, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { type SafeUser } from '../../data/mockUsers';
import './StudentNavbar.css';

interface StudentNavbarProps {
  onMenuClick: () => void;
  user: SafeUser | null;
}

const StudentNavbar: React.FC<StudentNavbarProps> = ({ onMenuClick, user }) => {
  const { logout } = useAuth();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Mock data for student stats
  const studentStats = {
    enrolledCourses: 4,
    completedAssignments: 12,
    averageGrade: 88,
    streak: 7
  };

  // Quick actions for mobile
  const quickActions = [
    { icon: Home, label: 'Home', path: '/student/dashboard' },
    { icon: BookOpen, label: 'Courses', path: '/student/courses' },
    { icon: TrendingUp, label: 'Progress', path: '/student/progress' },
    { icon: Award, label: 'Achievements', path: '/student/achievements' }
  ];

  return (
    <>
      {/* Main Navbar */}
      <header className="student-navbar">
        <div className="navbar-left">
         
          
          {/* Logo for mobile */}
          <div className="mobile-logo">
            <p>MwalimuWetu</p>
            <span>EduApp</span>
          </div>

          {/* Desktop Search */}
          <div className="search-container desktop-search">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search courses, assignments..." 
              className="search-input"
            />
          </div>
        </div>

        {/* Desktop Stats */}
        <div className="navbar-center desktop-stats">
          <div className="student-stats">
            <div className="stat-item">
              <BookOpen size={16} />
              <span>{studentStats.enrolledCourses} Courses</span>
            </div>
            <div className="stat-item">
              <Award size={16} />
              <span>{studentStats.completedAssignments} Done</span>
            </div>
            <div className="stat-item">
              <span className="grade-badge">{studentStats.averageGrade}% Avg</span>
            </div>
            <div className="stat-item">
              <span className="streak-badge">🔥 {studentStats.streak} days</span>
            </div>
          </div>
        </div>

        <div className="navbar-right">
          {/* Mobile Search Toggle */}
          <button 
            className="icon-button mobile-search-btn"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            aria-label="Search"
          >
            <Search size={20} />
          </button>

          {/* Mobile Stats Toggle */}
          <button 
            className="icon-button mobile-stats-btn"
            onClick={() => setShowStats(!showStats)}
            aria-label="Show stats"
          >
            <TrendingUp size={20} />
          </button>

          <button className="icon-button" aria-label="Notifications">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
          
          <div className="user-menu">
            <div className="user-info">
              <div className="user-avatar">
                {user?.profilePic ? (
                  <img src={user.profilePic} alt={user.name} />
                ) : (
                  <User size={20} />
                )}
              </div>
              <span className="user-name">{user?.name}</span>
            </div>
            
            <div className="dropdown-menu">
              <button className="dropdown-item">
                <User size={16} />
                My Profile
              </button>
              <button className="dropdown-item">
                <Award size={16} />
                My Progress
              </button>
              <button className="dropdown-item" onClick={logout}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="mobile-search-overlay">
          <div className="mobile-search-container">
            <div className="mobile-search-header">
              <h3>Search</h3>
              <button 
                onClick={() => setShowMobileSearch(false)}
                className="close-btn"
              >
                <X size={20} />
              </button>
            </div>
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search courses, assignments, videos..." 
                className="search-input full-width"
                autoFocus
              />
            </div>
            <div className="search-suggestions">
              <span className="suggestion-title">Quick Access</span>
              <div className="suggestion-items">
                <button className="suggestion-item">Mathematics 101</button>
                <button className="suggestion-item">Physics Assignment</button>
                <button className="suggestion-item">Chemistry Videos</button>
                <button className="suggestion-item">History Notes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Stats Panel */}
      {showStats && (
        <div className="mobile-stats-overlay">
          <div className="mobile-stats-panel">
            <div className="stats-header">
              <h3>Your Progress</h3>
              <button 
                onClick={() => setShowStats(false)}
                className="close-btn"
              >
                <X size={20} />
              </button>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <BookOpen size={24} />
                <div className="stat-content">
                  <span className="stat-number">{studentStats.enrolledCourses}</span>
                  <span className="stat-label">Courses</span>
                </div>
              </div>
              <div className="stat-card">
                <Award size={24} />
                <div className="stat-content">
                  <span className="stat-number">{studentStats.completedAssignments}</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
              <div className="stat-card highlight">
                <div className="stat-content">
                  <span className="stat-number">{studentStats.averageGrade}%</span>
                  <span className="stat-label">Average Grade</span>
                </div>
              </div>
              <div className="stat-card highlight">
                <div className="stat-content">
                  <span className="stat-number">🔥 {studentStats.streak}</span>
                  <span className="stat-label">Day Streak</span>
                </div>
              </div>
            </div>
            <div className="quick-actions">
              <span className="actions-title">Quick Actions</span>
              <div className="action-buttons">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button key={index} className="action-btn">
                      <Icon size={18} />
                      <span>{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentNavbar;