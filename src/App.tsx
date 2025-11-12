import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import ManageTeachers from './pages/admin/ManageTeachers';
import ManageStudents from './pages/admin/ManageStudents';
import ManageSubjects from './pages/admin/ManageSubjects';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';
import ManageAssignments from './pages/admin/ManageAssignments';
import MyCourses from './pages/student/MyCourses';
import Assignments from './pages/student/Assignments';
import VideoLessons from './pages/student/VideoLessons';
import Chat from './pages/student/Chat';
import './index.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes with role-based access */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            <Route path="/admin/students" element={<ManageStudents />} />
            <Route path="/admin/students" element={<ManageStudents />} />
            <Route path="/student/courses" element={<MyCourses />} />
            <Route path="/student/chat" element={<Chat />} />
            <Route path="/student/assignments" element={<Assignments />} />
            <Route path="/student/video-lessons" element={<VideoLessons />} />
            <Route 
              path="/teacher/*" 
              element={
                <ProtectedRoute requiredRole="teacher">
                  <TeacherDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/admin/assignments" element={<ManageAssignments />} />
            <Route path="/admin/subjects" element={<ManageSubjects />} />
            <Route path="/admin/teachers" element={<ManageTeachers />} />
            <Route 
              path="/student/*" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Default redirect based on user role */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/dashboard" element={<DashboardRedirect />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

// Component to redirect users to their respective dashboards
const DashboardRedirect: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (user.role === 'teacher') {
    return <Navigate to="/teacher/dashboard" replace />;
  } else {
    return <Navigate to="/student/dashboard" replace />;
  }
};

export default App;