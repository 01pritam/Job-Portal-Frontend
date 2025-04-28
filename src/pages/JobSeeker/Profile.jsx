import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField, Button, Card, CardContent, Grid, Typography, Avatar,
  Chip, IconButton, Switch, Divider, Snackbar, Alert, Box
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon, AttachFile as AttachFileIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { token, profile } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    avatar: null,
    about: '',
    skills: [],
    privacy: {
      hideContact: false,
      hideResume: false,
    },
    experience: [],
    education: [],
    resumeUrl: null  // Added to store fetched resume URL
  });

  useEffect(() => {
    if (profile) {
      setProfileData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone_number || '',
        location: profile.location || '',
        avatar: profile.photo_url || profile.avatar || null, // Corrected to use photo_url if available
        about: profile.about || '',
        skills: profile.skills || [],
        privacy: profile.privacy || {
          hideContact: false,
          hideResume: false
        },
        experience: profile.experience || [],
        education: profile.education || [],
        resumeUrl: profile.resume_url || null // Set resumeUrl from profile
      });
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setProfileData(prev => ({ ...prev, avatar: base64 }));
      } catch (err) {
        setError('Failed to process image');
      }
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
    } else {
      setError('Please upload a PDF file');
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    } else {
      setError('Skill already exists or empty');
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToDelete)
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...profileData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setProfileData(prev => ({ ...prev, experience: newExperience }));
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...profileData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setProfileData(prev => ({ ...prev, education: newEducation }));
  };

  const handleAddExperience = () => {
    setProfileData(prev => ({
      ...prev,
      experience: [...prev.experience, { 
        company: '', position: '', startDate: '', endDate: '', description: '' 
      }]
    }));
  };

  const handleAddEducation = () => {
    setProfileData(prev => ({
      ...prev,
      education: [...prev.education, {
        institution: '', degree: '', field: '', graduationYear: ''
      }]
    }));
  };

  const handleDeleteExperience = (index) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleDeleteEducation = (index) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
  
      formData.append('user_id', profile?.user_id || '');
      formData.append('firstName', profileData.firstName);
      formData.append('lastName', profileData.lastName);
      formData.append('full_name', `${profileData.firstName} ${profileData.lastName}`);
      formData.append('phone_number', profileData.phone);
      formData.append('privacy_level', (profileData.privacy.hideContact || profileData.privacy.hideResume) ? 'private' : 'public');
      formData.append('complete_profile', 'true');
      formData.append('created_at', new Date().toISOString());
  
      if (profileData.avatar && profileData.avatar.startsWith('data:image')) {
        formData.append('photo', profileData.avatar);
      }
  
      if (resume) {
        formData.append('resume', resume);
      }
  
      formData.append('qualifications', JSON.stringify(
        profileData.education.map(edu => ({
          degree: edu.degree,
          institute: edu.institution,
          year: edu.graduationYear
        }))
      ));
  
      formData.append('experiences', JSON.stringify(
        profileData.experience.map(exp => ({
          job_title: exp.position,
          company: exp.company,
          duration: exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ""
        }))
      ));
  
      const response = await axios.post(
        'https://jobbackend-kotd.onrender.com/api/profile/saveprofile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      if (response.data) {
        setSuccess('Profile updated successfully!');
        setEditMode(false);
  
        // Immediately refetch updated profile after save
        await refetchProfile();
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const refetchProfile = async () => {
    try {
      const response = await axios.get('https://jobbackend-kotd.onrender.com/api/profile/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.data) {
        setProfileData(prev => ({
          ...prev,
          firstName: response.data.profile.firstName || '',
          lastName: response.data.profile.lastName || '',
          email: response.data.profile.email || '',
          phone: response.data.profile.phone_number || '',
          location: response.data.profile.location || '',
          avatar: response.data.profile.photo_url || null, // Corrected to use photo_url
          about: response.data.profile.about || '',
          skills: response.data.profile.skills || [],
          privacy: {
            hideContact: response.data.profile.privacy_level === 'private',
            hideResume: response.data.profile.privacy_level === 'private',
          },
          experience: response.data.profile.experiences || [],
          education: response.data.profile.qualifications || [],
          resumeUrl: response.data.profile.resume_url || null // Set resumeUrl from refetched profile
        }));
      }
    } catch (error) {
      console.error('Error refetching profile after save:', error);
    }
  };

  const handleEditClick = () => setEditMode(true);
  const handleCancelClick = () => setEditMode(false);

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <Card className="mb-6 shadow-lg">
        <CardContent className="space-y-8">
          <div className="flex justify-end">
            {!editMode ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleEditClick}
              >
                Edit Profile
              </Button>
            ) : (
              <div className="space-x-2">
                <Button variant="outlined" onClick={handleCancelClick}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            )}
          </div>

          <Box className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar
                src={profileData.avatar}
                sx={{ width: 120, height: 120 }}
                className="border-4 border-gray-200"
              />
              {editMode && (
                <>
                  <input
                    accept="image/*"
                    type="file"
                    id="avatar-upload"
                    hidden
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="avatar-upload">
                    <IconButton
                      component="span"
                      className="absolute bottom-0 right-0 bg-white shadow-lg"
                    >
                      <CloudUploadIcon />
                    </IconButton>
                  </label>
                </>
              )}
            </div>

            <Typography variant="h5">
              {profileData.firstName} {profileData.lastName}
            </Typography>
          </Box>

          <Divider />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={profileData.location}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </Grid>
          </Grid>

          <Divider />

          <div>
            <Typography variant="h6" className="mb-4">About Me</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="about"
              value={profileData.about}
              onChange={handleInputChange}
              disabled={!editMode}
              placeholder="Write something about yourself..."
            />
          </div>

          <Divider />

          <div>
            <Typography variant="h6" className="mb-4">Skills</Typography>
            {editMode && (
              <form onSubmit={handleAddSkill} className="flex gap-2 mb-4">
                <TextField
                  fullWidth
                  size="small"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                />
                <Button type="submit" variant="contained" startIcon={<AddIcon />}>
                  Add
                </Button>
              </form>
            )}
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={editMode ? () => handleDeleteSkill(skill) : undefined}
                  className="bg-blue-50"
                />
              ))}
            </div>
          </div>

          <Divider />

          <div>
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6">Experience</Typography>
              {editMode && (
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddExperience}
                >
                  Add Experience
                </Button>
              )}
            </div>
            {profileData.experience.map((exp, index) => (
              <Card key={index} className="mb-4 relative">
                {editMode && (
                  <IconButton
                    size="small"
                    className="absolute top-2 right-2"
                    onClick={() => handleDeleteExperience(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    fullWidth
                    label="Company"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    disabled={!editMode}
                  />
                  <TextField
                    fullWidth
                    label="Position"
                    value={exp.position}
                    onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                    disabled={!editMode}
                  />
                  <TextField
                    fullWidth
                    label="Start Date"
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                    disabled={!editMode}
                  />
                  <TextField
                    fullWidth
                    label="End Date"
                    value={exp.endDate}
                    onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                    disabled={!editMode}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Description"
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    disabled={!editMode}
                    className="md:col-span-2"
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <Divider />

          <div>
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6">Education</Typography>
              {editMode && (
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddEducation}
                >
                  Add Education
                </Button>
              )}
            </div>
            {profileData.education.map((edu, index) => (
              <Card key={index} className="mb-4 relative">
                {editMode && (
                  <IconButton
                    size="small"
                    className="absolute top-2 right-2"
                    onClick={() => handleDeleteEducation(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    fullWidth
                    label="Institution"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    disabled={!editMode}
                  />
                  <TextField
                    fullWidth
                    label="Degree"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    disabled={!editMode}
                  />
                  <TextField
                    fullWidth
                    label="Field of Study"
                    value={edu.field}
                    onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                    disabled={!editMode}
                  />
                  <TextField
                    fullWidth
                    label="Graduation Year"
                    value={edu.graduationYear}
                    onChange={(e) => handleEducationChange(index, 'graduationYear', e.target.value)}
                    disabled={!editMode}
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <Divider />

          <div>
            <Typography variant="h6" className="mb-4">Resume</Typography>
            <div className="flex items-center gap-4">
              {editMode ? (
                <>
                  <input
                    type="file"
                    id="resume-upload"
                    hidden
                    onChange={handleResumeUpload}
                    accept=".pdf"
                  />
                  <label htmlFor="resume-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      startIcon={<AttachFileIcon />}
                    >
                      Upload Resume (PDF)
                    </Button>
                  </label>
                </>
              ) : (
                profileData.resumeUrl && (
                  <Button
                    variant="outlined"
                    onClick={() => window.open(profileData.resumeUrl, '_blank')}
                  >
                    View Resume
                  </Button>
                )
              )}
              {/* Optionally, if a new resume has been selected in edit mode, show its name */}
              {resume && (
                <Typography variant="body2" color="textSecondary">
                  {resume.name}
                </Typography>
              )}
            </div>
          </div>

          <Divider />

          <div>
            <Typography variant="h6" className="mb-4">Privacy Settings</Typography>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Typography>Hide Contact Information</Typography>
                <Switch
                  checked={profileData.privacy.hideContact}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    privacy: { ...prev.privacy, hideContact: e.target.checked }
                  }))}
                  disabled={!editMode}
                />
              </div>
              <div className="flex items-center justify-between">
                <Typography>Hide Resume from Employers</Typography>
                <Switch
                  checked={profileData.privacy.hideResume}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    privacy: { ...prev.privacy, hideResume: e.target.checked }
                  }))}
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Snackbar
        open={!!error || !!success}
        autoHideDuration={6000}
        onClose={() => {
          setError('');
          setSuccess('');
        }}
      >
        <Alert
          severity={error ? 'error' : 'success'}
          onClose={() => {
            setError('');
            setSuccess('');
          }}
        >
          {error || success}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;