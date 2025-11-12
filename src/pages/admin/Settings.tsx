import React, { useState } from 'react';
import { Save, Bell, Palette, Database, Shield, Download, Upload } from 'lucide-react';
import AdminLayout from '../../layout/AdminLayout';
import Button from '../../components/ui/Button';
import { useTheme } from '../../context/ThemeContext';
import './Settings.css';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'security' | 'notifications' | 'backup'>('general');
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Learning Management System',
    siteDescription: 'Your modern learning platform',
    adminEmail: 'admin@lms.com',
    language: 'en',
    timezone: 'UTC+3',
    dateFormat: 'DD/MM/YYYY',
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: theme,
    primaryColor: '#2563EB',
    sidebarStyle: 'expanded',
    fontFamily: 'Inter',
  });

  const [securitySettings, setSecuritySettings] = useState({
    require2FA: false,
    sessionTimeout: 60,
    passwordPolicy: 'strong',
    loginAttempts: 5,
    autoLogout: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    studentEnrollment: true,
    assignmentSubmission: true,
    gradeUpdates: true,
    systemAlerts: true,
  });

  const handleSaveSettings = async (section: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`Saving ${section} settings:`, {
      general: generalSettings,
      appearance: appearanceSettings,
      security: securitySettings,
      notifications: notificationSettings,
    });
    
    setIsLoading(false);
    alert(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`);
  };

  const handleExportData = () => {
    // In real app, this would generate and download a backup
    alert('Exporting system data...');
  };

  const handleImportData = () => {
    // In real app, this would handle file upload
    alert('Importing system data...');
  };

  const handleResetSettings = (section: string) => {
    if (confirm(`Are you sure you want to reset all ${section} settings to default?`)) {
      alert(`${section} settings reset to default`);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Gear },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'backup', label: 'Backup & Restore', icon: Database },
  ];

  return (
    <AdminLayout>
      <div className="settings">
        {/* Header */}
        <div className="settings-header">
          <div className="header-left">
            <h1 className="page-title">System Settings</h1>
            <p className="page-subtitle">
              Manage your LMS platform configuration and preferences
            </p>
          </div>
        </div>

        <div className="settings-layout">
          {/* Sidebar Navigation */}
          <div className="settings-sidebar">
            <nav className="settings-nav">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id as any)}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="settings-content">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>General Settings</h2>
                  <p>Basic configuration for your LMS platform</p>
                </div>

                <div className="settings-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Site Name</label>
                      <input
                        type="text"
                        value={generalSettings.siteName}
                        onChange={(e) => setGeneralSettings(prev => ({
                          ...prev,
                          siteName: e.target.value
                        }))}
                        className="form-input"
                        placeholder="Enter site name"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Admin Email</label>
                      <input
                        type="email"
                        value={generalSettings.adminEmail}
                        onChange={(e) => setGeneralSettings(prev => ({
                          ...prev,
                          adminEmail: e.target.value
                        }))}
                        className="form-input"
                        placeholder="Enter admin email"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Site Description</label>
                    <textarea
                      value={generalSettings.siteDescription}
                      onChange={(e) => setGeneralSettings(prev => ({
                        ...prev,
                        siteDescription: e.target.value
                      }))}
                      className="form-input textarea"
                      placeholder="Enter site description"
                      rows={3}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Language</label>
                      <select
                        value={generalSettings.language}
                        onChange={(e) => setGeneralSettings(prev => ({
                          ...prev,
                          language: e.target.value
                        }))}
                        className="form-input"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Timezone</label>
                      <select
                        value={generalSettings.timezone}
                        onChange={(e) => setGeneralSettings(prev => ({
                          ...prev,
                          timezone: e.target.value
                        }))}
                        className="form-input"
                      >
                        <option value="UTC+0">UTC+0</option>
                        <option value="UTC+1">UTC+1</option>
                        <option value="UTC+2">UTC+2</option>
                        <option value="UTC+3">UTC+3</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Date Format</label>
                      <select
                        value={generalSettings.dateFormat}
                        onChange={(e) => setGeneralSettings(prev => ({
                          ...prev,
                          dateFormat: e.target.value
                        }))}
                        className="form-input"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-actions">
                    <Button
                      variant="primary"
                      onClick={() => handleSaveSettings('general')}
                      loading={isLoading}
                    >
                      <Save size={16} />
                      Save General Settings
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleResetSettings('general')}
                    >
                      Reset to Default
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>Appearance Settings</h2>
                  <p>Customize the look and feel of your LMS</p>
                </div>

                <div className="settings-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Theme</label>
                      <div className="theme-options">
                        <button
                          className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                          onClick={toggleTheme}
                        >
                          <div className="theme-preview light">
                            <div className="preview-header"></div>
                            <div className="preview-sidebar"></div>
                            <div className="preview-content"></div>
                          </div>
                          <span>Light Mode</span>
                        </button>
                        <button
                          className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                          onClick={toggleTheme}
                        >
                          <div className="theme-preview dark">
                            <div className="preview-header"></div>
                            <div className="preview-sidebar"></div>
                            <div className="preview-content"></div>
                          </div>
                          <span>Dark Mode</span>
                        </button>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Primary Color</label>
                      <div className="color-options">
                        {[
                          { value: '#2563EB', name: 'Blue' },
                          { value: '#10B981', name: 'Green' },
                          { value: '#F59E0B', name: 'Amber' },
                          { value: '#EF4444', name: 'Red' },
                          { value: '#8B5CF6', name: 'Purple' },
                        ].map((color) => (
                          <button
                            key={color.value}
                            className={`color-option ${appearanceSettings.primaryColor === color.value ? 'active' : ''}`}
                            onClick={() => setAppearanceSettings(prev => ({
                              ...prev,
                              primaryColor: color.value
                            }))}
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Sidebar Style</label>
                      <select
                        value={appearanceSettings.sidebarStyle}
                        onChange={(e) => setAppearanceSettings(prev => ({
                          ...prev,
                          sidebarStyle: e.target.value
                        }))}
                        className="form-input"
                      >
                        <option value="expanded">Expanded</option>
                        <option value="collapsed">Collapsed</option>
                        <option value="floating">Floating</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Font Family</label>
                      <select
                        value={appearanceSettings.fontFamily}
                        onChange={(e) => setAppearanceSettings(prev => ({
                          ...prev,
                          fontFamily: e.target.value
                        }))}
                        className="form-input"
                      >
                        <option value="Inter">Inter</option>
                        <option value="Poppins">Poppins</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Open Sans">Open Sans</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-actions">
                    <Button
                      variant="primary"
                      onClick={() => handleSaveSettings('appearance')}
                      loading={isLoading}
                    >
                      <Save size={16} />
                      Save Appearance Settings
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleResetSettings('appearance')}
                    >
                      Reset to Default
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>Security Settings</h2>
                  <p>Configure security and access control settings</p>
                </div>

                <div className="settings-form">
                  <div className="setting-toggle">
                    <div className="toggle-info">
                      <h4>Two-Factor Authentication</h4>
                      <p>Require 2FA for all admin accounts</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={securitySettings.require2FA}
                        onChange={(e) => setSecuritySettings(prev => ({
                          ...prev,
                          require2FA: e.target.checked
                        }))}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="setting-toggle">
                    <div className="toggle-info">
                      <h4>Auto Logout</h4>
                      <p>Automatically log out inactive users</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={securitySettings.autoLogout}
                        onChange={(e) => setSecuritySettings(prev => ({
                          ...prev,
                          autoLogout: e.target.checked
                        }))}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Session Timeout (minutes)</label>
                      <input
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings(prev => ({
                          ...prev,
                          sessionTimeout: parseInt(e.target.value)
                        }))}
                        className="form-input"
                        min={5}
                        max={480}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Max Login Attempts</label>
                      <input
                        type="number"
                        value={securitySettings.loginAttempts}
                        onChange={(e) => setSecuritySettings(prev => ({
                          ...prev,
                          loginAttempts: parseInt(e.target.value)
                        }))}
                        className="form-input"
                        min={1}
                        max={10}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password Policy</label>
                    <select
                      value={securitySettings.passwordPolicy}
                      onChange={(e) => setSecuritySettings(prev => ({
                        ...prev,
                        passwordPolicy: e.target.value
                      }))}
                      className="form-input"
                    >
                      <option value="basic">Basic (6+ characters)</option>
                      <option value="medium">Medium (8+ characters, mixed case)</option>
                      <option value="strong">Strong (12+ characters, mixed case + numbers + symbols)</option>
                    </select>
                  </div>

                  <div className="form-actions">
                    <Button
                      variant="primary"
                      onClick={() => handleSaveSettings('security')}
                      loading={isLoading}
                    >
                      <Save size={16} />
                      Save Security Settings
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleResetSettings('security')}
                    >
                      Reset to Default
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>Notification Settings</h2>
                  <p>Manage how and when you receive notifications</p>
                </div>

                <div className="settings-form">
                  <div className="setting-toggle">
                    <div className="toggle-info">
                      <h4>Email Notifications</h4>
                      <p>Receive notifications via email</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          emailNotifications: e.target.checked
                        }))}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="setting-toggle">
                    <div className="toggle-info">
                      <h4>Push Notifications</h4>
                      <p>Receive browser push notifications</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notificationSettings.pushNotifications}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          pushNotifications: e.target.checked
                        }))}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="notification-types">
                    <h4>Notification Types</h4>
                    
                    <div className="notification-options">
                      <label className="notification-option">
                        <input
                          type="checkbox"
                          checked={notificationSettings.studentEnrollment}
                          onChange={(e) => setNotificationSettings(prev => ({
                            ...prev,
                            studentEnrollment: e.target.checked
                          }))}
                        />
                        <span className="checkmark"></span>
                        <div className="option-info">
                          <span className="option-title">Student Enrollment</span>
                          <span className="option-description">When new students enroll in courses</span>
                        </div>
                      </label>

                      <label className="notification-option">
                        <input
                          type="checkbox"
                          checked={notificationSettings.assignmentSubmission}
                          onChange={(e) => setNotificationSettings(prev => ({
                            ...prev,
                            assignmentSubmission: e.target.checked
                          }))}
                        />
                        <span className="checkmark"></span>
                        <div className="option-info">
                          <span className="option-title">Assignment Submissions</span>
                          <span className="option-description">When students submit assignments</span>
                        </div>
                      </label>

                      <label className="notification-option">
                        <input
                          type="checkbox"
                          checked={notificationSettings.gradeUpdates}
                          onChange={(e) => setNotificationSettings(prev => ({
                            ...prev,
                            gradeUpdates: e.target.checked
                          }))}
                        />
                        <span className="checkmark"></span>
                        <div className="option-info">
                          <span className="option-title">Grade Updates</span>
                          <span className="option-description">When grades are posted or updated</span>
                        </div>
                      </label>

                      <label className="notification-option">
                        <input
                          type="checkbox"
                          checked={notificationSettings.systemAlerts}
                          onChange={(e) => setNotificationSettings(prev => ({
                            ...prev,
                            systemAlerts: e.target.checked
                          }))}
                        />
                        <span className="checkmark"></span>
                        <div className="option-info">
                          <span className="option-title">System Alerts</span>
                          <span className="option-description">Important system maintenance and updates</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="form-actions">
                    <Button
                      variant="primary"
                      onClick={() => handleSaveSettings('notifications')}
                      loading={isLoading}
                    >
                      <Save size={16} />
                      Save Notification Settings
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleResetSettings('notifications')}
                    >
                      Reset to Default
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Backup & Restore Settings */}
            {activeTab === 'backup' && (
              <div className="settings-section">
                <div className="section-header">
                  <h2>Backup & Restore</h2>
                  <p>Manage system backups and data restoration</p>
                </div>

                <div className="settings-form">
                  <div className="backup-actions">
                    <div className="backup-card">
                      <div className="backup-info">
                        <Database size={32} className="backup-icon" />
                        <div>
                          <h4>System Backup</h4>
                          <p>Create a complete backup of all system data</p>
                        </div>
                      </div>
                      <Button
                        variant="primary"
                        onClick={handleExportData}
                      >
                        <Download size={16} />
                        Export Backup
                      </Button>
                    </div>

                    <div className="backup-card">
                      <div className="backup-info">
                        <Upload size={32} className="backup-icon" />
                        <div>
                          <h4>Restore System</h4>
                          <p>Restore system from a previous backup file</p>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        onClick={handleImportData}
                      >
                        <Upload size={16} />
                        Import Backup
                      </Button>
                    </div>
                  </div>

                  <div className="backup-schedule">
                    <h4>Automatic Backups</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Backup Frequency</label>
                        <select className="form-input" defaultValue="weekly">
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="never">Never</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Retention Period</label>
                        <select className="form-input" defaultValue="30">
                          <option value="7">7 days</option>
                          <option value="30">30 days</option>
                          <option value="90">90 days</option>
                          <option value="365">1 year</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="backup-history">
                    <h4>Recent Backups</h4>
                    <div className="backup-list">
                      <div className="backup-item">
                        <div className="backup-details">
                          <span className="backup-name">backup_2024_01_15.zip</span>
                          <span className="backup-date">January 15, 2024 - 14:30</span>
                        </div>
                        <span className="backup-size">245 MB</span>
                      </div>
                      <div className="backup-item">
                        <div className="backup-details">
                          <span className="backup-name">backup_2024_01_08.zip</span>
                          <span className="backup-date">January 8, 2024 - 14:30</span>
                        </div>
                        <span className="backup-size">238 MB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

// Icon components
const Gear = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

export default Settings;