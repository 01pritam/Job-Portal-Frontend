import React from 'react';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { userType, setUserType } = useUser(); // using userType too now
  const token = localStorage.getItem('token');

  const handleGetStarted = () => {
    navigate('/user-type');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserType('');
    navigate('/login');
  };

  return (
    <header className="font-sans bg-blue-950 text-white py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">JOB-PORTAL</Link>

        <nav className="hidden md:flex items-center space-x-6">

          {/* Public Links */}
          <Link to="/" className="hover:text-blue-300 transition-colors duration-200">
            Home
          </Link>

          <Link to="/jobs" className="hover:text-blue-300 transition-colors duration-200">
            Jobs
          </Link>

          {/* Protected Links - Only if token exists */}
          {token && userType === 'JobSeeker' && (
            <>
              <Link to="/jobseeker/profile" className="hover:text-blue-300 transition-colors duration-200">
                My Profile
              </Link>
              <Link to="/jobseeker/applications-status" className="hover:text-blue-300 transition-colors duration-200">
                Applications Status
              </Link>
              <Link to="/jobseeker/apply-jobs" className="hover:text-blue-300 transition-colors duration-200">
                Apply Jobs
              </Link>
            </>
          )}

          {token && userType === 'Employer' && (
            <>
              <Link to="/employer/profile" className="hover:text-blue-300 transition-colors duration-200">
                Company Profile
              </Link>
              <Link to="/employer/applications" className="hover:text-blue-300 transition-colors duration-200">
                Applications
              </Link>
              <Link to="/employer/create-jobs" className="hover:text-blue-300 transition-colors duration-200">
                Create Jobs
              </Link>
            </>
          )}

          {token && userType === 'Admin' && (
            <>
              <Link to="/admin/employer" className="hover:text-blue-300 transition-colors duration-200">
                Admin Employer
              </Link>
              <Link to="/admin/jobseeker" className="hover:text-blue-300 transition-colors duration-200">
                Admin Jobseeker
              </Link>
            </>
          )}

          {/* Button Section */}
          {token ? (
            <Button 
              variant="contained" 
              onClick={handleLogout}
              sx={{ 
                backgroundColor: '#EF4444', 
                '&:hover': { backgroundColor: '#DC2626' },
                borderRadius: '9999px',
                padding: '8px 24px',
                textTransform: 'none',
                fontWeight: 'bold'
              }}
            >
              Logout
            </Button>
          ) : (
            <Button 
              variant="contained" 
              onClick={handleGetStarted}
              sx={{ 
                backgroundColor: '#10B981', 
                '&:hover': { backgroundColor: '#059669' },
                borderRadius: '9999px',
                padding: '8px 24px',
                textTransform: 'none',
                fontWeight: 'bold'
              }}
            >
              Get Started
            </Button>
          )}
        </nav>

        {/* Mobile Menu button (optional, for later) */}
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