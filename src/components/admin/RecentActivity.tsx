import React from 'react';
import { UserPlus, BookOpen, MessageSquare, Award } from 'lucide-react';
import './RecentActivity.css';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: 'new_student',
      user: 'Vidah Limaya',
      subject: 'Mathematics',
      time: '2 minutes ago',
      icon: UserPlus,
      color: 'primary'
    },
    {
      id: 2,
      type: 'assignment_submitted',
      user: 'Bathseba Kerubo',
      subject: 'Physics Assignment',
      time: '1 hour ago',
      icon: BookOpen,
      color: 'success'
    },
    {
      id: 3,
      type: 'new_message',
      user: 'Warioba Michelle',
      subject: 'Question about curriculum',
      time: '2 hours ago',
      icon: MessageSquare,
      color: 'warning'
    },
    {
      id: 4,
      type: 'achievement',
      user: 'Scovia Divai',
      subject: 'Completed Advanced Chemistry',
      time: '5 hours ago',
      icon: Award,
      color: 'info'
    },
    {
      id: 5,
      type: 'new_student',
      user: 'Ogol Christine',
      subject: 'English Language',
      time: '1 day ago',
      icon: UserPlus,
      color: 'primary'
    }
  ];

  const getActivityMessage = (type: string, user: string, subject: string) => {
    switch (type) {
      case 'new_student':
        return `${user} enrolled in ${subject}`;
      case 'assignment_submitted':
        return `${user} submitted ${subject}`;
      case 'new_message':
        return `${user} sent a message about ${subject}`;
      case 'achievement':
        return `${user} ${subject}`;
      default:
        return `${user} - ${subject}`;
    }
  };

  return (
    <div className="recent-activity">
      <div className="activity-header">
        <h3 className="activity-title">Recent Activity</h3>
        <button className="view-all-btn">View All</button>
      </div>
      
      <div className="activity-list">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="activity-item">
              <div className={`activity-icon activity-icon-${activity.color}`}>
                <Icon size={16} />
              </div>
              
              <div className="activity-content">
                <p className="activity-message">
                  {getActivityMessage(activity.type, activity.user, activity.subject)}
                </p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;