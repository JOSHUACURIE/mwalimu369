import React, { useState } from 'react';
import {  Bell, Search, User, LogOut, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { type SafeUser } from '../../data/mockUsers'
import './AdminNavbar.css';

interface AdminNavbarProps {
  onMenuClick: () => void;
  user: SafeUser | null;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ onMenuClick, user }) => {
  const { logout } = useAuth();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showUserSheet, setShowUserSheet] = useState(false);

  const handleUserMenuClick = () => {
    if (window.innerWidth <= 768) {
      setShowUserSheet(true);
    }
  };

  const closeUserSheet = () => {
    setShowUserSheet(false);
  };

  const handleLogout = () => {
    logout();
    closeUserSheet();
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <>
      <header className="admin-navbar">
        <div className="navbar-left">
          <button 
            className="menu-button"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            MwalimuWetu
          </button>
          
          {/* Desktop Search */}
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="search-input"
            />
          </div>
        </div>

        <div className="navbar-right">
          {/* Mobile Search Toggle */}
          <button 
            className="search-toggle"
            onClick={toggleMobileSearch}
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          <button className="icon-button" aria-label="Notifications">
            <Bell size={18} />
            <span className="notification-badge">3</span>
          </button>
          
          <div className="user-menu" onClick={handleUserMenuClick}>
            <div className="user-info">
              <div className="user-avatar">
                {user?.profilePic ? (
                  <img src={user.profilePic} alt={user.name} />
                ) : (
                  <User size={16} />
                )}
              </div>
              <span className="user-name">{user?.name}</span>
            </div>
            
            {/* Desktop Dropdown */}
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={logout}>
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      <div 
        className={`search-overlay ${showMobileSearch ? 'visible' : ''}`}
        onClick={() => setShowMobileSearch(false)}
      />
      
      {/* Mobile Search Container */}
      <div className={`mobile-search-container ${showMobileSearch ? 'visible' : ''}`}>
        <Search className="search-icon" size={18} />
        <input 
          type="text" 
          placeholder="Search..." 
          className="mobile-search-input"
        />
        <button 
          className="mobile-search-close"
          onClick={() => setShowMobileSearch(false)}
          aria-label="Close search"
        >
          <X size={18} />
        </button>
      </div>

      {/* Mobile User Sheet */}
      <div 
        className={`sheet-overlay ${showUserSheet ? 'visible' : ''}`}
        onClick={closeUserSheet}
      />
      
      <div className={`mobile-user-sheet ${showUserSheet ? 'open' : ''}`}>
        <div className="user-profile-mobile">
          <div className="user-avatar-mobile">
            {user?.profilePic ? (
              <img src={user.profilePic} alt={user.name} />
            ) : (
              <User size={20} />
            )}
          </div>
          <div className="user-details-mobile">
            <div className="user-name-mobile">{user?.name}</div>
            <div className="user-email-mobile">{user?.email}</div>
          </div>
        </div>

        <button className="mobile-menu-item" onClick={handleLogout}>
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </>
  );
};

export default AdminNavbar;