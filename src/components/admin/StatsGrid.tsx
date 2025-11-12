import React from 'react';
import { Users, BookOpen, UserCheck, TrendingUp } from 'lucide-react';
import './StatsGrid.css';

const StatsGrid: React.FC = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'primary'
    },
    {
      title: 'Total Teachers',
      value: '45',
      change: '+5%',
      trend: 'up',
      icon: UserCheck,
      color: 'success'
    },
    {
      title: 'Total Subjects',
      value: '28',
      change: '+3',
      trend: 'up',
      icon: BookOpen,
      color: 'warning'
    },
    {
      title: 'Attendance Rate',
      value: '94%',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'info'
    },
     {
      title: 'Payments Completed',
      value: '70%',
      change: '+7%',
      trend: 'up',
      icon: TrendingUp,
      color: 'info'
    },
     {
      title: 'Unread Messages',
      value: '20',
      change: '+2',
      trend: 'up',
      icon: TrendingUp,
      color: 'info'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div className={`stat-icon stat-icon-${stat.color}`}>
                <Icon size={20} />
              </div>
              <div className="stat-trend">
                <span className={`trend trend-${stat.trend}`}>
                  {stat.change}
                </span>
              </div>
            </div>
            
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;