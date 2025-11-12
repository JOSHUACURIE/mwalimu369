import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Users, BookOpen, Clock, Edit, Trash2, Eye } from 'lucide-react';
import AdminLayout from '../../layout/AdminLayout';
import Button from '../../components/ui/Button';
import { mockCourses } from '../../data/mockCourses';
import { mockUsers } from '../../data/mockUsers';
import './ManageSubjects.css';

interface SubjectStats {
  totalStudents: number;
  totalTeachers: number;
  completionRate: number;
  averageGrade: number;
}

const ManageSubjects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'archived'>('all');

  // Calculate subject statistics
  const getSubjectStats = (courseId: string): SubjectStats => {
    const course = mockCourses.find(c => c.id === courseId);
    const teacher = mockUsers.find(u => u.id === course?.teacherId);
    
    return {
      totalStudents: course?.students?.length || 0,
      totalTeachers: teacher ? 1 : 0,
      completionRate: Math.floor(Math.random() * 30) + 70, // Mock data
      averageGrade: Math.floor(Math.random() * 20) + 75, // Mock data
    };
  };

  // Filter subjects based on search term and active filter
  const filteredSubjects = mockCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.teacherId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectSubject = (subjectId: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };



  const handleDeleteSubject = (subjectId: string) => {
    // In a real app, this would be an API call
    console.log('Delete subject:', subjectId);
    alert(`Would delete subject with ID: ${subjectId}`);
  };

  const handleArchiveSubject = (subjectId: string) => {
    // In a real app, this would be an API call
    console.log('Archive subject:', subjectId);
    alert(`Would archive subject with ID: ${subjectId}`);
  };

  const getTeacherName = (teacherId: string) => {
    const teacher = mockUsers.find(u => u.id === teacherId);
    return teacher?.name || 'Unknown Teacher';
  };

  const getEnrollmentProgress = (studentCount: number) => {
    const maxStudents = 50; // Mock max capacity
    return (studentCount / maxStudents) * 100;
  };

  return (
    <AdminLayout>
      <div className="manage-subjects">
        {/* Header */}
        <div className="subjects-header">
          <div className="header-left">
            <h1 className="page-title">Manage Subjects</h1>
            <p className="page-subtitle">
              {mockCourses.length} subjects in the curriculum
            </p>
          </div>
          <div className="header-actions">
            <Button variant="primary" size="lg">
              <Plus size={18} />
              Add New Subject
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="subjects-controls">
          <div className="controls-left">
            <div className="search-container">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search subjects by title, description, or teacher..."
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
                All Subjects
              </button>
              <button
                className={`filter-tab ${activeFilter === 'active' ? 'active' : ''}`}
                onClick={() => setActiveFilter('active')}
              >
                Active
              </button>
              <button
                className={`filter-tab ${activeFilter === 'archived' ? 'active' : ''}`}
                onClick={() => setActiveFilter('archived')}
              >
                Archived
              </button>
            </div>
          </div>

          <div className="controls-right">
            <Button variant="secondary" size="sm">
              <Filter size={16} />
              More Filters
            </Button>
            
            {selectedSubjects.length > 0 && (
              <div className="bulk-actions">
                <span className="selected-count">
                  {selectedSubjects.length} selected
                </span>
                <Button variant="error" size="sm">
                  <Trash2 size={16} />
                  Delete Selected
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="subjects-grid">
          {filteredSubjects.length === 0 ? (
            <div className="no-data">
              <div className="no-data-content">
                <BookOpen size={48} className="no-data-icon" />
                <p>No subjects found</p>
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
            </div>
          ) : (
            filteredSubjects.map((subject) => {
              const stats = getSubjectStats(subject.id);
              const teacherName = getTeacherName(subject.teacherId);
              const enrollmentProgress = getEnrollmentProgress(stats.totalStudents);

              return (
                <div key={subject.id} className="subject-card">
                  <div className="card-header">
                    <div className="subject-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedSubjects.includes(subject.id)}
                        onChange={() => handleSelectSubject(subject.id)}
                        className="checkbox"
                      />
                    </div>
                    
                    <div className="subject-thumbnail">
                      {subject.thumbnail ? (
                        <img src={subject.thumbnail} alt={subject.title} />
                      ) : (
                        <div className="thumbnail-placeholder">
                          <BookOpen size={24} />
                        </div>
                      )}
                    </div>

                    <div className="actions-menu">
                      <button className="icon-button">
                        <MoreVertical size={16} />
                      </button>
                      <div className="dropdown-menu">
                        <button className="dropdown-item">
                          <Eye size={16} />
                          View Details
                        </button>
                        <button className="dropdown-item">
                          <Edit size={16} />
                          Edit Subject
                        </button>
                        <button 
                          className="dropdown-item"
                          onClick={() => handleArchiveSubject(subject.id)}
                        >
                          <Clock size={16} />
                          Archive Subject
                        </button>
                        <button 
                          className="dropdown-item delete"
                          onClick={() => handleDeleteSubject(subject.id)}
                        >
                          <Trash2 size={16} />
                          Delete Subject
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card-content">
                    <h3 className="subject-title">{subject.title}</h3>
                    <p className="subject-description">{subject.description}</p>
                    
                    <div className="subject-teacher">
                      <Users size={14} />
                      <span>Teacher: {teacherName}</span>
                    </div>

                    <div className="subject-meta">
                      <div className="meta-item">
                        <Clock size={14} />
                        <span>{subject.lessonsCount} lessons</span>
                      </div>
                      <div className="meta-item">
                        <BookOpen size={14} />
                        <span>{stats.totalStudents} students</span>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="enrollment-progress">
                      <div className="progress-header">
                        <span className="progress-label">Enrollment</span>
                        <span className="progress-value">{stats.totalStudents}/50</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${enrollmentProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="subject-stats">
                      <div className="stat">
                        <span className="stat-value">{stats.completionRate}%</span>
                        <span className="stat-label">Completion</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">{stats.averageGrade}%</span>
                        <span className="stat-label">Avg Grade</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Stats Summary */}
        <div className="subjects-stats">
          <div className="stat-card">
            <h3>{mockCourses.length}</h3>
            <p>Total Subjects</p>
          </div>
          <div className="stat-card">
            <h3>{mockUsers.filter(u => u.role === 'teacher').length}</h3>
            <p>Assigned Teachers</p>
          </div>
          <div className="stat-card">
            <h3>
              {mockCourses.reduce((total, course) => total + course.lessonsCount, 0)}
            </h3>
            <p>Total Lessons</p>
          </div>
          <div className="stat-card">
            <h3>
              {mockCourses.reduce((total, course) => total + (course.students?.length || 0), 0)}
            </h3>
            <p>Total Enrollments</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageSubjects;