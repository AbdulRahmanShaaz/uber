import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children, requiredRole = 'user' }) => {
  const { user, captain, loading } = useUser();

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='text-xl font-semibold'>Loading...</div>
      </div>
    );
  }

  if (requiredRole === 'user' && !user) {
    return <Navigate to='/login' replace />;
  }

  if (requiredRole === 'captain' && !captain) {
    return <Navigate to='/captain-login' replace />;
  }

  return children;
};

export default ProtectedRoute;
