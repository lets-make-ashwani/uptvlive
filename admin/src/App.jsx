import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import PostForm from './pages/PostForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    setIsLoggedIn(!!token);
    setLoading(false);
  }, []);

  const handleLogin = (token, username) => {
    localStorage.setItem('admin_token', token);
    localStorage.setItem('admin_user', username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setIsLoggedIn(false);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          isLoggedIn 
            ? <Navigate to="/" replace /> 
            : <LoginPage onLogin={handleLogin} />
        } 
      />
      <Route 
        path="/" 
        element={
          isLoggedIn 
            ? <Dashboard onLogout={handleLogout} /> 
            : <Navigate to="/login" replace />
        } 
      />
      <Route 
        path="/posts/new" 
        element={
          isLoggedIn 
            ? <PostForm onLogout={handleLogout} /> 
            : <Navigate to="/login" replace />
        } 
      />
      <Route 
        path="/posts/edit/:id" 
        element={
          isLoggedIn 
            ? <PostForm onLogout={handleLogout} /> 
            : <Navigate to="/login" replace />
        } 
      />
    </Routes>
  );
}

export default App;
