import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/userLogin'
import UserSignUp from './pages/userSignUp'
import CaptainLogin from './pages/captainLogin'
import CaptainSignUp from './pages/captainSignUp'
import ProtectedRoute from './components/ProtectedRoute'
import { useUser } from './context/UserContext'
import './App.css'

// Route guard to prevent logged-in users from accessing auth pages
const AuthGuard = ({ children }) => {
  const { user, captain, loading } = useUser();

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        <div className='text-xl font-semibold'>Loading...</div>
      </div>
    );
  }

  if (user || captain) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        
        {/* User Routes */}
        <Route
          path='/login'
          element={
            <AuthGuard>
              <UserLogin />
            </AuthGuard>
          }
        />
        <Route
          path='/signup'
          element={
            <AuthGuard>
              <UserSignUp />
            </AuthGuard>
          }
        />
        
        {/* Captain Routes */}
        <Route
          path='/captain-login'
          element={
            <AuthGuard>
              <CaptainLogin />
            </AuthGuard>
          }
        />
        <Route
          path='/captain-signup'
          element={
            <AuthGuard>
              <CaptainSignUp />
            </AuthGuard>
          }
        />
      </Routes>
    </>
  );
}
