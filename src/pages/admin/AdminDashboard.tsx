import React from 'react';
import AdminLayout from '../../layout/AdminLayout';
import StatsGrid from '../../components/admin/StatsGrid';
import RecentActivity from '../../components/admin/RecentActivity';
import QuickActions from '../../components/admin/QuickActions';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard Overview</h1>
          <p className="dashboard-subtitle">
            Welcome to your admin dashboard. Here's what's happening today.
          </p>
        </div>

        <StatsGrid />
        
        <div className="dashboard-content">
          <div className="content-left">
            <RecentActivity />
          </div>
          <div className="content-right">
            <QuickActions />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;