import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Video, 
  Award, 
  TrendingUp,
  MessageSquare,
  Settings,
  X
} from 'lucide-react';
import './StudentSidebar.css';

interface StudentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({ isOpen, onClose }) => {
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(false);

  const menuItems = [
    { path: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/student/courses', icon: BookOpen, label: 'My Courses' },
    { path: '/student/assignments', icon: FileText, label: 'Assignments' },
    { path: '/student/video-lessons', icon: Video, label: 'Video Lessons' },
    { path: '/student/progress', icon: TrendingUp, label: 'Progress' },
    { path: '/student/achievements', icon: Award, label: 'Achievements' },
    { path: '/student/chat', icon: MessageSquare, label: 'Chat' },
    { path: '/student/settings', icon: Settings, label: 'Settings' },
  ];

  // For mobile bottom nav, show only essential items
  const mobileMenuItems = [
    { path: '/student/dashboard', icon: LayoutDashboard, label: 'Home' },
    { path: '/student/courses', icon: BookOpen, label: 'Courses' },
    { path: '/student/assignments', icon: FileText, label: 'Assign' },
    { path: '/student/video-lessons', icon: Video, label: 'Videos' },
    { path: '/student/chat', icon: MessageSquare, label: 'Chat' },
    { path: '/student/progress', icon: TrendingUp, label: 'Progress' },
  ];

  // Scroll visibility logic for bottom nav
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show bottom nav when scrolled down more than 100px
      if (currentScrollY > 100) {
        setIsBottomNavVisible(true);
      } 
      // Hide bottom nav when at top or scrolling up near top
      else if (currentScrollY < 50) {
        setIsBottomNavVisible(false);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="desktop-sidebar">
        <aside className="student-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <BookOpen size={24} />
              <span>Student Portal</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Quick Stats */}
          <div className="sidebar-footer">
            <div className="quick-stats">
              <div className="stat">
                <span className="stat-value">4</span>
                <span className="stat-label">Courses</span>
              </div>
              <div className="stat">
                <span className="stat-value">88%</span>
                <span className="stat-label">Avg Grade</span>
              </div>
              <div className="stat">
                <span className="stat-value">7</span>
                <span className="stat-label">Day Streak</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-bottom-nav">
        <nav className={`bottom-nav ${isBottomNavVisible ? 'visible' : 'hidden'}`}>
          {mobileMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `nav-item ${isActive ? 'active' : ''}`
                }
                onClick={() => {
                  // Close any open modals or reset states if needed
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Icon size={20} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Mobile Sidebar Overlay (for when needed) */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />

      {/* Mobile Sidebar Drawer */}
      <aside className={`student-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <BookOpen size={24} />
            <span>Student Portal</span>
          </div>
          <button 
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
                onClick={onClose}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="sidebar-footer">
          <div className="quick-stats">
            <div className="stat">
              <span className="stat-value">4</span>
              <span className="stat-label">Courses</span>
            </div>
            <div className="stat">
              <span className="stat-value">88%</span>
              <span className="stat-label">Avg Grade</span>
            </div>
            <div className="stat">
              <span className="stat-value">7</span>
              <span className="stat-label">Day Streak</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default StudentSidebar;