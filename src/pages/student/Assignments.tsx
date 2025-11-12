import React, { useState } from 'react';
import { FileText, Calendar, Clock, AlertCircle, CheckCircle, Play, Download, Filter, Search } from 'lucide-react';
import StudentLayout from '../../layout/StudentLayout';
import Button from '../../components/ui/Button';
import { mockAssignments } from '../../data/mockAssignments';
import './Assignments.css';

const Assignments: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'submitted' | 'graded' | 'overdue'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter assignments based on active filter and search term
  const filteredAssignments = mockAssignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const now = new Date();
    const dueDate = new Date(assignment.dueDate);
    const isOverdue = dueDate < now && assignment.status !== 'completed';
    const isSubmitted = assignment.submissionCount > 0; // Mock submission status

    // Apply status filter
    let matchesFilter = true;
    switch (activeFilter) {
      case 'pending':
        matchesFilter = !isSubmitted && !isOverdue;
        break;
      case 'submitted':
        matchesFilter = isSubmitted && assignment.status !== 'completed';
        break;
      case 'graded':
        matchesFilter = assignment.status === 'completed';
        break;
      case 'overdue':
        matchesFilter = isOverdue;
        break;
      default:
        matchesFilter = true;
    }

    return matchesSearch && matchesFilter;
  });

  const getStatusInfo = (assignment: typeof mockAssignments[0]) => {
    const now = new Date();
    const dueDate = new Date(assignment.dueDate);
    const timeDiff = dueDate.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (assignment.status === 'completed') {
      return { type: 'completed', text: 'Graded', color: 'success', icon: CheckCircle };
    }

    if (assignment.submissionCount > 0) {
      return { type: 'submitted', text: 'Submitted', color: 'info', icon: CheckCircle };
    }

    if (daysDiff < 0) {
      return { type: 'overdue', text: 'Overdue', color: 'error', icon: AlertCircle };
    }

    if (daysDiff === 0) {
      return { type: 'due-today', text: 'Due today', color: 'warning', icon: Clock };
    }

    if (daysDiff <= 3) {
      return { type: 'due-soon', text: `Due in ${daysDiff} days`, color: 'warning', icon: Clock };
    }

    return { type: 'pending', text: `Due ${dueDate.toLocaleDateString()}`, color: 'secondary', icon: Calendar };
  };

  const getPriorityColor = (daysUntilDue: number) => {
    if (daysUntilDue < 0) return 'error';
    if (daysUntilDue === 0) return 'warning';
    if (daysUntilDue <= 3) return 'warning';
    return 'secondary';
  };

  const handleStartAssignment = (assignmentId: string) => {
    // In real app, this would navigate to assignment submission page
    console.log('Start assignment:', assignmentId);
    alert(`Starting assignment: ${assignmentId}`);
  };

  const handleViewAssignment = (assignmentId: string) => {
    // In real app, this would navigate to assignment details
    console.log('View assignment:', assignmentId);
    alert(`Viewing assignment: ${assignmentId}`);
  };

  const handleDownloadMaterials = (assignmentId: string) => {
    // In real app, this would download assignment materials
    console.log('Download materials for:', assignmentId);
    alert(`Downloading materials for assignment: ${assignmentId}`);
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const timeDiff = due.getTime() - now.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  return (
    <StudentLayout>
      <div className="assignments">
        {/* Header */}
        <div className="assignments-header">
          <div className="header-left">
            <h1 className="page-title">My Assignments</h1>
            <p className="page-subtitle">
              Manage your assignments and track submission deadlines
            </p>
          </div>
          <div className="header-actions">
            <Button variant="primary">
              <FileText size={18} />
              Submit Work
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
            <div className="stat-icon warning">
              <Clock size={24} />
            </div>
            <div className="stat-content">
              <h3>
                {mockAssignments.filter(assignment => {
                  const daysUntilDue = getDaysUntilDue(assignment.dueDate);
                  return daysUntilDue <= 3 && daysUntilDue >= 0;
                }).length}
              </h3>
              <p>Due Soon</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon error">
              <AlertCircle size={24} />
            </div>
            <div className="stat-content">
              <h3>
                {mockAssignments.filter(assignment => {
                  const daysUntilDue = getDaysUntilDue(assignment.dueDate);
                  return daysUntilDue < 0 && assignment.status !== 'completed';
                }).length}
              </h3>
              <p>Overdue</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon success">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <h3>
                {mockAssignments.filter(assignment => assignment.status === 'completed').length}
              </h3>
              <p>Completed</p>
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
                placeholder="Search assignments by title, subject, or description..."
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
                All Assignments
              </button>
              <button
                className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveFilter('pending')}
              >
                Pending
              </button>
              <button
                className={`filter-tab ${activeFilter === 'submitted' ? 'active' : ''}`}
                onClick={() => setActiveFilter('submitted')}
              >
                Submitted
              </button>
              <button
                className={`filter-tab ${activeFilter === 'graded' ? 'active' : ''}`}
                onClick={() => setActiveFilter('graded')}
              >
                Graded
              </button>
              <button
                className={`filter-tab ${activeFilter === 'overdue' ? 'active' : ''}`}
                onClick={() => setActiveFilter('overdue')}
              >
                Overdue
              </button>
            </div>
          </div>

          <div className="controls-right">
            <Button variant="secondary" size="sm">
              <Filter size={16} />
              More Filters
            </Button>
          </div>
        </div>

        {/* Assignments List */}
        <div className="assignments-list">
          {filteredAssignments.length === 0 ? (
            <div className="no-assignments">
              <FileText size={48} className="no-assignments-icon" />
              <h3>No assignments found</h3>
              <p>You don't have any assignments matching the current filter.</p>
              <Button 
                variant="primary"
                onClick={() => {
                  setActiveFilter('all');
                  setSearchTerm('');
                }}
              >
                View All Assignments
              </Button>
            </div>
          ) : (
            filteredAssignments.map((assignment) => {
              const statusInfo = getStatusInfo(assignment);
              const StatusIcon = statusInfo.icon;
              const daysUntilDue = getDaysUntilDue(assignment.dueDate);

              return (
                <div key={assignment.id} className="assignment-card">
                  <div className="assignment-header">
                    <div className="assignment-title-section">
                      <h3 className="assignment-title">{assignment.title}</h3>
                      <span className={`status-badge status-${statusInfo.type}`}>
                        <StatusIcon size={14} />
                        {statusInfo.text}
                      </span>
                    </div>
                    
                    <div className="assignment-points">
                      <span className="points-value">{assignment.maxPoints}</span>
                      <span className="points-label">points</span>
                    </div>
                  </div>

                  <p className="assignment-description">{assignment.description}</p>

                  <div className="assignment-meta">
                    <div className="meta-item">
                      <FileText size={14} />
                      <span>{assignment.subject}</span>
                    </div>
                    <div className="meta-item">
                      <Clock size={14} />
                      <span>Due: {formatDueDate(assignment.dueDate)}</span>
                    </div>
                    <div className="meta-item">
                      <span>Teacher: {assignment.teacherName}</span>
                    </div>
                  </div>

                  {assignment.attachments && assignment.attachments.length > 0 && (
                    <div className="assignment-attachments">
                      <span className="attachments-label">Materials:</span>
                      <div className="attachments-list">
                        {assignment.attachments.map((attachment, index) => (
                          <button
                            key={index}
                            className="attachment-item"
                            onClick={() => handleDownloadMaterials(assignment.id)}
                          >
                            <Download size={12} />
                            {attachment}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="assignment-footer">
                    <div className="assignment-info">
                      {assignment.averageGrade && (
                        <div className="grade-info">
                          <span className="grade-label">Average Grade:</span>
                          <span className="grade-value">{assignment.averageGrade}%</span>
                        </div>
                      )}
                      <div className="submission-info">
                        <span className="submission-label">Submissions:</span>
                        <span className="submission-value">{assignment.submissionCount}</span>
                      </div>
                    </div>

                    <div className="assignment-actions">
                      {statusInfo.type === 'completed' ? (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleViewAssignment(assignment.id)}
                        >
                          <FileText size={16} />
                          View Grade
                        </Button>
                      ) : statusInfo.type === 'submitted' ? (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleViewAssignment(assignment.id)}
                        >
                          <Clock size={16} />
                          View Submission
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleStartAssignment(assignment.id)}
                        >
                          <Play size={16} />
                          Start Assignment
                        </Button>
                      )}
                      
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleViewAssignment(assignment.id)}
                      >
                        <FileText size={16} />
                        Details
                      </Button>
                    </div>
                  </div>

                  {/* Progress bar for time remaining */}
                  {(statusInfo.type === 'pending' || statusInfo.type === 'due-soon' || statusInfo.type === 'due-today') && (
                    <div className="time-progress">
                      <div className="progress-header">
                        <span className="progress-label">Time remaining</span>
                        <span className="progress-value">{Math.abs(daysUntilDue)} days</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className={`progress-fill priority-${getPriorityColor(daysUntilDue)}`}
                          style={{ 
                            width: `${Math.max(0, Math.min(100, (1 - (daysUntilDue / 14)) * 100))}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Quick Tips */}
        <div className="assignment-tips">
          <h3>Assignment Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <Clock size={20} />
              <h4>Start Early</h4>
              <p>Begin assignments well before the due date to avoid last-minute stress.</p>
            </div>
            <div className="tip-card">
              <FileText size={20} />
              <h4>Read Instructions</h4>
              <p>Carefully review all assignment requirements and grading criteria.</p>
            </div>
            <div className="tip-card">
              <CheckCircle size={20} />
              <h4>Review Work</h4>
              <p>Always proofread and double-check your submissions before sending.</p>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Assignments;