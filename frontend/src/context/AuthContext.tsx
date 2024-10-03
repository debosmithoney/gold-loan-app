import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: number; // Change from number to string
  username: string;
  role: 'CUSTOMER' | 'EMPLOYEE' | 'GOVERNMENT'; // Use specific roles for better type safety
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Create a context for authentication
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define props for AuthProvider to include children
interface AuthProviderProps {
  children: ReactNode; // Define children prop as ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children} 
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
