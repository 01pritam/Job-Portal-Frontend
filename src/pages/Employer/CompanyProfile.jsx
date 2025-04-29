import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Avatar, Button, Chip, Grid, Paper, IconButton, TextField,
  FormControl, InputLabel, MenuItem, Select, Dialog, DialogTitle, DialogContent, DialogActions,
  Snackbar, Alert
} from '@mui/material';
import {
  Edit as EditIcon, Business as BusinessIcon, Star as StarIcon,
  Upload as UploadIcon, Save as SaveIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import imageCompression from 'browser-image-compression';

const CompanyProfile = ({ employerId, isEditable = true }) => {
  const { token, profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [membershipDialogOpen, setMembershipDialogOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState('');
  const [membershipAmount, setMembershipAmount] = useState(0);

  const [formData, setFormData] = useState({
    user_id: '',
    company_name: '',
    company_url: '',
    logo_url: '',
    logo_file: null,
    phone_number: '',
    membership_package: 'free',
    featured: false,
    complete_profile: false,
    profile: '',
    name: '',
    email: ''
  });

  useEffect(() => {
    if (profile) {
      console.log("com ",profile);
      setFormData(prev => ({
        ...prev,
        user_id: profile.user_id || '',
        company_name: profile.company_name || '',
        company_url: profile.company_url || '',
        logo_url: profile.logo_url || '',
        phone_number: profile.phone_number || '',
        membership_package: profile.membership_package || 'free',
        featured: profile.featured || false,
        complete_profile: profile.complete_profile || false,
        profile: profile.profile || '',
        name: profile.name || '',
        email: profile.email || ''
      }));
      setLoading(false);
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'membership_package') {
      const price = value === 'premium' ? 5000 : value === 'standard' ? 3000 : 0;
      setSelectedMembership(value);
      setMembershipAmount(price);
      if (value !== formData.membership_package) {
        setMembershipDialogOpen(true);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 500,
          useWebWorker: true
        };
        const compressed = await imageCompression(file, options);
        const logoPreview = await imageCompression.getDataUrlFromFile(compressed);
        setFormData(prev => ({
          ...prev,
          logo_file: compressed,
          logo_url: logoPreview
        }));
      } catch {
        setError('Image upload failed');
      }
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'logo_url' && key !== 'logo_file') {
          data.append(key, value);
        }
      });
      if (formData.logo_file) {
        data.append('logo', formData.logo_file);
      }

      const res = await axios.post(
        'https://jobbackend-kotd.onrender.com/api/profile/saveprofile',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (res.data) {
        setSuccess('Profile updated successfully!');
        setEditMode(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) return alert('Razorpay SDK failed to load');

    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
      amount: membershipAmount * 100,
      currency: 'INR',
      name: 'Job Portal',
      description: `${selectedMembership} Membership Payment`,
      handler: function (response) {
        console.log('Payment Successful:', response);
        setFormData(prev => ({ ...prev, membership_package: selectedMembership }));
        setMembershipDialogOpen(false);
        setSuccess('Payment successful!');
      },
      prefill: {
        name: formData.company_name,
        email: formData.email,
        contact: formData.phone_number
      },
      theme: {
        color: '#3399cc'
      }
    };

    new window.Razorpay(options).open();
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Grid container spacing={4}>
        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className="p-6">
            <Box className="flex flex-col items-center">
              <div className="relative">
                <Avatar
                  src={formData.logo_url}
                  sx={{ width: 120, height: 120 }}
                >
                  <BusinessIcon fontSize="large" />
                </Avatar>
                {editMode && (
                  <div className="absolute bottom-0 right-0">
                    <input
                      accept="image/*"
                      type="file"
                      hidden
                      id="upload-logo"
                      onChange={handleLogoUpload}
                    />
                    <label htmlFor="upload-logo">
                      <IconButton component="span" className="bg-white shadow-md" size="small">
                        <UploadIcon />
                      </IconButton>
                    </label>
                  </div>
                )}
              </div>

              <Typography variant="h6" className="mt-4">{formData.company_name}</Typography>

              <Chip label={`${formData.membership_package} Package`} color={formData.membership_package === 'premium' ? 'primary' : 'default'} className="mt-2" />
              {formData.featured && (
                <Chip icon={<StarIcon />} label="Featured" color="warning" className="mt-2" />
              )}

              {isEditable && !editMode && (
                <Button variant="outlined" startIcon={<EditIcon />} className="mt-4" onClick={() => setEditMode(true)}>
                  Edit Profile
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Profile Form */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className="p-6">
            {editMode ? (
              <div className="space-y-4">
                <Typography variant="h6">Edit Company Profile</Typography>

                <TextField fullWidth label="Company Name" name="company_name" value={formData.company_name} onChange={handleInputChange} />
                <TextField fullWidth label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleInputChange} />
                <TextField fullWidth label="Company Website" name="company_url" value={formData.company_url} onChange={handleInputChange} />
                <TextField fullWidth multiline rows={5} label="Company Profile" name="profile" value={formData.profile} onChange={handleInputChange} />

                <FormControl fullWidth>
                  <InputLabel>Membership Package</InputLabel>
                  <Select
                    name="membership_package"
                    value={formData.membership_package}
                    onChange={handleInputChange}
                    label="Membership Package"
                  >
                    <MenuItem value="free">Free</MenuItem>
                    <MenuItem value="standard">Standard</MenuItem>
                    <MenuItem value="premium">Premium</MenuItem>
                  </Select>
                </FormControl>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outlined" onClick={() => setEditMode(false)}>Cancel</Button>
                  <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Typography variant="h6">Company Profile</Typography>
                <Typography>{formData.profile || 'No profile provided.'}</Typography>
                {formData.company_url && <Typography>Website: <a href={formData.company_url} target="_blank" rel="noopener noreferrer">{formData.company_url}</a></Typography>}
                {formData.phone_number && <Typography>Phone: {formData.phone_number}</Typography>}
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Membership Dialog */}
      <Dialog open={membershipDialogOpen} onClose={() => setMembershipDialogOpen(false)}>
        <DialogTitle>Confirm Membership Upgrade</DialogTitle>
        <DialogContent>
          <Typography>You are about to switch to the <strong>{selectedMembership}</strong> package.</Typography>
          <Typography>Amount: ₹{membershipAmount / 100}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMembershipDialogOpen(false)}>Cancel</Button>
          <Button onClick={handlePayment} variant="contained">Pay Now</Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Alerts */}
      <Snackbar open={!!success} autoHideDuration={4000} onClose={() => setSuccess('')}>
        <Alert severity="success">{success}</Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Container>
  );
};

export default CompanyProfile;