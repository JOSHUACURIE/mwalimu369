import React from 'react';
import { BookOpen, Clock, Award, TrendingUp, Calendar, Bell } from 'lucide-react';
import StudentLayout from '../../layout/StudentLayout';
import './StudentDashboard.css';

const StudentDashboard: React.FC = () => {
  // Mock data
  const upcomingAssignments = [
    {
      id: 1,
      title: 'Algebra Quiz',
      course: 'Mathematics',
      dueDate: '2024-02-15',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Physics Lab Report',
      course: 'Physics',
      dueDate: '2024-02-20',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'English Essay',
      course: 'English Language',
      dueDate: '2024-02-25',
      priority: 'low'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'assignment_submitted',
      course: 'Mathematics',
      title: 'Submitted Algebra Homework',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'grade_received',
      course: 'Physics',
      title: 'Received grade: 92%',
      time: '1 day ago'
    },
    {
      id: 3,
      type: 'course_accessed',
      course: 'English Language',
      title: 'Completed lesson: Essay Writing',
      time: '2 days ago'
    }
  ];

  const courses = [
    {
      id: 1,
      name: 'Mathematics',
      progress: 75,
      nextLesson: 'Quadratic Equations',
      teacher: 'Caleb Odhiambo'
    },
    {
      id: 2,
      name: 'Physics',
      progress: 60,
      nextLesson: 'Newton\'s Laws',
      teacher: 'Mary Jaoko'
    },
    {
      id: 3,
      name: 'English Language',
      progress: 85,
      nextLesson: 'Poetry Analysis',
      teacher: 'John Smith'
    },
    {
      id: 4,
      name: 'Biology',
      progress: 45,
      nextLesson: 'Cell Structure',
      teacher: 'Kennedy Odoyo'
    }
  ];

  return (
    <StudentLayout>
      <div className="student-dashboard">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <h1>Welcome back, Vidah! 👋</h1>
            <p>Continue your learning journey. You have 3 upcoming assignments.</p>
          </div>
          <div className="welcome-stats">
            <div className="stat-card">
              <BookOpen size={24} />
              <div>
                <h3>4</h3>
                <span>Active Courses</span>
              </div>
            </div>
            <div className="stat-card">
              <Clock size={24} />
              <div>
                <h3>12h</h3>
                <span>Study Time</span>
              </div>
            </div>
            <div className="stat-card">
              <Award size={24} />
              <div>
                <h3>88%</h3>
                <span>Average Grade</span>
              </div>
            </div>
            <div className="stat-card">
              <TrendingUp size={24} />
              <div>
                <h3>7</h3>
                <span>Day Streak</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          {/* Left Column */}
          <div className="content-left">
            {/* My Courses */}
            <div className="section-card">
              <div className="section-header">
                <h2>My Courses</h2>
                <button className="view-all">View All</button>
              </div>
              <div className="courses-grid">
                {courses.map(course => (
                  <div key={course.id} className="course-card">
                    <div className="course-header">
                      <h3>{course.name}</h3>
                      <span className="progress-percent">{course.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="course-info">
                      <span className="teacher">Teacher: {course.teacher}</span>
                      <span className="next-lesson">Next: {course.nextLesson}</span>
                    </div>
                    <button className="continue-btn">Continue Learning</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="section-card">
              <div className="section-header">
                <h2>Recent Activity</h2>
                <button className="view-all">See All</button>
              </div>
              <div className="activity-list">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      <Bell size={16} />
                    </div>
                    <div className="activity-content">
                      <p className="activity-title">{activity.title}</p>
                      <span className="activity-course">{activity.course}</span>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="content-right">
            {/* Upcoming Assignments */}
            <div className="section-card">
              <div className="section-header">
                <h2>Upcoming Assignments</h2>
                <button className="view-all">View All</button>
              </div>
              <div className="assignments-list">
                {upcomingAssignments.map(assignment => (
                  <div key={assignment.id} className="assignment-item">
                    <div className="assignment-info">
                      <h4>{assignment.title}</h4>
                      <span className="assignment-course">{assignment.course}</span>
                    </div>
                    <div className="assignment-due">
                      <Calendar size={14} />
                      <span className={`priority-${assignment.priority}`}>
                        Due {assignment.dueDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Schedule */}
            <div className="section-card">
              <div className="section-header">
                <h2>Today's Schedule</h2>
                <button className="view-all">Full Schedule</button>
              </div>
              <div className="schedule-list">
                <div className="schedule-item">
                  <div className="schedule-time">
                    <span>09:00</span>
                    <span>AM</span>
                  </div>
                  <div className="schedule-details">
                    <h4>Mathematics Class</h4>
                    <span>Quadratic Equations</span>
                  </div>
                </div>
                <div className="schedule-item">
                  <div className="schedule-time">
                    <span>11:00</span>
                    <span>AM</span>
                  </div>
                  <div className="schedule-details">
                    <h4>Physics Lab</h4>
                    <span>Motion Experiments</span>
                  </div>
                </div>
                <div className="schedule-item">
                  <div className="schedule-time">
                    <span>02:00</span>
                    <span>PM</span>
                  </div>
                  <div className="schedule-details">
                    <h4>English Session</h4>
                    <span>Essay Writing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;