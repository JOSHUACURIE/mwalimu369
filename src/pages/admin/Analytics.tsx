import React, { useState } from 'react';
import { TrendingUp, Users, BookOpen, Award, Clock, Download, Calendar, Filter } from 'lucide-react';
import AdminLayout from '../../layout/AdminLayout';
import Button from '../../components/ui/Button';
import { mockUsers } from '../../data/mockUsers';
import { mockCourses } from '../../data/mockCourses';
import './Analytics.css';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'teachers' | 'subjects'>('overview');

  // Calculate statistics
  const totalStudents = mockUsers.filter(user => user.role === 'student').length;

  const totalSubjects = mockCourses.length;

  
  // Mock analytics data
  const enrollmentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Students',
        data: [45, 52, 38, 65, 72, 58],
        color: '#3B82F6'
      },
      {
        label: 'Total Students',
        data: [120, 172, 210, 275, 347, 405],
        color: '#10B981'
      }
    ]
  };

  const performanceData = {
    labels: ['Mathematics', 'Physics', 'English', 'Biology', 'Chemistry'],
    datasets: [
      {
        label: 'Average Grade',
        data: [85, 78, 92, 81, 76],
        color: '#8B5CF6'
      },
      {
        label: 'Completion Rate',
        data: [88, 72, 95, 79, 70],
        color: '#F59E0B'
      }
    ]
  };

  const topPerformers = [
    { name: 'Vidah Limaya', subject: 'Mathematics', grade: 96, improvement: '+12%' },
    { name: 'Bathseba Kerubo', subject: 'English', grade: 94, improvement: '+8%' },
    { name: 'Warioba Mitchelle', subject: 'Physics', grade: 92, improvement: '+15%' },
    { name: 'Scovia Divai', subject: 'Biology', grade: 91, improvement: '+5%' },
    { name: 'Angela Mitchelle', subject: 'Chemistry', grade: 89, improvement: '+11%' }
  ];



  const teacherPerformance = mockUsers
    .filter(user => user.role === 'teacher')
    .map(teacher => ({
      name: teacher.name,
      subjects: teacher.assignedSubjects?.length || 0,
      students: 24, // Mock data
      rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
      responseTime: `${Math.floor(Math.random() * 12) + 4}h`
    }));

  const exportReport = () => {
    // In real app, this would generate and download a report
    alert('Exporting analytics report...');
  };

  return (
    <AdminLayout>
      <div className="analytics">
        {/* Header */}
        <div className="analytics-header">
          <div className="header-left">
            <h1 className="page-title">Analytics Dashboard</h1>
            <p className="page-subtitle">
              Comprehensive insights into your LMS performance
            </p>
          </div>
          <div className="header-actions">
            <div className="time-filter">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="time-select"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            <Button variant="secondary" size="sm" onClick={exportReport}>
              <Download size={16} />
              Export Report
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="analytics-tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <TrendingUp size={16} />
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            <Users size={16} />
            Students
          </button>
          <button 
            className={`tab ${activeTab === 'teachers' ? 'active' : ''}`}
            onClick={() => setActiveTab('teachers')}
          >
            <Users size={16} />
            Teachers
          </button>
          <button 
            className={`tab ${activeTab === 'subjects' ? 'active' : ''}`}
            onClick={() => setActiveTab('subjects')}
          >
            <BookOpen size={16} />
            Subjects
          </button>
        </div>

        {/* Key Metrics */}
        <div className="metrics-grid">
          <div className="metric-card primary">
            <div className="metric-icon">
              <Users size={24} />
            </div>
            <div className="metric-content">
              <h3>{totalStudents}</h3>
              <p>Total Students</p>
              <span className="metric-trend positive">+12% this month</span>
            </div>
          </div>

          <div className="metric-card success">
            <div className="metric-icon">
              <BookOpen size={24} />
            </div>
            <div className="metric-content">
              <h3>{totalSubjects}</h3>
              <p>Active Subjects</p>
              <span className="metric-trend positive">+3 new</span>
            </div>
          </div>

          <div className="metric-card warning">
            <div className="metric-icon">
              <Award size={24} />
            </div>
            <div className="metric-content">
              <h3>86%</h3>
              <p>Average Performance</p>
              <span className="metric-trend positive">+5% improvement</span>
            </div>
          </div>

          <div className="metric-card info">
            <div className="metric-icon">
              <Clock size={24} />
            </div>
            <div className="metric-content">
              <h3>94%</h3>
              <p>Attendance Rate</p>
              <span className="metric-trend positive">+2% from last month</span>
            </div>
          </div>
        </div>

        {/* Charts and Detailed Analytics */}
        <div className="analytics-content">
          {/* Enrollment Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Student Enrollment Trend</h3>
              <Button variant="secondary" size="sm">
                <Filter size={14} />
                Filter
              </Button>
            </div>
            <div className="chart-container">
              <div className="mock-chart">
                <div className="chart-bars">
                  {enrollmentData.datasets[0].data.map((value, index) => (
                    <div key={index} className="chart-bar-group">
                      <div 
                        className="chart-bar new-students"
                        style={{ height: `${(value / 80) * 100}%` }}
                        title={`${enrollmentData.labels[index]}: ${value} new students`}
                      ></div>
                      <div 
                        className="chart-bar total-students"
                        style={{ height: `${(enrollmentData.datasets[1].data[index] / 500) * 100}%` }}
                        title={`${enrollmentData.labels[index]}: ${enrollmentData.datasets[1].data[index]} total students`}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="chart-labels">
                  {enrollmentData.labels.map((label, index) => (
                    <span key={index} className="chart-label">{label}</span>
                  ))}
                </div>
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color new-students"></div>
                  <span>New Students</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color total-students"></div>
                  <span>Total Students</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <h3>Subject Performance</h3>
              <Button variant="secondary" size="sm">
                <Calendar size={14} />
                Compare
              </Button>
            </div>
            <div className="chart-container">
              <div className="mock-chart horizontal">
                {performanceData.labels.map((subject, index) => (
                  <div key={subject} className="chart-row">
                    <span className="subject-name">{subject}</span>
                    <div className="progress-bars">
                      <div 
                        className="progress-bar grade"
                        style={{ width: `${performanceData.datasets[0].data[index]}%` }}
                        title={`Average Grade: ${performanceData.datasets[0].data[index]}%`}
                      >
                        <span className="progress-value">
                          {performanceData.datasets[0].data[index]}%
                        </span>
                      </div>
                      <div 
                        className="progress-bar completion"
                        style={{ width: `${performanceData.datasets[1].data[index]}%` }}
                        title={`Completion Rate: ${performanceData.datasets[1].data[index]}%`}
                      >
                        <span className="progress-value">
                          {performanceData.datasets[1].data[index]}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color grade"></div>
                  <span>Average Grade</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color completion"></div>
                  <span>Completion Rate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="data-card">
            <div className="card-header">
              <h3>Top Performing Students</h3>
              <Button variant="secondary" size="sm">
                View All
              </Button>
            </div>
            <div className="performers-list">
              {topPerformers.map((student, index) => (
                <div key={index} className="performer-item">
                  <div className="performer-rank">{index + 1}</div>
                  <div className="performer-info">
                    <span className="performer-name">{student.name}</span>
                    <span className="performer-subject">{student.subject}</span>
                  </div>
                  <div className="performer-stats">
                    <span className="performer-grade">{student.grade}%</span>
                    <span className={`performer-improvement ${student.improvement.includes('+') ? 'positive' : 'negative'}`}>
                      {student.improvement}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Performance */}
          <div className="data-card">
            <div className="card-header">
              <h3>Teacher Performance</h3>
              <Button variant="secondary" size="sm">
                View All
              </Button>
            </div>
            <div className="teachers-list">
              {teacherPerformance.map((teacher, index) => (
                <div key={index} className="teacher-item">
                  <div className="teacher-info">
                    <span className="teacher-name">{teacher.name}</span>
                    <span className="teacher-subjects">{teacher.subjects} subjects</span>
                  </div>
                  <div className="teacher-stats">
                    <div className="stat">
                      <span className="stat-value">{teacher.students}</span>
                      <span className="stat-label">Students</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{teacher.rating}</span>
                      <span className="stat-label">Rating</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{teacher.responseTime}</span>
                      <span className="stat-label">Response</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Analytics;