import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Mail, Phone, Edit, Trash2 } from 'lucide-react';
import AdminLayout from '../../layout/AdminLayout';
import Button from '../../components/ui/Button';
import { mockUsers } from '../../data/mockUsers';
import { type SafeUser } from '../../data/mockUsers';
import './ManageTeachers.css';

const ManageTeachers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);

  // Filter teachers from mock users
  const teachers = mockUsers.filter(user => user.role === 'teacher') as SafeUser[];

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.assignedSubjects?.some(subject =>
      subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSelectTeacher = (teacherId: string) => {
    setSelectedTeachers(prev =>
      prev.includes(teacherId)
        ? prev.filter(id => id !== teacherId)
        : [...prev, teacherId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTeachers.length === filteredTeachers.length) {
      setSelectedTeachers([]);
    } else {
      setSelectedTeachers(filteredTeachers.map(teacher => teacher.id));
    }
  };

  const handleDeleteTeacher = (teacherId: string) => {
    
    console.log('Delete teacher:', teacherId);
    alert(`Would delete teacher with ID: ${teacherId}`);
  };

  const handleSendEmail = (teacherEmail: string) => {
    window.open(`mailto:${teacherEmail}`, '_blank');
  };

  return (
    <AdminLayout>
      <div className="manage-teachers">
        {/* Header */}
        <div className="teachers-header">
          <div className="header-left">
            <h1 className="page-title">Manage Teachers</h1>
            <p className="page-subtitle">
              {teachers.length} teachers in the system
            </p>
          </div>
          <div className="header-actions">
            <Button variant="primary" size="lg">
              <Plus size={18} />
              Add New Teacher
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="teachers-controls">
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search teachers by name, email, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="controls-right">
            <Button variant="secondary" size="sm">
              <Filter size={16} />
              Filter
            </Button>
            
            {selectedTeachers.length > 0 && (
              <div className="bulk-actions">
                <span className="selected-count">
                  {selectedTeachers.length} selected
                </span>
                <Button variant="error" size="sm">
                  <Trash2 size={16} />
                  Delete Selected
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Teachers Table */}
        <div className="teachers-table-container">
          <table className="teachers-table">
            <thead>
              <tr>
                <th className="checkbox-cell">
                  <input
                    type="checkbox"
                    checked={selectedTeachers.length === filteredTeachers.length && filteredTeachers.length > 0}
                    onChange={handleSelectAll}
                    className="checkbox"
                  />
                </th>
                <th className="teacher-cell">Teacher</th>
                <th className="subjects-cell">Assigned Subjects</th>
                <th className="contact-cell">Contact</th>
                <th className="students-cell">Students</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="no-data">
                    <div className="no-data-content">
                      <p>No teachers found</p>
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
                filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="teacher-row">
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={selectedTeachers.includes(teacher.id)}
                        onChange={() => handleSelectTeacher(teacher.id)}
                        className="checkbox"
                      />
                    </td>
                    
                    <td className="teacher-cell">
                      <div className="teacher-info">
                        <div className="teacher-avatar">
                          {teacher.profilePic ? (
                            <img src={teacher.profilePic} alt={teacher.name} />
                          ) : (
                            <div 
                              className="avatar-placeholder"
                              style={{ backgroundColor: '#3B82F6' }}
                            >
                              {teacher.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="teacher-details">
                          <span className="teacher-name">{teacher.name}</span>
                          <span className="teacher-email">{teacher.email}</span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="subjects-cell">
                      <div className="subjects-list">
                        {teacher.assignedSubjects?.map((subject, index) => (
                          <span key={index} className="subject-tag">
                            {subject}
                          </span>
                        )) || (
                          <span className="no-subjects">No subjects assigned</span>
                        )}
                      </div>
                    </td>
                    
                    <td className="contact-cell">
                      <div className="contact-actions">
                        <button
                          className="icon-button"
                          onClick={() => handleSendEmail(teacher.email)}
                          title="Send Email"
                        >
                          <Mail size={16} />
                        </button>
                        <button
                          className="icon-button"
                          title="Call"
                          onClick={() => console.log('Call:', teacher.email)}
                        >
                          <Phone size={16} />
                        </button>
                      </div>
                    </td>
                    
                    <td className="students-cell">
                      <div className="students-count">
                        <span className="count">24</span>
                        <span className="label">students</span>
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
                            <Mail size={16} />
                            Send Message
                          </button>
                          <button 
                            className="dropdown-item delete"
                            onClick={() => handleDeleteTeacher(teacher.id)}
                          >
                            <Trash2 size={16} />
                            Remove Teacher
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Stats Summary */}
        <div className="teachers-stats">
          <div className="stat-card">
            <h3>{teachers.length}</h3>
            <p>Total Teachers</p>
          </div>
          <div className="stat-card">
            <h3>12</h3>
            <p>Active This Week</p>
          </div>
          <div className="stat-card">
            <h3>98%</h3>
            <p>Response Rate</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageTeachers;