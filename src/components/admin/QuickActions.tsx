import React from 'react';
import { Plus, Users, BookOpen, Settings, Download, Upload } from 'lucide-react';
import './QuickActions.css';

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: 'Add New Teacher',
      description: 'Register a new teacher account',
      icon: Users,
      action: () => console.log('Add teacher'),
      color: 'primary'
    },
    {
      title: 'Create Subject',
      description: 'Add a new subject to curriculum',
      icon: BookOpen,
      action: () => console.log('Create subject'),
      color: 'success'
    },
    {
      title: 'Import Students',
      description: 'Bulk import students from CSV',
      icon: Download,
      action: () => console.log('Import students'),
      color: 'warning'
    },
    {
      title: 'Export Reports',
      description: 'Download system reports',
      icon: Upload,
      action: () => console.log('Export reports'),
      color: 'info'
    },
    
    {
      title: 'System Settings',
      description: 'Manage platform settings',
      icon: Settings,
      action: () => console.log('System settings'),
      color: 'secondary'
    },
    
  ];

  return (
    <div className="quick-actions">
      <h3 className="actions-title">Quick Actions</h3>
      
      <div className="actions-list">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={`action-button action-${action.color}`}
              onClick={action.action}
            >
              <div className="action-icon">
                <Icon size={18} />
              </div>
              
              <div className="action-content">
                <span className="action-title">{action.title}</span>
                <span className="action-description">{action.description}</span>
              </div>
              
              <div className="action-arrow">
                <Plus size={16} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;