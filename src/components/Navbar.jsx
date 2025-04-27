import React from 'react';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- Updated import

const Navbar = () => {
  const navigate = useNavigate();
  const { userRole, logoutUser, token } = useAuth(); // <-- Get userRole and logout function

  const handleGetStarted = () => {
    navigate('/user-type');
  };

  return (
    <header className="font-sans bg-blue-950 text-white py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">JOB-PORTAL</Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-300 transition-colors duration-200">Home</Link>

          {/* JobSeeker Links */}
          {token && userRole === 'job_seeker' && (
            <>
            <Link to="/jobseeker/jobs" className="hover:text-blue-300 transition-colors duration-200">Jobs</Link>
              <Link to="/jobseeker/profile" className="hover:text-blue-300 transition-colors duration-200">Profile</Link>
              <Link to="/jobseeker/applications-status" className="hover:text-blue-300 transition-colors duration-200">Applications</Link>
              <Link to="/jobseeker/resume" className="hover:text-blue-300 transition-colors duration-200">My Resume</Link>
            </>
          )}

          {/* Employer Links */}
          {token && userRole === 'employer' && (
            <>
              <Link to="/employer/profile" className="hover:text-blue-300 transition-colors duration-200">Company Profile</Link>
              <Link to="/employer/create-job" className="hover:text-blue-300 transition-colors duration-200">Job</Link>
              <Link to="/employer/applications" className="hover:text-blue-300 transition-colors duration-200">Applications</Link>
              <Link to="/employer/search-resume" className="hover:text-blue-300 transition-colors duration-200">Search Resumes</Link>
            </>
          )}

          {/* Admin Links */}
          {token && userRole === 'admin' && (
            <>
              <Link to="/admin/dashboard" className="hover:text-blue-300 transition-colors duration-200">Dashboard</Link>
              <Link to="/admin/manage-employers" className="hover:text-blue-300 transition-colors duration-200">Employers</Link>
              <Link to="/admin/manage-jobseekers" className="hover:text-blue-300 transition-colors duration-200">Job Seekers</Link>
              <Link to="/admin/manage-jobs" className="hover:text-blue-300 transition-colors duration-200">Jobs</Link>
              <Link to="/admin/payments" className="hover:text-blue-300 transition-colors duration-200">Payments</Link>
              <Link to="/admin/messages" className="hover:text-blue-300 transition-colors duration-200">Messages</Link>
            </>
          )}

          {/* Button */}
          {token ? (
            <Button 
              variant="contained" 
              onClick={logoutUser} // <-- Now using context logout
              sx={{ backgroundColor: '#EF4444', '&:hover': { backgroundColor: '#DC2626' }, borderRadius: '9999px', padding: '8px 24px', textTransform: 'none', fontWeight: 'bold' }}
            >
              Logout
            </Button>
          ) : (
            <Button 
              variant="contained" 
              onClick={handleGetStarted}
              sx={{ backgroundColor: '#10B981', '&:hover': { backgroundColor: '#059669' }, borderRadius: '9999px', padding: '8px 24px', textTransform: 'none', fontWeight: 'bold' }}
            >
              Get Started
            </Button>
          )}
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 rounded-lg hover:bg-blue-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;