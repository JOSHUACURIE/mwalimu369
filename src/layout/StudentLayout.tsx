import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import StudentSidebar from '../components/student/StudentSidebar';
import StudentNavbar from '../components/student/StudentNavbar';
import './StudentLayout.css';

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="student-layout">
      <StudentSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="student-main">
        <StudentNavbar 
          onMenuClick={() => setSidebarOpen(true)}
          user={user}
        />
        
        <main className="student-content main-content-with-bottom-nav">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;