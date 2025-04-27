import React, { useState, useEffect } from 'react';
import { 
  Tooltip, 
  IconButton,
  CircularProgress,
  Alert,
  Snackbar 
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import DescriptionIcon from '@mui/icons-material/Description';
import LaunchIcon from '@mui/icons-material/Launch';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { demoApplications } from './demoApplications';

const ApplicationsStatus = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'info' });
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setApplications(demoApplications);
      } catch (err) {
        setError('Failed to load applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleBoostApplication = async (applicationId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state to show boosted status
      setApplications(apps => 
        apps.map(app => 
          app.id === applicationId ? { ...app, canBoost: false } : app
        )
      );
      
      setSnackbar({ 
        open: true, 
        message: 'Application boosted successfully!', 
        type: 'success' 
      });
    } catch (err) {
      setSnackbar({ 
        open: true, 
        message: 'Failed to boost application', 
        type: 'error' 
      });
    }
  };

  const handleReviewApplication = (application) => {
    // Add your review logic here
    console.log('Reviewing application:', application);
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status.toLowerCase().replace(/\s+/g, '-') === filter;
  });

  const getStatusBackground = (status) => {
    const statusStyles = {
      "Applied": "bg-blue-100 text-blue-800",
      "In-touch": "bg-yellow-100 text-yellow-800",
      "Not selected": "bg-gray-100 text-gray-800",
      "Position filled": "bg-gray-100 text-gray-800",
      "Selected": "bg-green-100 text-green-800",
      "Under review": "bg-purple-100 text-purple-800"
    };
    return statusStyles[status] || "bg-blue-100 text-blue-800";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Applications</h1>
        <div className="flex items-center space-x-4">
          <select 
            className="border rounded-md p-2"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="all">All Status</option>
            <option value="applied">Applied</option>
            <option value="in-touch">In-touch</option>
            <option value="under-review">Under Review</option>
            <option value="selected">Selected</option>
            <option value="not-selected">Not Selected</option>
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 font-medium text-gray-700">
          <div className="col-span-2">COMPANY</div>
          <div className="col-span-2">PROFILE</div>
          <div className="col-span-2">APPLIED ON</div>
          <div className="col-span-1">APPLICANTS</div>
          <div className="col-span-2">STATUS</div>
          <div className="col-span-1">REVIEW</div>
        </div>
        
        {/* Application List */}
        {filteredApplications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No applications found
          </div>
        ) : (
          filteredApplications.map((app) => (
            <div 
              key={app.id} 
              className="grid grid-cols-12 gap-2 px-4 py-6 border-t border-gray-200 items-center hover:bg-gray-50"
            >
              <div className="col-span-2 font-medium truncate" title={app.company}>
                {app.company}
              </div>
              <div className="col-span-2 flex items-center">
                <span className="truncate" title={app.profile}>{app.profile}</span>
                <IconButton size="small" onClick={() => window.open(app.jobUrl, '_blank')}>
                  <LaunchIcon fontSize="small" className="text-blue-500" />
                </IconButton>
              </div>
              <div className="col-span-2 text-gray-600">
                {new Date(app.appliedOn).toLocaleDateString()}
              </div>
              <div className="col-span-1 text-gray-600">{app.applicants}</div>
              <div className="col-span-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusBackground(app.status)}`}>
                    {app.status}
                  </span>
                  <Tooltip title={app.statusDetails || 'Status information'}>
                    <IconButton size="small">
                      <InfoIcon fontSize="small" className="text-blue-500" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              <div className="col-span-1">
                <Tooltip title="Review Application">
                  <IconButton onClick={() => handleReviewApplication(app)}>
                    <DescriptionIcon className="text-blue-500" />
                  </IconButton>
                </Tooltip>
              </div>
              
            </div>
          ))
        )}
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.type} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ApplicationsStatus;