// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Container,
//   CircularProgress,
//   Typography,
//   Paper,
//   Grid,
//   Button,
//   Avatar,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import { Launch as LaunchIcon } from '@mui/icons-material';
// import axios from 'axios';
// import { useAuth } from '../../context/AuthContext';

// const Applications = () => {
//   const { jobId } = useParams();
//   const { token } = useAuth();
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const res = await axios.get(`https://jobbackend-kotd.onrender.com/api/job/employer/jobs/${jobId}/applications`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setApplications(res.data.applications || []);
//       } catch (error) {
//         console.error('Error fetching applications:', error);
//         setSnackbar({ open: true, message: 'Failed to fetch applications', severity: 'error' });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, [jobId, token]);

//   const handleViewResume = (url) => {
//     if (url) window.open(url, '_blank');
//   };

//   const handleApprove = async (applicationId) => {
//     try {
//       await axios.put(`https://jobbackend-kotd.onrender.com/api/job/approve/${applicationId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setSnackbar({ open: true, message: 'Application Approved', severity: 'success' });
//       // Optionally update local state
//       setApplications(prev =>
//         prev.map(app =>
//           app._id === applicationId ? { ...app, approve: true } : app
//         )
//       );
//     } catch (error) {
//       console.error('Error approving application:', error);
//       setSnackbar({ open: true, message: 'Failed to approve application', severity: 'error' });
//     }
//   };

//   const handleReject = async (applicationId) => {
//     try {
//       await axios.put(`https://jobbackend-kotd.onrender.com/api/job/reject/${applicationId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setSnackbar({ open: true, message: 'Application Rejected', severity: 'success' });
//       // Optionally update local state
//       setApplications(prev =>
//         prev.map(app =>
//           app._id === applicationId ? { ...app, approve: false } : app
//         )
//       );
//     } catch (error) {
//       console.error('Error rejecting application:', error);
//       setSnackbar({ open: true, message: 'Failed to reject application', severity: 'error' });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <CircularProgress />
//       </div>
//     );
//   }

//   return (
//     <Container maxWidth="lg" className="py-8">
//       <Typography variant="h4" className="mb-8 font-bold text-center">
//         Applications for Job ID: {jobId}
//       </Typography>

//       {applications.length === 0 ? (
//         <Alert severity="info">No applications found.</Alert>
//       ) : (
//         <Grid container spacing={4}>
//           {applications.map((app) => (
//             <Grid item xs={12} md={6} key={app._id}>
//               <Paper elevation={3} className="p-6 flex flex-col space-y-4">
//                 <div className="flex items-center space-x-4">
//                   <Avatar src={app.jobseekerId?.photo_url} alt="Applicant" />
//                   <div>
//                     <Typography variant="h6">
//                       {app.jobSeekerInfo?.full_name || 'Unknown Applicant'}
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">phone : 
//                       {app.jobSeekerInfo?.phone_number || 'Phone N/A'}
//                     </Typography>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Typography variant="body1">
//                     <strong>Applied On:</strong> {new Date(app.createdAt).toLocaleDateString()}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Privacy:</strong> {app.jobseekerId?.privacy_level}
//                   </Typography>
//                 </div>

//                 <div className="flex flex-wrap gap-2">
//                   {app.resumeUrl && (
//                     <Button
//                       variant="outlined"
//                       startIcon={<LaunchIcon />}
//                       onClick={() => handleViewResume(app.resumeUrl)}
//                     >
//                       View Resume
//                     </Button>
//                   )}

//                   {app.approve === true ? (
//                     <Typography variant="body1" color="success">
//                       Approved
//                     </Typography>
//                   ) : app.approve === false ? (
//                     <Typography variant="body1" color="error">
//                       Rejected
//                     </Typography>
//                   ) : (
//                     <>
//                       <Button
//                         variant="contained"
//                         color="success"
//                         onClick={() => handleApprove(app._id)}
//                       >
//                         Approve
//                       </Button>

//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={() => handleReject(app._id)}
//                       >
//                         Reject
//                       </Button>
//                     </>
//                   )}
//                 </div>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert
//           severity={snackbar.severity}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default Applications;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  CircularProgress,
  Typography,
  Paper,
  Grid,
  Button,
  Avatar,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Launch as LaunchIcon } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Applications = () => {
  const { jobId } = useParams();
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [fitAnalysis, setFitAnalysis] = useState('');
  const [fitDialogOpen, setFitDialogOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');

  const handleAnalyzeFit = async (resumeUrl) => {
    if (!resumeUrl || !jobDescription) {
      setSnackbar({ open: true, message: 'Resume or job description missing.', severity: 'warning' });
      return;
    }

    try {
      setSnackbar({ open: true, message: 'Analyzing fit...', severity: 'info' });

      const formData = new FormData();
      const resumeBlob = await fetch(resumeUrl).then(res => res.blob());
      console.log(jobDescription);
      formData.append('resume', new File([resumeBlob], 'resume.pdf'));
      formData.append('jobDescription', jobDescription);

      const res = await axios.post('https://resume-6hrn.onrender.com/fitchecker', formData);
      setFitAnalysis(res.data.fitAnalysis);
      setFitDialogOpen(true);
    } catch (error) {
      console.error('Fit analysis failed:', error);
      setSnackbar({ open: true, message: 'Failed to analyze fit.', severity: 'error' });
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`https://jobbackend-kotd.onrender.com/api/job/employer/jobs/${jobId}/applications`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const jobRes=await  axios.get(`https://jobbackend-kotd.onrender.com/api/job/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setJobDescription(jobRes.data || '');

        setApplications(res.data.applications || []);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setSnackbar({ open: true, message: 'Failed to fetch applications', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId, token]);

  const handleViewResume = (url) => {
    if (url) window.open(url, '_blank');
  };

  const handleApprove = async (applicationId) => {
    try {
      await axios.put(`https://jobbackend-kotd.onrender.com/api/job/approve/${applicationId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSnackbar({ open: true, message: 'Application Approved', severity: 'success' });
      setApplications(prev =>
        prev.map(app =>
          app._id === applicationId ? { ...app, approve: true } : app
        )
      );
    } catch (error) {
      console.error('Error approving application:', error);
      setSnackbar({ open: true, message: 'Failed to approve application', severity: 'error' });
    }
  };

  const handleReject = async (applicationId) => {
    try {
      await axios.put(`https://jobbackend-kotd.onrender.com/api/job/reject/${applicationId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSnackbar({ open: true, message: 'Application Rejected', severity: 'success' });
      setApplications(prev =>
        prev.map(app =>
          app._id === applicationId ? { ...app, approve: false } : app
        )
      );
    } catch (error) {
      console.error('Error rejecting application:', error);
      setSnackbar({ open: true, message: 'Failed to reject application', severity: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" className="mb-8 font-bold text-center">
        Applications for Job ID: {jobId}
      </Typography>

      {applications.length === 0 ? (
        <Alert severity="info">No applications found.</Alert>
      ) : (
        <Grid container spacing={4}>
          {applications.map((app) => (
            <Grid item xs={12} md={6} key={app._id}>
              <Paper elevation={3} className="p-6 flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar src={app.jobseekerId?.photo_url} alt="Applicant" />
                  <div>
                    <Typography variant="h6">
                      {app.jobSeekerInfo?.full_name || 'Unknown Applicant'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      phone: {app.jobSeekerInfo?.phone_number || 'Phone N/A'}
                    </Typography>
                  </div>
                </div>

                <div className="space-y-2">
                  <Typography variant="body1">
                    <strong>Applied On:</strong> {new Date(app.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Privacy:</strong> {app.jobseekerId?.privacy_level}
                  </Typography>
                </div>

                <div className="flex flex-wrap gap-2">
                  {app.resumeUrl && (
                    <Button
                      variant="outlined"
                      startIcon={<LaunchIcon />}
                      onClick={() => handleViewResume(app.resumeUrl)}
                    >
                      View Resume
                    </Button>
                  )}

                  {app.approve === true ? (
                    <Typography variant="body1" color="success">
                      Approved
                    </Typography>
                  ) : app.approve === false ? (
                    <Typography variant="body1" color="error">
                      Rejected
                    </Typography>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApprove(app._id)}
                      >
                        Approve
                      </Button>

                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleReject(app._id)}
                      >
                        Reject
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAnalyzeFit(app.resumeUrl, app.jobId?.description || '')}
                      >
                        Check Fit
                      </Button>
                    </>
                  )}
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Fit Analysis Dialog */}
      <Dialog open={fitDialogOpen} onClose={() => setFitDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Fit Analysis</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
            {fitAnalysis}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFitDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Applications;