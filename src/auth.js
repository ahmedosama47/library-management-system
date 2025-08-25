import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
       
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return true;
      } else {
        console.error('Login failed:', data.message);
        return false;
      }
    } catch (error) {
      console.error('Network error:', error);
      return false;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return { success: true, message: 'Registration successful!' };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error: ' + error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  
  const getToken = () => {
    return localStorage.getItem('token');
  };


  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('token');
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      getToken, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}