import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Switch,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
  AttachFile as AttachFileIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const Profile = () => {
  const [newSkill, setNewSkill] = useState('');
  const [resume, setResume] = useState(null);
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
    education: []
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileData({ ...profileData, avatar: URL.createObjectURL(file) });
    }
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...profileData.experience];
    newExperience[index][field] = value;
    setProfileData({ ...profileData, experience: newExperience });
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...profileData.education];
    newEducation[index][field] = value;
    setProfileData({ ...profileData, education: newEducation });
  };

  const handleDeleteExperience = (index) => {
    const newExperience = profileData.experience.filter((_, i) => i !== index);
    setProfileData({ ...profileData, experience: newExperience });
  };

  const handleDeleteEducation = (index) => {
    const newEducation = profileData.education.filter((_, i) => i !== index);
    setProfileData({ ...profileData, education: newEducation });
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <Card className="mb-6 shadow-lg">
        <CardContent className="space-y-8">
          {/* Header Profile Section */}
          <div className="flex items-center space-x-6 bg-gray-50 p-6 rounded-lg">
            <div className="relative">
              <Avatar
                src={profileData.avatar}
                sx={{ width: 120, height: 120 }}
                className="border-4 border-white shadow-md"
              />
              <input
                type="file"
                id="avatar-upload"
                hidden
                onChange={handleFileUpload}
                accept="image/*"
              />
              <label htmlFor="avatar-upload">
                <IconButton
                  component="span"
                  className="absolute bottom-0 right-0 bg-white shadow-lg"
                >
                  <CloudUploadIcon />
                </IconButton>
              </label>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="First Name"
                  value={profileData.firstName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, firstName: e.target.value })
                  }
                  variant="filled"
                />
                <TextField
                  label="Last Name"
                  value={profileData.lastName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, lastName: e.target.value })
                  }
                  variant="filled"
                />
              </div>
            </div>
          </div>

          <Divider />

          {/* Contact Information */}
          <section className="space-y-4">
            <Typography variant="h6" className="font-bold">
              Contact Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  value={profileData.location}
                  onChange={(e) =>
                    setProfileData({ ...profileData, location: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </section>

          <Divider />

          {/* About Section */}
          <section className="space-y-4">
            <Typography variant="h6" className="font-bold">
              About Me
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={profileData.about}
              onChange={(e) =>
                setProfileData({ ...profileData, about: e.target.value })
              }
              placeholder="Write a brief introduction about yourself..."
            />
          </section>

          <Divider />

          {/* Experience Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <Typography variant="h6" className="font-bold">
                Experience
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() =>
                  setProfileData({
                    ...profileData,
                    experience: [
                      ...profileData.experience,
                      { company: '', position: '', duration: '', description: '' }
                    ]
                  })
                }
              >
                Add Experience
              </Button>
            </div>
            {profileData.experience.map((exp, index) => (
              <Card key={index} variant="outlined" className="p-4 relative">
                <IconButton
                  className="absolute top-2 right-2"
                  onClick={() => handleDeleteExperience(index)}
                >
                  <DeleteIcon />
                </IconButton>
                <Grid container spacing={3} className="mt-2">
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Company"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Position"
                      value={exp.position}
                      onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Duration"
                      value={exp.duration}
                      onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      label="Description"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Card>
            ))}
          </section>

          <Divider />

          {/* Education Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <Typography variant="h6" className="font-bold">
                Education
              </Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() =>
                  setProfileData({
                    ...profileData,
                    education: [
                      ...profileData.education,
                      { institution: '', degree: '', year: '', field: '' }
                    ]
                  })
                }
              >
                Add Education
              </Button>
            </div>
            {profileData.education.map((edu, index) => (
              <Card key={index} variant="outlined" className="p-4 relative">
                <IconButton
                  className="absolute top-2 right-2"
                  onClick={() => handleDeleteEducation(index)}
                >
                  <DeleteIcon />
                </IconButton>
                <Grid container spacing={3} className="mt-2">
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Institution"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Year"
                      value={edu.year}
                      onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Field of Study"
                      value={edu.field}
                      onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Card>
            ))}
          </section>

          <Divider />

          {/* Skills Section */}
          <section className="space-y-4">
            <Typography variant="h6" className="font-bold">
              Skills
            </Typography>
            <form onSubmit={handleAddSkill} className="flex gap-2">
              <TextField
                fullWidth
                label="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="e.g. React, JavaScript, Node.js"
              />
              <Button type="submit" variant="contained" startIcon={<AddIcon />}>
                Add
              </Button>
            </form>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => {
                    const newSkills = profileData.skills.filter((_, i) => i !== index);
                    setProfileData({ ...profileData, skills: newSkills });
                  }}
                />
              ))}
            </div>
          </section>

          <Divider />

          {/* Resume Section */}
          <section className="space-y-4">
            <Typography variant="h6" className="font-bold">
              Resume
            </Typography>
            <div className="flex items-center gap-4">
              <input
                type="file"
                id="resume-upload"
                hidden
                onChange={handleResumeUpload}
                accept=".pdf"
              />
              <label htmlFor="resume-upload">
                <Button variant="outlined" component="span" startIcon={<AttachFileIcon />}>
                  Upload Resume (PDF)
                </Button>
              </label>
              {resume && (
                <Typography variant="body2" color="textSecondary">
                  {resume.name}
                </Typography>
              )}
            </div>
          </section>

          <Divider />

          {/* Privacy Settings */}
          <section className="space-y-4">
            <Typography variant="h6" className="font-bold">
              Privacy Settings
            </Typography>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <Typography>Hide Contact Information</Typography>
                <Switch
                  checked={profileData.privacy.hideContact}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      privacy: { ...profileData.privacy, hideContact: e.target.checked }
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <Typography>Hide Resume from Employers</Typography>
                <Switch
                  checked={profileData.privacy.hideResume}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      privacy: { ...profileData.privacy, hideResume: e.target.checked }
                    })
                  }
                />
              </div>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button variant="contained" color="primary" size="large">
              Save Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;