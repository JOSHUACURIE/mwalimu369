// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { Menu, ArrowLeft } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import './ChatLayout.css';

// interface ChatLayoutProps {
//   children: React.ReactNode;
//   showBackButton?: boolean;
//   onBackClick?: () => void;
// }

// const ChatLayout: React.FC<ChatLayoutProps> = ({ 
//   children, 
//   showBackButton = false, 
//   onBackClick 
// }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const handleBackClick = () => {
//     if (onBackClick) {
//       onBackClick();
//     } else {
//       navigate(-1);
//     }
//   };

//   const getRoleBasedTitle = () => {
//     switch (user?.role) {
//       case 'student':
//         return 'Student Chat';
//       case 'teacher':
//         return 'Teacher Chat';
//       case 'admin':
//         return 'Admin Chat';
//       default:
//         return 'Chat';
//     }
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="chat-layout">
//       {/* Header */}
//       <header className="chat-layout-header">
//         <div className="chat-header-left">
//           {showBackButton ? (
//             <button 
//               className="icon-button"
//               onClick={handleBackClick}
//               aria-label="Go back"
//             >
//               <ArrowLeft size={20} />
//             </button>
//           ) : (
//             <button 
//               className="icon-button"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               aria-label="Toggle menu"
//             >
//               <Menu size={20} />
//             </button>
//           )}
//           <h1 className="chat-layout-title">{getRoleBasedTitle()}</h1>
//         </div>
        
//         <div className="chat-header-right">
//           <div className="user-info">
//             <span className="user-name">{user.name}</span>
//             <span className="user-role">{user.role}</span>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="chat-layout-content">
//         {children}
//       </main>

//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div 
//           className="chat-layout-overlay"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default ChatLayout;