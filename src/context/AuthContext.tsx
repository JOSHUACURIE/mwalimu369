import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type User, type SafeUser, mockUsers } from '../data/mockUsers';

interface AuthContextType {
  user: SafeUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'student' | 'teacher') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Helper function to remove password from user object
  const createSafeUser = (user: User): SafeUser => {
    const { password, ...safeUser } = user;
    return safeUser;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in mock data
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const safeUser = createSafeUser(foundUser);
      setUser(safeUser);
      localStorage.setItem('currentUser', JSON.stringify(safeUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string, role: 'student' | 'teacher'): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const userExists = mockUsers.find(u => u.email === email);
    if (userExists) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user 
    const newUser: User = {
      id: `${role}-${mockUsers.length + 1}`,
      name,
      email,
      password,
      role,
      profilePic: `/images/${role}${mockUsers.filter(u => u.role === role).length + 1}.png`,
      ...(role === 'teacher' && { assignedSubjects: [] }),
      ...(role === 'student' && { enrolledSubjects: [] })
    };
    
    // Add to mock users array
    mockUsers.push(newUser);
    
    // Create safe user without password
    const safeUser = createSafeUser(newUser);
    setUser(safeUser);
    localStorage.setItem('currentUser', JSON.stringify(safeUser));
    setIsLoading(false);
    return true;
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};