import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Jobs from './components/Jobs';
import { useAuth } from './context/AuthContext';

// JobSeeker Pages
import Profile from './pages/JobSeeker/Profile';
import ApplicationsStatus from './pages/JobSeeker/ApplicationsStatus';
import Resume from './pages/JobSeeker/Resume';

// Employer Pages
import CompanyProfile from './pages/Employer/CompanyProfile';
import Applications from './pages/Employer/Applications';
import CreateJob from './pages/Employer/CreateJob';
import SearchResume from './pages/Employer/SearchResume';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageEmployers from './pages/Admin/ManageEmployers';
import ManageJobSeekers from './pages/Admin/ManageJobSeekers';
import ManageJobs from './pages/Admin/ManageJobs';
import Payments from './pages/Admin/Payments';
import Messages from './pages/Admin/Messages';

// Common Pages
import UserType from './components/UserType';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

const App = () => {
  const { userRole,token } = useAuth();

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log("UserRole: ", userRole);
  //   console.log("Token: ", token);
  // }, [userRole, token]);

  return (
    <>
      <Navbar />
      <div className="mt-20">
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/user-type" element={<UserType />} />
          {/* Conditionally render Login route: if token exists, redirect to Home */}
          <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-pass" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* JobSeeker Routes */}
          <Route path="/jobseeker/profile" element={token && userRole === 'job_seeker' ? <Profile /> : <Navigate to="/login" replace />} />
          <Route path="/jobseeker/jobs" element={token && userRole === 'job_seeker' ? <Jobs /> : <Navigate to="/login" replace />} />
          <Route path="/jobseeker/applications-status" element={token && userRole === 'job_seeker' ? <ApplicationsStatus /> : <Navigate to="/login" replace />} />
          <Route path="/jobseeker/resume" element={token && userRole === 'job_seeker' ? <Resume /> : <Navigate to="/login" replace />} />

          {/* Employer Routes */}
          console.log("Token:", token);
console.log("UserRole:", userRole);

<Route 
  path="/employer/profile" 
  element={
    token && userRole === 'employer' ? (
      <CompanyProfile />
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>
          <Route path="/employer/create-job" element={token && userRole === 'employer' ? <CreateJob /> : <Navigate to="/login" replace />} />
          <Route path="/employer/applications" element={token && userRole === 'employer' ? <Applications /> : <Navigate to="/login" replace />} />
          <Route path="/employer/search-resume" element={token && userRole === 'employer' ? <SearchResume /> : <Navigate to="/login" replace />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={token && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" replace />} />
          <Route path="/admin/manage-employers" element={token && userRole === 'admin' ? <ManageEmployers /> : <Navigate to="/login" replace />} />
          <Route path="/admin/manage-jobseekers" element={token && userRole === 'admin' ? <ManageJobSeekers /> : <Navigate to="/login" replace />} />
          <Route path="/admin/manage-jobs" element={token && userRole === 'admin' ? <ManageJobs /> : <Navigate to="/login" replace />} />
          <Route path="/admin/payments" element={token && userRole === 'admin' ? <Payments /> : <Navigate to="/login" replace />} />
          <Route path="/admin/messages" element={token && userRole === 'admin' ? <Messages /> : <Navigate to="/login" replace />} />

        </Routes>
      </div>
    </>
  );
};

export default App;