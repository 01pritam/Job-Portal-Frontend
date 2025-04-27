import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Avatar, 
  Button, 
  Chip, 
  Grid, 
  Paper, 
  Divider, 
  IconButton, 
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Business as BusinessIcon, 
  Language as LanguageIcon, 
  Verified as VerifiedIcon, 
  Star as StarIcon, 
  Upload as UploadIcon, 
  Save as SaveIcon 
} from '@mui/icons-material';
import axios from 'axios';

const CompanyProfile = ({ employerId, isEditable = true }) => {
  const [employer, setEmployer] = useState({
    firstName: "pr",
    lastName: "kr",
    company_name: "Dummy Company",
    company_url: "https://dummycompany.com",
    logo: "https://dummycompany.com/logo.png", // Changed to logo
    profile: "We are a dummy company providing dummy services.",
    phone_number: "39202",
    membership_package: "premium",
    featured: true,
    complete_profile: true
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [openMembershipDialog, setOpenMembershipDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    company_name: 'Dummy Company',
    company_url: 'https://dummycompany.com',
    logo: 'https://dummycompany.com/logo.png', // Changed to logo
    profile: 'We are a dummy company providing dummy services.',
    membership_package: 'premium',
    featured: true,
    complete_profile: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const payload = new FormData();
  
      // Append all fields manually into FormData
      payload.append('company_name', formData.company_name);
      payload.append('company_url', formData.company_url);
      payload.append('profile', formData.profile);
      payload.append('membership_package', formData.membership_package);
      payload.append('featured', formData.featured);
      payload.append('complete_profile', formData.complete_profile);
  
      if (formData.logo) {
        payload.append('logo', formData.logo); // Attach logo file
      }
  
      // If you want, uncomment this
      // payload.append('role', 'Employer');
  
      const response = await axios.post(
        `https://jobbackend-kotd.onrender.com/api/profile/saveprofile`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            // ⚡ Don't set Content-Type manually when sending FormData!
            // Let browser set it automatically with correct boundary
          }
        }
      );
  
      setEmployer(response.data);
      setEditMode(false);
      setShowSuccess(true);
  
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError('Failed to update profile');
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result }); // Changed to logo
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography variant="h5">Loading profile...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {showSuccess && <Alert severity="success" className="mb-4">Profile updated successfully!</Alert>}
      
      <Grid container spacing={4}>
        {/* Left Side: Avatar and Membership Info */}
        <Grid item xs={12} md={4} className="flex justify-center items-center">
          <Paper elevation={4} className="p-4 w-full max-w-xs">
            <Box className="relative">
              <Avatar 
                src={editMode ? formData.logo : employer.logo} // Changed to logo
                alt={formData.company_name} 
                sx={{ width: 120, height: 120, border: 3, borderColor: 'grey.300' }}
              >
                <BusinessIcon fontSize="large" />
              </Avatar>
              {editMode && (
                <Box className="absolute bottom-0 right-0">
                  <input 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                    id="logo-upload" 
                    type="file" 
                    onChange={handleLogoUpload} 
                  />
                  <label htmlFor="logo-upload">
                    <IconButton component="span" color="primary" size="small">
                      <UploadIcon />
                    </IconButton>
                  </label>
                </Box>
              )}
            </Box>

            <Box className="mt-4 text-center">
              <Typography variant="h6">{employer.company_name}</Typography>
              <Chip 
                label={`Membership: ${employer.membership_package}`} 
                color={employer.membership_package === 'premium' ? 'primary' : 'default'}
                className="mt-2"
              />
              {employer.featured && (
                <Chip 
                  icon={<StarIcon />} 
                  label="Featured" 
                  color="warning" 
                  className="mt-2" 
                />
              )}
            </Box>

            {isEditable && !editMode && (
              <Box className="mt-4 text-center">
                <Button 
                  variant="outlined" 
                  startIcon={<EditIcon />} 
                  onClick={() => setEditMode(true)} 
                  size="small"
                >
                  Edit Profile
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Right Side: Profile Info */}
        <Grid item xs={12} md={8}>
          {editMode ? (
            <Paper elevation={4} className="p-4">
              <Typography variant="h5">Edit Profile</Typography>

              <TextField
                fullWidth
                label="Company Name"
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                required
              />

              <TextField
                fullWidth
                label="Company Website"
                name="company_url"
                value={formData.company_url}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                placeholder="https://example.com"
              />

              <TextField
                fullWidth
                label="Company Profile"
                name="profile"
                value={formData.profile}
                onChange={handleInputChange}
                margin="normal"
                variant="outlined"
                multiline
                rows={6}
                placeholder="Describe your company, mission, values, and what you're looking for in candidates."
              />

              <Box className="flex items-center mt-4">
                <FormControl className="w-48 mr-4">
                  <InputLabel>Membership</InputLabel>
                  <Select
                    name="membership_package"
                    value={formData.membership_package}
                    onChange={handleInputChange}
                    label="Membership"
                  >
                    <MenuItem value="free">Free</MenuItem>
                    <MenuItem value="standard">Standard</MenuItem>
                    <MenuItem value="premium">Premium</MenuItem>
                  </Select>
                </FormControl>

                <Box className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label htmlFor="featured">Featured Company</label>
                </Box>
              </Box>

              <Box className="mt-6 flex justify-end">
                <Button 
                  variant="outlined" 
                  onClick={() => setEditMode(false)}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </Box>
            </Paper>
          ) : (
            <Paper elevation={4} className="p-4">
              <Typography variant="h6">Company Profile</Typography>
              {/* <Typography variant="body1" paragraph>{employer.profile}</Typography> */}
              <Typography variant="body1">Website: <a href={employer.company_url} target="_blank" rel="noopener noreferrer">{employer.company_url}</a></Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CompanyProfile;
