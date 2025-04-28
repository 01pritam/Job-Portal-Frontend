import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button,
  IconButton, 
  Chip,
  Badge,
  CircularProgress,
  Snackbar,
  Alert,
  TextField
} from '@mui/material';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Favorite as FavoriteIcon,
  Event as EventIcon,
  Person as PersonIcon,
  AccessTime as AccessTimeIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon,
  Check as CheckIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  Category as CategoryIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const ApplyJobs = () => {
  const { token } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [uploadResume, setUploadResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    workType: '',
    category: '',
    salary: ''
  });

  // States for Job Agent management
  const [agents, setAgents] = useState([]);
  const [agentForm, setAgentForm] = useState({
    keywords: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    jobType: '',
    workType: '',
    skills: '',
    email: ''
  });
  const [editingAgentId, setEditingAgentId] = useState(null);
  const [agentError, setAgentError] = useState('');
  const [agentSuccess, setAgentSuccess] = useState('');

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://jobbackend-kotd.onrender.com/api/job/jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(response.data);
      if (response.data.length > 0) {
        setSelectedJob(response.data[0]);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const fetchAgents = async () => {
    try {
      const res = await axios.get('https://jobbackend-kotd.onrender.com/api/agent/agents', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAgents(res.data);
    } catch (err) {
      console.error(err);
      setAgentError('Failed to fetch agents');
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchAgents();
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  // Both Quick Apply buttons now open the dialog.
  const handleJobClickQuickApply = (job) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  // Job Agent handlers
  const handleAgentInputChange = (e) => {
    const { name, value } = e.target;
    setAgentForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAgentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAgentId) {
        await axios.put(`https://jobbackend-kotd.onrender.com/api/agent/edit/${editingAgentId}`, agentForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAgentSuccess('Agent updated successfully!');
      } else {
        await axios.post(`https://jobbackend-kotd.onrender.com/api/agent/add`, agentForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAgentSuccess('Agent added successfully!');
      }
      setAgentForm({
        keywords: '',
        location: '',
        salaryMin: '',
        salaryMax: '',
        jobType: '',
        workType: '',
        skills: '',
        email: ''
      });
      setEditingAgentId(null);
      fetchAgents();
    } catch (err) {
      console.error(err);
      setAgentError('Failed to submit agent');
    }
  };

  const handleAgentEdit = (agent) => {
    setEditingAgentId(agent._id);
    setAgentForm({
      keywords: agent.keywords ? agent.keywords.join(', ') : '',
      location: agent.location || '',
      salaryMin: agent.salaryMin || '',
      salaryMax: agent.salaryMax || '',
      jobType: agent.jobType || '',
      workType: agent.workType || '',
      skills: agent.skills ? agent.skills.join(', ') : '',
      email: agent.email || ''
    });
  };

  const handleAgentDelete = async (agentId) => {
    try {
      await axios.delete(`https://jobbackend-kotd.onrender.com/api/agent/delete/${agentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAgentSuccess('Agent deleted successfully!');
      fetchAgents();
    } catch (err) {
      console.error(err);
      setAgentError('Failed to delete agent');
    }
  };

  const handleSubmitApplication = async () => {
    try {
      const formData = new FormData();
      formData.append('resume', uploadResume);
      formData.append('coverLetter', coverLetter);
  
      await axios.post(`https://jobbackend-kotd.onrender.com/api/job/jobs/${selectedJob._id}/apply`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      setOpenDialog(false);
      setError('Application submitted successfully!');
      setUploadResume(null);
      setCoverLetter('');
    } catch (err) {
      console.error(err);
      setError('Failed to submit application');
    }
  };

  const handleAgentActivate = async (agentId) => {
    try {
      await axios.get(`https://jobbackend-kotd.onrender.com/api/agent`, { active: true }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAgentSuccess('Agent activated successfully!');
      fetchAgents();
    } catch (err) {
      console.error(err);
      setAgentError('Failed to activate agent');
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
    <div className="max-w-screen-xl mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Job Listing Section */}
      <div className="flex flex-wrap gap-3 mb-6 items-center bg-white p-4 rounded-lg shadow">
        <Button 
          variant="contained" 
          color="primary"
          endIcon={<KeyboardArrowDownIcon />}
        >
          All Jobs
        </Button>
        
        <Button 
          variant="outlined"
          startIcon={<FilterListIcon />}
          className="bg-white"
        >
          <Badge badgeContent={Object.keys(filters).filter(k => filters[k]).length} color="primary">
            Filters
          </Badge>
        </Button>
        
        <Button 
          variant="outlined"
          startIcon={<LocationIcon />}
          className="bg-white"
        >
          Location
        </Button>
        
        <Button 
          variant="outlined"
          startIcon={<WorkIcon />}
          className="bg-white"
        >
          Work Type
        </Button>
        
        <Button 
          variant="outlined"
          startIcon={<CategoryIcon />}
          className="bg-white"
        >
          Category
        </Button>
        
        <div className="flex-grow" />
        
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => handleJobClickQuickApply(selectedJob)}
        >
          Quick Apply
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          {jobs.map((job) => (
            <div 
              key={job._id}
              className={`bg-white p-4 rounded-lg shadow-sm cursor-pointer transition-all hover:shadow-md
                ${selectedJob?._id === job._id ? 'border-l-4 border-blue-500' : ''}`}
              onClick={() => handleJobClick(job)}
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  {job.companyLogo ? (
                    <img src={job.companyLogo} alt={job.company} className="w-10 h-10 object-contain" />
                  ) : (
                    <WorkIcon className="text-gray-400" />
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <LocationIcon fontSize="small" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <AccessTimeIcon fontSize="small" />
                      {job.deadline}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {job.tags?.map((tag, index) => (
                      <Chip 
                        key={index}
                        label={tag}
                        size="small"
                        className="bg-gray-100"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedJob && (
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  {selectedJob.companyLogo ? (
                    <img 
                      src={selectedJob.companyLogo} 
                      alt={selectedJob.company} 
                      className="w-14 h-14 object-contain"
                    />
                  ) : (
                    <WorkIcon className="text-gray-400 text-3xl" />
                  )}
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {selectedJob.title}
                  </h2>
                  <p className="text-lg text-gray-600">{selectedJob.company}</p>
                  <div className="flex items-center gap-4 mt-2 text-gray-500">
                    <span className="flex items-center gap-1">
                      <LocationIcon />
                      {selectedJob.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <WorkIcon />
                      {selectedJob.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <EventIcon />
                      Posted {selectedJob.postedDate}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <IconButton>
                    <FavoriteIcon />
                  </IconButton>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => handleJobClickQuickApply(selectedJob)}
                  >
                    Quick Apply
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-gray-500">Salary Range</p>
                  <p className="text-xl font-semibold mt-1">{selectedJob.salary}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500">Experience</p>
                  <p className="text-xl font-semibold mt-1">{selectedJob.experience}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500">Applications</p>
                  <p className="text-xl font-semibold mt-1">{selectedJob.applications}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Job Description</h3>
              <div className="prose max-w-none">
                {selectedJob.description}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Requirements</h3>
              <ul className="list-disc pl-5 space-y-2">
                {selectedJob.requirements?.map((req, index) => (
                  <li key={index} className="text-gray-700">{req}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Job Search Agent Management Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mt-10">
        <h2 className="text-2xl font-semibold mb-4">Job Search Agents</h2>
        {/* Agent Form */}
        <form onSubmit={handleAgentSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <TextField
            label="Keywords (comma separated)"
            name="keywords"
            value={agentForm.keywords}
            onChange={handleAgentInputChange}
            fullWidth
          />
          <TextField
            label="Location"
            name="location"
            value={agentForm.location}
            onChange={handleAgentInputChange}
            fullWidth
          />
          <TextField
            label="Salary Min"
            name="salaryMin"
            type="number"
            value={agentForm.salaryMin}
            onChange={handleAgentInputChange}
            fullWidth
          />
          <TextField
            label="Salary Max"
            name="salaryMax"
            type="number"
            value={agentForm.salaryMax}
            onChange={handleAgentInputChange}
            fullWidth
          />
          <TextField
            label="Job Type"
            name="jobType"
            value={agentForm.jobType}
            onChange={handleAgentInputChange}
            fullWidth
          />
          <TextField
            label="Work Type"
            name="workType"
            value={agentForm.workType}
            onChange={handleAgentInputChange}
            fullWidth
          />
          <TextField
            label="Skills (comma separated)"
            name="skills"
            value={agentForm.skills}
            onChange={handleAgentInputChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={agentForm.email}
            onChange={handleAgentInputChange}
            fullWidth
          />
          <div className="md:col-span-2 flex gap-4">
            <Button type="submit" variant="contained" color="primary">
              {editingAgentId ? 'Update Agent' : 'Add Agent'}
            </Button>
            {editingAgentId && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setEditingAgentId(null);
                  setAgentForm({
                    keywords: '',
                    location: '',
                    salaryMin: '',
                    salaryMax: '',
                    jobType: '',
                    workType: '',
                    skills: '',
                    email: ''
                  });
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
        
        {/* List of Agents */}
        <div className="space-y-4">
          {agents.map((agent) => (
            <div key={agent._id} className="border p-4 rounded-md flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  Keywords: {agent.keywords && agent.keywords.join(', ')}
                </p>
                <p>Location: {agent.location}</p>
                <p>Salary Range: {agent.salaryMin} - {agent.salaryMax}</p>
                <p>Job Type: {agent.jobType}</p>
                <p>Work Type: {agent.workType}</p>
                <p>Skills: {agent.skills && agent.skills.join(', ')}</p>
                <p>Email: {agent.email}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outlined" size="small" onClick={() => handleAgentEdit(agent)}>
                  Edit
                </Button>
                <Button variant="outlined" color="success" size="small" onClick={() => handleAgentActivate(agent._id)}>
                  Activate
                </Button>
                <Button variant="outlined" color="error" size="small" onClick={() => handleAgentDelete(agent._id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError('')}
      >
        <Alert severity={error.includes('success') ? 'success' : 'error'} onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar 
        open={!!agentError || !!agentSuccess} 
        autoHideDuration={6000} 
        onClose={() => {
          setAgentError('');
          setAgentSuccess('');
        }}
      >
        <Alert 
          severity={agentError ? 'error' : 'success'} 
          onClose={() => {
            setAgentError('');
            setAgentSuccess('');
          }}
        >
          {agentError || agentSuccess}
        </Alert>
      </Snackbar>

      {/* Quick Apply Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
        <DialogContent className="space-y-4">
          <input 
            type="file"
            accept="application/pdf"
            onChange={(e) => setUploadResume(e.target.files[0])}
          />
          <TextField
            label="Cover Letter"
            multiline
            rows={4}
            fullWidth
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmitApplication} 
            variant="contained"
            disabled={!uploadResume}
          >
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ApplyJobs;