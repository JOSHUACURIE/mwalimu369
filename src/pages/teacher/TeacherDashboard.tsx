import React from 'react';
import { useAuth } from '../../context/AuthContext';

const TeacherDashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.name}</span>
          <button onClick={logout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </header>
      <main>
        <p>Teacher dashboard content coming soon...</p>
      </main>
    </div>
  );
};

export default TeacherDashboard;