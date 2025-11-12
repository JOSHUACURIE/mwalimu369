import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Paperclip, Smile, Search, MoreVertical, ArrowLeft, 
  Video, Phone, Info, File, Image,  Download, FileText 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockUsers, mockMessages } from '../../data/mockChatData';

import StudentLayout from '../../layout/StudentLayout';
import './Chat.css';

interface Conversation {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  lastMessage: string;
  unread: number;
  online: boolean;
  email?: string;
}

interface Message {
  id: number;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  read: boolean;
  type: 'text' | 'file' | 'image';
  file?: {
    name: string;
    size: number;
    type: string;
    url: string;
  };
}

interface UploadingFile {
  id: string;
  file: File;
  progress: number;
}

const Chat: React.FC = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [showFileDropzone, setShowFileDropzone] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Filter conversations for student (teachers and admin)
  useEffect(() => {
    const studentConversations: Conversation[] = mockUsers
      .filter(u => u.role !== 'student' && u.id !== user?.id)
      .map(user => ({
        id: user.id,
        name: user.name,
        role: user.role,
        avatar: user.profilePic,
        email: user.email,
        lastMessage: 'Click to start conversation',
        unread: 0,
        online: Math.random() > 0.3
      }));
    setConversations(studentConversations);
  }, [user]);

  // Load messages when conversation is selected
  useEffect(() => {
    if (activeConversation && user) {
      const conversationMessages = mockMessages.filter(
        (msg: Message) => 
          (msg.senderId === activeConversation.id && msg.receiverId === user.id) ||
          (msg.senderId === user.id && msg.receiverId === activeConversation.id)
      );
      setMessages(conversationMessages);
      // Show user profile when conversation starts
      if (conversationMessages.length > 0 && !isMobileView) {
        setShowUserProfile(true);
      }
    }
  }, [activeConversation, user, isMobileView]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation || !user) return;

    const message: Message = {
      id: Date.now(),
      senderId: user.id,
      receiverId: activeConversation.id,
      text: newMessage,
      timestamp: new Date(),
      read: false,
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Show user profile when first message is sent
    if (messages.length === 0 && !isMobileView) {
      setShowUserProfile(true);
    }

    // Simulate reply after 1-3 seconds
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const reply: Message = {
          id: Date.now() + 1,
          senderId: activeConversation.id,
          receiverId: user.id,
          text: getRandomReply(),
          timestamp: new Date(),
          read: true,
          type: 'text'
        };
        setMessages(prev => [...prev, reply]);
      }, 1000 + Math.random() * 2000);
    }
  };

  const getRandomReply = (): string => {
    const replies: string[] = [
      "Thanks for your message!",
      "I'll get back to you soon.",
      "That's a great question!",
      "Let me check that for you.",
      "Can we discuss this in our next class?",
      "I appreciate your enthusiasm!",
      "Good point! Let me think about it.",
      "I understand your concern.",
      "That's an interesting perspective.",
      "Let me look into that and get back to you.",
      "I'm glad you asked about that.",
      "That's definitely something we should cover.",
      "I'll make a note of that for our next session.",
      "Thanks for bringing that to my attention.",
      "I see what you mean.",
      "That's a valid point.",
      "Let me double-check the material on that.",
      "I'm here to help with any questions.",
      "That's a common question students have.",
      "I'll provide more details on that topic.",
      "Great observation!",
      "I'll clarify that in our next meeting.",
      "Thanks for your patience.",
      "I'm working on getting that information for you.",
      "That's an important aspect to consider.",
      "I'll review that and give you a proper answer.",
      "Thanks for being so engaged!",
      "I'll research that and update you.",
      "That's a thoughtful question.",
      "Let me consult the course materials.",
      "I appreciate you asking for clarification.",
      "I'll make sure to address that properly.",
      "That's a key concept we're covering.",
      "I'll get back to you with more details soon.",
      "Thanks for your curiosity about this topic."
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const handleBackToConversations = (): void => {
    setActiveConversation(null);
    setShowUserProfile(false);
  };

  const toggleUserProfile = (): void => {
    setShowUserProfile(!showUserProfile);
  };

  // File Upload Functions
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files && files.length > 0 && activeConversation && user) {
      Array.from(files).forEach(file => {
        handleFileUpload(file);
      });
      event.target.value = ''; // Reset input
    }
  };

  const handleFileUpload = (file: File): void => {
    if (!activeConversation || !user) return;

    const fileId = Date.now().toString();
    const uploadingFile: UploadingFile = {
      id: fileId,
      file,
      progress: 0
    };

    setUploadingFiles(prev => [...prev, uploadingFile]);

    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      setUploadingFiles(prev => 
        prev.map(uf => 
          uf.id === fileId 
            ? { ...uf, progress: Math.min(uf.progress + 10, 100) }
            : uf
        )
      );
    }, 100);

    // Simulate upload completion
    setTimeout(() => {
      clearInterval(uploadInterval);
      
      const message: Message = {
        id: Date.now(),
        senderId: user.id,
        receiverId: activeConversation.id,
        text: '',
        timestamp: new Date(),
        read: false,
        type: file.type.startsWith('image/') ? 'image' : 'file',
        file: {
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file) // In real app, this would be server URL
        }
      };

      setMessages(prev => [...prev, message]);
      setUploadingFiles(prev => prev.filter(uf => uf.id !== fileId));

      // Simulate reply with file acknowledgment
      setTimeout(() => {
        const reply: Message = {
          id: Date.now() + 1,
          senderId: activeConversation.id,
          receiverId: user.id,
          text: `Thanks for sharing the file "${file.name}"!`,
          timestamp: new Date(),
          read: true,
          type: 'text'
        };
        setMessages(prev => [...prev, reply]);
      }, 1500);
    }, 1000);
  };

  const handleFileClick = (): void => {
    fileInputRef.current?.click();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setShowFileDropzone(false);
    
    const files = event.dataTransfer.files;
    if (files && files.length > 0 && activeConversation && user) {
      Array.from(files).forEach(file => {
        handleFileUpload(file);
      });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setShowFileDropzone(true);
  };

  const handleDragLeave = (): void => {
    setShowFileDropzone(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string): React.ReactNode => {
    if (fileType.startsWith('image/')) {
      return <Image size={20} />;
    } else if (fileType.includes('pdf')) {
      return <FileText size={20} />;
    } else {
      return <File size={20} />;
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (timestamp: Date): string => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp: Date): string => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) return <div>Loading...</div>;

  const showSidebar = !isMobileView || !activeConversation;
  const showChat = !isMobileView || activeConversation;

  // Chat component content
  const chatContent = (
    <div className="chat-container">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        multiple
        style={{ display: 'none' }}
        accept="*/*"
      />

      {/* File Dropzone Overlay */}
      {showFileDropzone && (
        <div 
          className="file-dropzone-overlay"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="file-dropzone-content">
            <File size={48} />
            <h3>Drop files to upload</h3>
            <p>Supported files: documents, images, videos</p>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`chat-sidebar ${!showSidebar ? 'hidden' : ''}`}>
        <div className="sidebar-header">
          <h2>Messages</h2>
          <div className="header-actions">
            <button className="icon-btn">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="conversations-list">
          {filteredConversations.map((conversation: Conversation) => (
            <div
              key={conversation.id}
              className={`conversation-item ${
                activeConversation?.id === conversation.id ? 'active' : ''
              }`}
              onClick={() => setActiveConversation(conversation)}
            >
              <div className="avatar-container">
                <img
                  src={conversation.avatar || `/api/placeholder/40/40`}
                  alt={conversation.name}
                  className="avatar"
                />
                {conversation.online && <div className="online-indicator" />}
              </div>
              
              <div className="conversation-info">
                <div className="conversation-header">
                  <h4 className="conversation-name">{conversation.name}</h4>
                  <span className="conversation-time">Now</span>
                </div>
                <p className="conversation-preview">{conversation.lastMessage}</p>
                {conversation.unread > 0 && (
                  <span className="unread-badge">{conversation.unread}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div 
        className={`chat-main ${!showChat ? 'hidden' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {activeConversation ? (
          <div className="chat-area-with-profile">
            {/* Main Chat Content */}
            <div className={`chat-content ${showUserProfile ? 'with-profile' : ''}`}>
              {/* Chat Header */}
              <div className="chat-header">
                <div className="chat-user-info">
                  {isMobileView && (
                    <button 
                      className="back-button"
                      onClick={handleBackToConversations}
                      aria-label="Back to conversations"
                    >
                      <ArrowLeft size={20} />
                    </button>
                  )}
                  <div className="avatar-container">
                    <img
                      src={activeConversation.avatar || `/api/placeholder/40/40`}
                      alt={activeConversation.name}
                      className="avatar"
                    />
                    {activeConversation.online && <div className="online-indicator" />}
                  </div>
                  <div>
                    <h3>{activeConversation.name}</h3>
                    <span className="user-role">{activeConversation.role}</span>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="icon-btn">
                    <Video size={20} />
                  </button>
                  <button className="icon-btn">
                    <Phone size={20} />
                  </button>
                  <button 
                    className={`icon-btn ${showUserProfile ? 'active' : ''}`}
                    onClick={toggleUserProfile}
                    aria-label="Toggle user profile"
                  >
                    <Info size={20} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="messages-container">
                {/* Conversation Start Info */}
                {messages.length > 0 && (
                  <div className="conversation-start-info">
                    <div className="conversation-avatar">
                      <img
                        src={activeConversation.avatar || `/api/placeholder/80/80`}
                        alt={activeConversation.name}
                      />
                    </div>
                    <h4>{activeConversation.name}</h4>
                    <p>{activeConversation.role}</p>
                    <span className="conversation-start-date">
                      Conversation started • {formatDate(messages[0].timestamp)}
                    </span>
                  </div>
                )}

                {/* Uploading Files */}
                {uploadingFiles.map((uploadingFile) => (
                  <div key={uploadingFile.id} className="message sent">
                    <div className="message-bubble file-message">
                      <div className="file-upload-progress">
                        <div className="file-info">
                          {getFileIcon(uploadingFile.file.type)}
                          <div className="file-details">
                            <span className="file-name">{uploadingFile.file.name}</span>
                            <span className="file-size">
                              {formatFileSize(uploadingFile.file.size)}
                            </span>
                          </div>
                        </div>
                        <div className="progress-container">
                          <div 
                            className="progress-bar" 
                            style={{ width: `${uploadingFile.progress}%` }}
                          />
                          <span className="progress-text">{uploadingFile.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Messages */}
                {messages.map((message: Message) => (
                  <div
                    key={message.id}
                    className={`message ${
                      message.senderId === user.id ? 'sent' : 'received'
                    }`}
                  >
                    <div className="message-bubble">
                      {message.type === 'text' ? (
                        <>
                          <p>{message.text}</p>
                          <span className="message-time">
                            {formatTime(message.timestamp)}
                          </span>
                        </>
                      ) : message.type === 'file' && message.file ? (
                        <div className="file-message">
                          <div className="file-info">
                            {getFileIcon(message.file.type)}
                            <div className="file-details">
                              <span className="file-name">{message.file.name}</span>
                              <span className="file-size">
                                {formatFileSize(message.file.size)}
                              </span>
                            </div>
                            <button 
                              className="download-btn"
                              onClick={() => window.open(message.file?.url, '_blank')}
                              aria-label="Download file"
                            >
                              <Download size={16} />
                            </button>
                          </div>
                          <span className="message-time">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      ) : message.type === 'image' && message.file ? (
                        <div className="image-message">
                          <img 
                            src={message.file.url} 
                            alt={message.file.name}
                            className="uploaded-image"
                          />
                          <div className="image-info">
                            <span className="file-name">{message.file.name}</span>
                            <span className="message-time">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="message-input-container">
                <div className="input-actions">
                  <button 
                    type="button" 
                    className="icon-btn"
                    onClick={handleFileClick}
                    aria-label="Attach file"
                  >
                    <Paperclip size={20} />
                  </button>
                  <button type="button" className="icon-btn">
                    <Smile size={20} />
                  </button>
                </div>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="message-input"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="send-button"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>

            {/* User Profile Sidebar */}
            {showUserProfile && (
              <div className="user-profile-sidebar">
                <div className="profile-header">
                  <h3>Contact Info</h3>
                  <button 
                    className="icon-btn"
                    onClick={toggleUserProfile}
                    aria-label="Close profile"
                  >
                    <ArrowLeft size={20} />
                  </button>
                </div>
                
                <div className="profile-content">
                  <div className="profile-avatar">
                    <img
                      src={activeConversation.avatar || `/api/placeholder/120/120`}
                      alt={activeConversation.name}
                    />
                    {activeConversation.online && <div className="online-indicator large" />}
                  </div>
                  
                  <div className="profile-info">
                    <h2>{activeConversation.name}</h2>
                    <p className="profile-role">{activeConversation.role}</p>
                    <p className="profile-email">{activeConversation.email}</p>
                    <div className="profile-status">
                      <span className={`status ${activeConversation.online ? 'online' : 'offline'}`}>
                        {activeConversation.online ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>

                  <div className="profile-actions">
                    <button className="profile-action-btn">
                      <Video size={18} />
                      <span>Video Call</span>
                    </button>
                    <button className="profile-action-btn">
                      <Phone size={18} />
                      <span>Audio Call</span>
                    </button>
                  </div>

                  <div className="profile-details">
                    <h4>About</h4>
                    <p>
                      {activeConversation.role === 'teacher' 
                        ? 'Dedicated educator helping students achieve their academic goals.'
                        : 'Administrative support for all your academic needs.'
                      }
                    </p>
                  </div>

                  <div className="shared-content">
                    <h4>Shared Files</h4>
                    <div className="shared-items">
                      {messages
                        .filter(msg => msg.type === 'file' || msg.type === 'image')
                        .slice(0, 5)
                        .map((msg, index) => (
                          <div key={index} className="shared-item">
                            {getFileIcon(msg.file?.type || '')}
                            <span className="file-name">{msg.file?.name}</span>
                            <button 
                              className="download-btn small"
                              onClick={() => window.open(msg.file?.url, '_blank')}
                            >
                              <Download size={14} />
                            </button>
                          </div>
                        ))}
                      {messages.filter(msg => msg.type === 'file' || msg.type === 'image').length === 0 && (
                        <p className="no-files">No files shared yet</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="no-conversation">
            <div className="no-conversation-content">
              <div className="message-icon">💬</div>
              <h3>Select a conversation</h3>
              <p>Choose a teacher or administrator to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Wrap with StudentLayout
  return <StudentLayout>{chatContent}</StudentLayout>;
};

export default Chat;