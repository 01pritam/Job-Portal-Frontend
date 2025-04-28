import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Fab, 
  Chip, 
  IconButton, 
  Paper,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const CreateJobs = () => {
  const { token, profile } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    companyName: '',
    companyUrl: '',
    logoUrl: '',
    location: '',
    salary: '',
    maxApplicants: '',
    jobType: 'Full-time',
    workType: 'Hybrid',
    skillsRequired: [],
    expiresAt: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://jobbackend-kotd.onrender.com/api/job/my-jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res?.data) {
        setJobs(res.data);
      }
    } catch (error) {
      console.error('Error fetching jobs', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    newJob.companyName=profile.company_name;
    e.preventDefault();
    try {
      await axios.post('https://jobbackend-kotd.onrender.com/api/job/jobs', newJob, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      handleClose();
      setNewJob({
        title: '',
        description: '',
        companyName:'',
        companyUrl: '',
        logoUrl: '',
        location: '',
        salary: '',
        maxApplicants: '',
        jobType: 'Full-time',
        workType: 'Hybrid',
        skillsRequired: [],
        expiresAt: ''
      });
      fetchJobs();
    } catch (error) {
      console.error('Failed to create job', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jobbackend-kotd.onrender.com/api/job/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchJobs();
    } catch (error) {
      console.error('Failed to delete job', error);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (job.companyName && job.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleJobClick = (jobId) => {
    navigate(`/employer/applications/${jobId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Search Bar */}
      <div className="mb-8">
        <TextField
          fullWidth
          label="Search jobs"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job, index) => (
          <Paper 
            key={index}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition"
            onClick={() => handleJobClick(job._id)}
          >
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold mb-2">{job.title}</h2>
              <IconButton onClick={(e) => {
                e.stopPropagation();
                handleDelete(job._id);
              }}>
                <DeleteIcon />
              </IconButton>
            </div>
            <h3 className="text-lg text-gray-700 mb-2">{profile.company_name}</h3>
            <p className="text-gray-600 mb-4">{job.description?.slice(0, 70)}...</p>
            <p className="text-gray-600 mb-2">Applicants : {job.numberOfApplicants} / {job.maxApplicants}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skillsRequired?.map((skill, i) => (
                <Chip key={i} label={skill} size="small" />
              ))}
            </div>
            <p className="text-gray-500 text-sm">
              Expires At: {job.expiresAt ? new Date(job.expiresAt).toLocaleDateString() : 'N/A'}
            </p>
          </Paper>
        ))}
      </div>

      {/* Create Job FAB */}
      <Fab
        color="primary"
        className="fixed bottom-8 right-8"
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>

      {/* Create Job Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Create New Job</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <TextField
              fullWidth
              label="Job Title"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            />
            <TextField
              fullWidth
              label="Company Name"
              value={profile.company_name}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              label="Location"
              value={newJob.location}
              onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
            />
            <TextField
              fullWidth
              label="Salary"
              value={newJob.salary}
              onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
            />
            <TextField
              fullWidth
              label="Max Applicants"
              value={newJob.maxApplicants}
              onChange={(e) => setNewJob({ ...newJob, maxApplicants: e.target.value })}
            />
            <TextField
              fullWidth
              label="Expires At"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={newJob.expiresAt ? newJob.expiresAt.split('T')[0] : ''}
              onChange={(e) => setNewJob({ ...newJob, expiresAt: e.target.value })}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Create Job</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateJobs;