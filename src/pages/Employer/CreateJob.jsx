import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, Fab, Chip, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const CreateJobs = () => {
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
    jobType: 'Full-time',
    workType: 'Hybrid',
    skillsRequired: [],
    expiresAt: ''
  });

  const {token,profile} = useAuth(); // 🔥 Replace this with your real token!

  // Dummy fallback jobs
  const dummyJobs = [
    {
      title: "Frontend Developer",
      description: "Work with React and TailwindCSS",
      companyName: "TechCorp",
      location: "Remote",
      salary: "₹8 LPA",
      skillsRequired: ["React", "JavaScript", "CSS"]
    },
    {
      title: "Backend Developer",
      description: "Build APIs with Node.js",
      companyName: "DevSolutions",
      location: "Bangalore",
      salary: "₹10 LPA",
      skillsRequired: ["Node.js", "Express", "MongoDB"]
    }
  ];

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('https://jobbackend-kotd.onrender.com/api/job/my-jobs', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("res ",res.data);
      if (res?.data && Array.isArray(res.data)) {
        setJobs(res.data);
      } else {
        console.warn('API returned undefined or wrong format. Using dummy jobs.');
        setJobs(dummyJobs);
      }
    } catch (error) {
      console.error('Error fetching jobs, using dummy jobs.', error);
      setJobs(dummyJobs);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
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
        companyName: '',
        companyUrl: '',
        logoUrl: '',
        location: '',
        salary: '',
        jobType: 'Full-time',
        workType: 'Hybrid',
        skillsRequired: [],
        expiresAt: ''
      });
      fetchJobs(); // refresh the list
    } catch (error) {
      console.error('Failed to create job', error);
    }
  };

  const handleDelete = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
    // Optional: API call to delete from backend
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold mb-2">{job.title}</h2>
              <IconButton onClick={() => handleDelete(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
            <h3 className="text-lg text-gray-700 mb-2">{profile.company_name}</h3>
            <p className="text-gray-600 mb-4">{job.description}</p>
            <p className="text-gray-600 mb-4">Applicants : {job.numberOfApplicants} / {job.maxApplicants}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skillsRequired?.map((skill, i) => (
                <Chip key={i} label={skill} size="small" />
              ))}
            </div>
            <p className="text-gray-600 mb-4">
  Expires At: {new Date(job.expiresAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{job.location}</span>
              <span>{job.salary}</span>
            </div>
            
          </div>
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
  value={newJob.expiresAt ? newJob.expiresAt.split('T')[0] : ''} // Only take '2025-08-01' part
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