import React, { useState } from 'react';
import { Search, Filter, Download, Eye, BarChart3, Calendar, Users, FileText, MoreVertical } from 'lucide-react';
import AdminLayout from '../../layout/AdminLayout';
import Button from '../../components/ui/Button';
import { mockAssignments } from '../../data/mockAssignments';
import './ManageAssignments.css';

const ManageAssignments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'draft'>('all');
  const [subjectFilter, setSubjectFilter] = useState('all');

  // Get unique subjects for filter
  const subjects = ['all', ...new Set(mockAssignments.map(assignment => assignment.subject))];

  // Filter assignments
  const filteredAssignments = mockAssignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.teacherName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    const matchesSubject = subjectFilter === 'all' || assignment.subject === subjectFilter;

    return matchesSearch && matchesStatus && matchesSubject;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'primary';
      case 'draft': return 'warning';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'completed': return 'Completed';
      case 'draft': return 'Draft';
      default: return status;
    }
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const timeDiff = date.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) return { text: 'Overdue', color: 'error' };
    if (daysDiff === 0) return { text: 'Due today', color: 'warning' };
    if (daysDiff === 1) return { text: 'Due tomorrow', color: 'warning' };
    if (daysDiff <= 7) return { text: `Due in ${daysDiff} days`, color: 'info' };
    return { text: date.toLocaleDateString(), color: 'secondary' };
  };

  const handleViewDetails = (assignmentId: string) => {
    console.log('View assignment details:', assignmentId);
    // In real app, this would navigate to assignment details page
    alert(`Viewing details for assignment: ${assignmentId}`);
  };

  const handleDownloadReport = () => {
    // In real app, this would generate and download a report
    alert('Downloading assignments report...');
  };

  const getSubmissionRate = (assignment: typeof mockAssignments[0]) => {
    const totalStudents = 35; // Mock total students
    return Math.round((assignment.submissionCount / totalStudents) * 100);
  };

  return (
    <AdminLayout>
      <div className="manage-assignments">
        {/* Header */}
        <div className="assignments-header">
          <div className="header-left">
            <h1 className="page-title">Manage Assignments</h1>
            <p className="page-subtitle">
              Monitor and manage all assignments across the system
            </p>
          </div>
          <div className="header-actions">
            <Button variant="primary" onClick={handleDownloadReport}>
              <Download size={18} />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="assignments-stats">
          <div className="stat-card">
            <div className="stat-icon primary">
              <FileText size={24} />
            </div>
            <div className="stat-content">
              <h3>{mockAssignments.length}</h3>
              <p>Total Assignments</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon success">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <h3>{mockAssignments.filter(a => a.status === 'active').length}</h3>
              <p>Active Assignments</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon warning">
              <BarChart3 size={24} />
            </div>
            <div className="stat-content">
              <h3>
                {Math.round(
                  mockAssignments
                    .filter(a => a.averageGrade)
                    .reduce((acc, curr) => acc + (curr.averageGrade || 0), 0) /
                  mockAssignments.filter(a => a.averageGrade).length
                )}%
              </h3>
              <p>Average Grade</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon info">
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <h3>{mockAssignments.filter(a => new Date(a.dueDate) < new Date()).length}</h3>
              <p>Overdue Assignments</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="assignments-controls">
          <div className="controls-left">
            <div className="search-container">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search assignments by title, description, or teacher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-group">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
              </select>

              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="filter-select"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="controls-right">
            <Button variant="secondary" size="sm">
              <Filter size={16} />
              More Filters
            </Button>
          </div>
        </div>

        {/* Assignments Grid */}
        <div className="assignments-grid">
          {filteredAssignments.length === 0 ? (
            <div className="no-data">
              <FileText size={48} className="no-data-icon" />
              <p>No assignments found</p>
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
          ) : (
            filteredAssignments.map((assignment) => {
              const dueDateInfo = formatDueDate(assignment.dueDate);
              const submissionRate = getSubmissionRate(assignment);

              return (
                <div key={assignment.id} className="assignment-card">
                  <div className="card-header">
                    <div className="assignment-title-section">
                      <h3 className="assignment-title">{assignment.title}</h3>
                      <span className={`status-badge status-${assignment.status}`}>
                        {getStatusText(assignment.status)}
                      </span>
                    </div>
                    
                    <div className="actions-menu">
                      <button className="icon-button">
                        <MoreVertical size={16} />
                      </button>
                      <div className="dropdown-menu">
                        <button 
                          className="dropdown-item"
                          onClick={() => handleViewDetails(assignment.id)}
                        >
                          <Eye size={16} />
                          View Details
                        </button>
                        <button className="dropdown-item">
                          <BarChart3 size={16} />
                          View Analytics
                        </button>
                        <button className="dropdown-item">
                          <Download size={16} />
                          Download Submissions
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="assignment-description">{assignment.description}</p>

                  <div className="assignment-meta">
                    <div className="meta-item">
                      <Users size={14} />
                      <span>{assignment.teacherName}</span>
                    </div>
                    <div className="meta-item">
                      <FileText size={14} />
                      <span>{assignment.subject}</span>
                    </div>
                  </div>

                  <div className="assignment-stats">
                    <div className="stat">
                      <span className="stat-value">{assignment.maxPoints}</span>
                      <span className="stat-label">Max Points</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{assignment.submissionCount}</span>
                      <span className="stat-label">Submissions</span>
                    </div>
                    {assignment.averageGrade && (
                      <div className="stat">
                        <span className="stat-value">{assignment.averageGrade}%</span>
                        <span className="stat-label">Avg Grade</span>
                      </div>
                    )}
                  </div>

                  <div className="assignment-progress">
                    <div className="progress-header">
                      <span className="progress-label">Submission Rate</span>
                      <span className="progress-value">{submissionRate}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${submissionRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="card-footer">
                    <div className="due-date">
                      <Calendar size={14} />
                      <span className={`due-text ${dueDateInfo.color}`}>
                        {dueDateInfo.text}
                      </span>
                    </div>
                    
                    {assignment.attachments && assignment.attachments.length > 0 && (
                      <div className="attachments">
                        <FileText size={14} />
                        <span>{assignment.attachments.length} files</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageAssignments;