import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Jobs from './components/Jobs';
import { useUser } from './context/UserContext';

// JobSeeker Pages
import Profile from './pages/JobSeeker/Profile';
import ApplicationsStatus from './pages/JobSeeker/ApplicationsStatus';
import ApplyJobs from './pages/JobSeeker/ApplyJobs';

// Employer Pages
import CompanyProfile from './pages/Employer/CompanyProfile';
import Applications from './pages/Employer/Applications';
import CreateJobs from './pages/Employer/CreateJobs';
import UserType from './components/UserType';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

// // Admin Pages (just place holders, because in Admin folder you also have Employer and JobSeeker folders)
// import AdminEmployer from './pages/Admin/Employer/AdminEmployer'; // adjust this if you have a file inside
// import AdminJobSeeker from './pages/Admin/JobSeeker/AdminJobSeeker'; // adjust if different

const App = () => {
  const { userType } = useUser(); // From context

  return (
    <>
      <Navbar />
      <div className="mt-20">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/user-type" element={<UserType />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-pass" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/employer/profile" element={<CompanyProfile />} />
          

          {/* JobSeeker Routes */}
          <Route path="/jobseeker/profile" element={
            userType === 'JobSeeker' ? <Profile /> : <Navigate to="/" replace />
          } />
          <Route path="/jobseeker/applications-status" element={
            userType === 'JobSeeker' ? <ApplicationsStatus /> : <Navigate to="/" replace />
          } />
          <Route path="/jobseeker/apply-jobs" element={
            userType === 'JobSeeker' ? <ApplyJobs /> : <Navigate to="/" replace />
          } />

          {/* Employer Routes */}
          <Route path="/employer/company-profile" element={
            userType === 'Employer' ? <CompanyProfile /> : <Navigate to="/" replace />
          } />
          <Route path="/employer/applications" element={
            userType === 'Employer' ? <Applications /> : <Navigate to="/" replace />
          } />
          <Route path="/employer/create-jobs" element={
            userType === 'Employer' ? <CreateJobs /> : <Navigate to="/" replace />
          } />

          {/* Admin Routes
          <Route path="/admin/employer" element={
            userType === 'Admin' ? <AdminEmployer /> : <Navigate to="/" replace />
          } />
          <Route path="/admin/jobseeker" element={
            userType === 'Admin' ? <AdminJobSeeker /> : <Navigate to="/" replace />
          } /> */}

        </Routes>
      </div>
    </>
  );
};

export default App;