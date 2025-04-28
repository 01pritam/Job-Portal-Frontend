"use client";

import { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Avatar,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu as MenuIcon } from "@mui/icons-material";

const Navbar = ({ isAdminDashboard }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole, logoutUser, token } = useAuth();

  // Dashboard state management
  const [activeSection, setActiveSection] = useState("dashboard");
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  // Add a state variable to track sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Add an effect to listen for sidebar toggle events
  useEffect(() => {
    const handleSidebarToggle = (event) => {
      setSidebarOpen(event.detail.open);
    };

    window.addEventListener("sidebarToggle", handleSidebarToggle);

    return () => {
      window.removeEventListener("sidebarToggle", handleSidebarToggle);
    };
  }, []);

  const handleGetStarted = () => {
    navigate("/user-type");
  };

  const handleProfileOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = (navigateTo) => {
    setProfileAnchorEl(null);

    // If a navigation target is provided, navigate to that page
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleDashboardNavigation = (section) => {
    if (location.pathname === "/admin/dashboard") {
      // If already on dashboard, just update the section
      setActiveSection(section);
    } else {
      // Navigate to dashboard with the section as state
      navigate("/admin/dashboard", { state: { activeSection: section } });
    }
    handleMobileMenuClose();
  };

  return (
    <header
      className={`font-sans bg-blue-950 text-white py-4 px-6 fixed top-0 z-50 transition-all duration-300 ease-in-out ${
        sidebarOpen ? "md:pl-[250px]" : ""
      } w-full`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          JOB-PORTAL
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="hover:text-blue-300 transition-colors duration-200"
          >
            Home
          </Link>

          {/* JobSeeker Links */}
          {token && userRole === "job_seeker" && (
            <>
              <Link
                to="/jobseeker/jobs"
                className="hover:text-blue-300 transition-colors duration-200"
              >
                Jobs
              </Link>
              <Link
                to="/jobseeker/applications-status"
                className="hover:text-blue-300 transition-colors duration-200"
              >
                Applications
              </Link>
              <Link
                to="/jobseeker/profile"
                className="hover:text-blue-300 transition-colors duration-200"
              >
                Profile
              </Link>
            </>
          )}

          {/* Employer Links */}
          {token && userRole === "employer" && (
            <>
              <Link
                to="/employer/create-job"
                className="hover:text-blue-300 transition-colors duration-200"
              >
                Jobs
              </Link>
              <Link
                to="/employer/applications"
                className="hover:text-blue-300 transition-colors duration-200"
              >
                Applications
              </Link>
              <Link
                to="/employer/search-resume"
                className="hover:text-blue-300 transition-colors duration-200"
              >
                Search Resumes
              </Link>
              <Link
                to="/employer/profile"
                className="hover:text-blue-300 transition-colors duration-200"
              >
                Profile
              </Link>
            </>
          )}

          {/* Admin Links */}
          {token && userRole === "admin" && (
            <>
              <Link
                to="/admin/dashboard"
                className="hover:text-blue-300 transition-colors duration-200"
                onClick={() => handleDashboardNavigation("dashboard")}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/manage-employers"
                className="hover:text-blue-300 transition-colors duration-200"
              >
                Employers
              </Link>
              <Link
                to="/admin/manage-jobseekers"
                className="hover:text-blue-300 transition-colors duration-200"
              >
                Job Seekers
              </Link>
              <Link
                to="/admin/manage-jobs"
                className="hover:text-blue-300 transition-colors duration-200"
              >
                Jobs
              </Link>
              <Link
                to="/admin/payments"
                className="hover:text-blue-300 transition-colors duration-200"
              >
                Payments
              </Link>
              <Link
                to="/admin/messages"
                className="hover:text-blue-300 transition-colors duration-200"
              >
                Messages
              </Link>
            </>
          )}

          {/* Button - different rendering for admin dashboard */}
          {token ? (
            !isAdminDashboard ? (
              <Button
                variant="contained"
                onClick={(event) => {
                  // Open the profile menu
                  handleProfileOpen(event);
                }}
                sx={{
                  backgroundColor: "#1E40AF",
                  "&:hover": { backgroundColor: "#1E3A8A" },
                  borderRadius: "9999px",
                  padding: "8px 16px",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    fontSize: "0.8rem",
                    bgcolor: "#0969da",
                    mr: 1,
                  }}
                >
                  {userRole === "admin"
                    ? "A"
                    : userRole === "employer"
                    ? "E"
                    : "J"}
                </Avatar>
                Profile
              </Button>
            ) : null
          ) : (
            <Button
              variant="contained"
              onClick={handleGetStarted}
              sx={{
                backgroundColor: "#10B981",
                "&:hover": { backgroundColor: "#059669" },
                borderRadius: "9999px",
                padding: "8px 24px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Get Started
            </Button>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-blue-900"
          onClick={handleMobileMenuOpen}
        >
          <MenuIcon />
        </button>
      </div>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileClose}
        PaperProps={{
          sx: {
            minWidth: 200,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        }}
      >
        <div className="p-3 flex items-center">
          <Avatar sx={{ width: 40, height: 40, bgcolor: "#0969da", mr: 2 }}>
            {userRole === "admin" ? "A" : userRole === "employer" ? "E" : "J"}
          </Avatar>
          <div>
            <p className="font-semibold text-gray-800">
              {userRole === "admin"
                ? "Admin User"
                : userRole === "employer"
                ? "Employer"
                : "Job Seeker"}
            </p>
            <p className="text-xs text-gray-500">user@example.com</p>
          </div>
        </div>
        <Divider />
        <MenuItem
          onClick={() =>
            handleProfileClose(
              userRole === "admin"
                ? "/admin/profile"
                : userRole === "employer"
                ? "/employer/profile"
                : "/jobseeker/profile"
            )
          }
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() =>
            handleProfileClose(
              userRole === "admin"
                ? "/admin/settings"
                : userRole === "employer"
                ? "/employer/settings"
                : "/jobseeker/settings"
            )
          }
        >
          Account Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={logoutUser} className="text-red-600">
          Logout
        </MenuItem>
      </Menu>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchorEl}
        open={Boolean(mobileMenuAnchorEl)}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: { width: "80%", maxWidth: 300, mt: 1, borderRadius: 2 },
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("/");
            handleMobileMenuClose();
          }}
        >
          Home
        </MenuItem>

        {/* JobSeeker Links */}
        {token && userRole === "job_seeker" && (
          <>
            <MenuItem
              onClick={() => {
                navigate("/jobseeker/jobs");
                handleMobileMenuClose();
              }}
            >
              Jobs
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/jobseeker/applications-status");
                handleMobileMenuClose();
              }}
            >
              Applications
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/jobseeker/profile");
                handleMobileMenuClose();
              }}
            >
              Profile
            </MenuItem>
          </>
        )}

        {/* Employer Links */}
        {token && userRole === "employer" && (
          <>
            <MenuItem
              onClick={() => {
                navigate("/employer/create-job");
                handleMobileMenuClose();
              }}
            >
              Jobs
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/employer/applications");
                handleMobileMenuClose();
              }}
            >
              Applications
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/employer/search-resume");
                handleMobileMenuClose();
              }}
            >
              Search Resumes
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/employer/profile");
                handleMobileMenuClose();
              }}
            >
              Profile
            </MenuItem>
          </>
        )}

        {/* Admin Links */}
        {token && userRole === "admin" && (
          <>
            <MenuItem
              onClick={() => {
                navigate("/admin/dashboard");
                handleMobileMenuClose();
              }}
            >
              Dashboard
            </MenuItem>
            <Divider />
          </>
        )}

        <Divider />
        {token ? (
          <MenuItem onClick={logoutUser} className="text-red-600">
            Logout
          </MenuItem>
        ) : (
          <MenuItem
            onClick={handleGetStarted}
            className="text-green-600 font-semibold"
          >
            Get Started
          </MenuItem>
        )}
      </Menu>
    </header>
  );
};

export default Navbar;
