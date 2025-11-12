import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Mail, Phone, Edit, Trash2, BookOpen, Award } from 'lucide-react';
import AdminLayout from '../../layout/AdminLayout';
import Button from '../../components/ui/Button';
import { mockUsers } from '../../data/mockUsers';
import { type SafeUser } from '../../data/mockUsers';
import './ManageStudents.css';

const ManageStudents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Filter students from mock users
  const students = mockUsers.filter(user => user.role === 'student') as SafeUser[];

  // Filter students based on search term and active filter
  const filteredStudents = students.filter(student =>
    (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     student.enrolledSubjects?.some(subject =>
       subject.toLowerCase().includes(searchTerm.toLowerCase())
     )) &&
    (activeFilter === 'all' || 
     (activeFilter === 'active' && student.enrolledSubjects && student.enrolledSubjects.length > 0) ||
     (activeFilter === 'inactive' && (!student.enrolledSubjects || student.enrolledSubjects.length === 0)))
  );

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
  };

  const handleDeleteStudent = (studentId: string) => {
    
    console.log('Delete student:', studentId);
    alert(`Would delete student with ID: ${studentId}`);
  };

  const handleSendEmail = (studentEmail: string) => {
    window.open(`mailto:${studentEmail}`, '_blank');
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'excellent';
    if (performance >= 80) return 'good';
    if (performance >= 70) return 'average';
    return 'poor';
  };

  
  const mockPerformance = {
    'student-1': 88,
    'student-2': 92,
  };

  return (
    <AdminLayout>
      <div className="manage-students">
        {/* Header */}
        <div className="students-header">
          <div className="header-left">
            <h1 className="page-title">Manage Students</h1>
            <p className="page-subtitle">
              {students.length} students in the system
            </p>
          </div>
          <div className="header-actions">
            <Button variant="primary" size="lg">
              <Plus size={18} />
              Add New Student
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="students-controls">
          <div className="controls-left">
            <div className="search-container">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search students by name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-tabs">
              <button
                className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Students
              </button>
              <button
                className={`filter-tab ${activeFilter === 'active' ? 'active' : ''}`}
                onClick={() => setActiveFilter('active')}
              >
                Active
              </button>
              <button
                className={`filter-tab ${activeFilter === 'inactive' ? 'active' : ''}`}
                onClick={() => setActiveFilter('inactive')}
              >
                Inactive
              </button>
            </div>
          </div>

          <div className="controls-right">
            <Button variant="secondary" size="sm">
              <Filter size={16} />
              More Filters
            </Button>
            
            {selectedStudents.length > 0 && (
              <div className="bulk-actions">
                <span className="selected-count">
                  {selectedStudents.length} selected
                </span>
                <Button variant="error" size="sm">
                  <Trash2 size={16} />
                  Delete Selected
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Students Table */}
        <div className="students-table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th className="checkbox-cell">
                  <input
                    type="checkbox"
                    checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                    onChange={handleSelectAll}
                    className="checkbox"
                  />
                </th>
                <th className="student-cell">Student</th>
                <th className="subjects-cell">Enrolled Subjects</th>
                <th className="performance-cell">Performance</th>
                <th className="attendance-cell">Attendance</th>
                <th className="contact-cell">Contact</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="no-data">
                    <div className="no-data-content">
                      <p>No students found</p>
                      {searchTerm && (
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => setSearchTerm('')}
                        >
                          Clear search
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const performance = mockPerformance[student.id as keyof typeof mockPerformance] || 75;
                  const attendance = 92; // Mock attendance data

                  return (
                    <tr key={student.id} className="student-row">
                      <td className="checkbox-cell">
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleSelectStudent(student.id)}
                          className="checkbox"
                        />
                      </td>
                      
                      <td className="student-cell">
                        <div className="student-info">
                          <div className="student-avatar">
                            {student.profilePic ? (
                              <img src={student.profilePic} alt={student.name} />
                            ) : (
                              <div 
                                className="avatar-placeholder"
                                style={{ backgroundColor: '#10B981' }}
                              >
                                {student.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="student-details">
                            <span className="student-name">{student.name}</span>
                            <span className="student-email">{student.email}</span>
                            <span className="student-id">Admission No: {student.id}</span>
                          </div>
                        </div>
                      </td>
                      
                      <td className="subjects-cell">
                        <div className="subjects-list">
                          {student.enrolledSubjects?.map((subject, index) => (
                            <span key={index} className="subject-tag">
                              <BookOpen size={12} />
                              {subject}
                            </span>
                          )) || (
                            <span className="no-subjects">No subjects enrolled</span>
                          )}
                        </div>
                      </td>
                      
                      <td className="performance-cell">
                        <div className="performance-indicator">
                          <div className="performance-bar">
                            <div 
                              className={`performance-fill performance-${getPerformanceColor(performance)}`}
                              style={{ width: `${performance}%` }}
                            ></div>
                          </div>
                          <span className="performance-value">{performance}%</span>
                        </div>
                      </td>
                      
                      <td className="attendance-cell">
                        <div className="attendance-indicator">
                          <div className="attendance-bar">
                            <div 
                              className="attendance-fill"
                              style={{ width: `${attendance}%` }}
                            ></div>
                          </div>
                          <span className="attendance-value">{attendance}%</span>
                        </div>
                      </td>
                      
                      <td className="contact-cell">
                        <div className="contact-actions">
                          <button
                            className="icon-button"
                            onClick={() => handleSendEmail(student.email)}
                            title="Send Email"
                          >
                            <Mail size={16} />
                          </button>
                          <button
                            className="icon-button"
                            title="Call"
                            onClick={() => console.log('Call:', student.email)}
                          >
                            <Phone size={16} />
                          </button>
                        </div>
                      </td>
                      
                      <td className="actions-cell">
                        <div className="actions-menu">
                          <button className="icon-button">
                            <MoreVertical size={16} />
                          </button>
                          <div className="dropdown-menu">
                            <button className="dropdown-item">
                              <Edit size={16} />
                              Edit Profile
                            </button>
                            <button className="dropdown-item">
                              <Award size={16} />
                              View Progress
                            </button>
                            <button className="dropdown-item">
                              <Mail size={16} />
                              Send Message
                            </button>
                            <button 
                              className="dropdown-item delete"
                              onClick={() => handleDeleteStudent(student.id)}
                            >
                              <Trash2 size={16} />
                              Remove Student
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Stats Summary */}
        <div className="students-stats">
          <div className="stat-card">
            <h3>{students.length}</h3>
            <p>Total Students</p>
          </div>
          <div className="stat-card">
            <h3>{students.filter(s => s.enrolledSubjects && s.enrolledSubjects.length > 0).length}</h3>
            <p>Active Students</p>
          </div>
          <div className="stat-card">
            <h3>86%</h3>
            <p>Average Performance</p>
          </div>
          <div className="stat-card">
            <h3>94%</h3>
            <p>Average Attendance</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageStudents;