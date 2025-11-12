import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  FileText,
  X 
} from 'lucide-react';
import './AdminSidebar.css';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Custom hook to detect mobile devices
const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  return isMobile;
};

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const isMobile = useMobileDetect();
  
  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/teachers', icon: Users, label: 'Teachers' },
    { path: '/admin/students', icon: Users, label: 'Students' },
    { path: '/admin/subjects', icon: BookOpen, label: 'Subjects' },
    { path: '/admin/assignments', icon: FileText, label: 'Assignments' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  // For bottom navbar, show only essential items
  const bottomNavItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: '' },
    { path: '/admin/teachers', icon: Users, label: '' },
    { path: '/admin/students', icon: Users, label: '' },
    { path: '/admin/subjects', icon: BookOpen, label: '' },
    { path: '/admin/assignments', icon: FileText, label: ''},
    { path: '/admin/analytics', icon: BarChart3, label: '' },
     { path: '/admin/settings', icon: Settings, label: '' },
  ];

  // Render bottom navbar for mobile
  if (isMobile) {
    return (
      <nav className="admin-bottom-navbar">
        <div className="bottom-nav-items">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `bottom-nav-link ${isActive ? 'active' : ''}`
                }
                onClick={onClose}
              >
                <Icon size={20} className="bottom-nav-icon" />
                <span className="bottom-nav-label">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    );
  }

  // Render regular sidebar for desktop
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}
      
      <aside className={`admin-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <BookOpen size={24} />
            <span>LMS Admin</span>
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
      </aside>
    </>
  );
};

export default AdminSidebar;