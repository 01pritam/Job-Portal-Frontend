import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Tooltip, 
    IconButton,
    CircularProgress,
    Alert,
    Snackbar
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import DescriptionIcon from '@mui/icons-material/Description';

const ApplicationsStatus = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'info' });

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('https://jobbackend-kotd.onrender.com/api/job/applications');
                // Response should be of the format { applications: [ ... ] }
                setApplications(response.data.applications);
            } catch (err) {
                console.error(err);
                setError('Failed to load applications');
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const handleViewResume = (resumeUrl) => {
        window.open(resumeUrl, '_blank');
    };

    const getStatus = (app) => {
        if (app.approve === true) return 'Approved';
        if (app.approve === false) return 'Rejected';
        return 'Under Process';
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
            <h1 className="text-3xl font-bold mb-8">My Applications</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 font-medium text-gray-700">
                    <div className="col-span-2">Company</div>
                    <div className="col-span-3">Job Title</div>
                    <div className="col-span-2">Applied On</div>
                    <div className="col-span-1">Location</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Actions</div>
                </div>
                {/* Application List */}
                {applications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No applications found
                    </div>
                ) : (
                    applications.map((app) => (
                        <div 
                            key={app._id} 
                            className="grid grid-cols-12 gap-2 px-4 py-6 border-t border-gray-200 items-center hover:bg-gray-50"
                        >
                            <div className="col-span-2 font-medium truncate" title={app?.jobId?.companyName}>
                                {app?.jobId?.companyName}
                            </div>
                            <div className="col-span-3 truncate" title={app?.jobId?.title}>
                                {app?.jobId?.title}
                            </div>
                            <div className="col-span-2 text-gray-600">
                                {new Date(app.createdAt).toLocaleDateString()}
                            </div>
                            <div className="col-span-1 text-gray-600">
                                {app?.jobId?.location}
                            </div>
                            <div className="col-span-2 text-gray-600">
                                {getStatus(app)}
                            </div>
                            <div className="col-span-2">
                                <Tooltip title="View Resume">
                                    <IconButton onClick={() => handleViewResume(app.resumeUrl)}>
                                        <LaunchIcon className="text-blue-500" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="View Cover Letter">
                                    <IconButton onClick={() => {
                                        setSnackbar({ open: true, message: app.coverLetter, type: 'info' });
                                    }}>
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
                <Alert 
                    severity={snackbar.type} 
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ApplicationsStatus;