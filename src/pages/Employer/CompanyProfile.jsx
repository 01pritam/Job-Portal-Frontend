import React, { useEffect, useState } from 'react';
import { 
  Box, Container, Typography, Avatar, Button, Chip, Grid, Paper, IconButton, TextField,
  FormControl, InputLabel, MenuItem, Select, Alert, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { 
  Edit as EditIcon, Business as BusinessIcon, Star as StarIcon, Upload as UploadIcon, Save as SaveIcon 
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const CompanyProfile = ({ employerId, isEditable = true }) => {
  const { token, profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [success, setSuccess] = useState('');
  const [membershipDialogOpen, setMembershipDialogOpen] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState('');
  const [membershipAmount, setMembershipAmount] = useState(0);

  const [formData, setFormData] = useState({
    user_id: '',
    company_name: '',
    company_url: '',
    logo_url: '',
    phone_number: '',
    membership_package: 'free',
    featured: false,
    complete_profile: false,
    profile: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        user_id: profile.user_id || '',
        company_name: profile.company_name || '',
        company_url: profile.company_url || '',
        logo_url: profile.logo_url || '',
        phone_number: profile.phone_number || '',
        membership_package: profile.membership_package || 'free',
        featured: profile.featured || false,
        complete_profile: profile.complete_profile || false,
        profile: profile.profile || ''
      });
      setLoading(false);
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'membership_package') {
      setSelectedMembership(value);
      setMembershipAmount(value === 'premium' ? 5000 : value === 'standard' ? 3000 : 0); // ₹50 or ₹30 (paise)
      setMembershipDialogOpen(true);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setFormData(prev => ({ ...prev, logo_url: base64 }));
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

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://jobbackend-kotd.onrender.com/api/profile/saveprofile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
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
  
    if (!res) {
      alert('Failed to load Razorpay SDK. Are you online?');
      return;
    }
  
    if (!membershipAmount || membershipAmount <= 0) {
      alert('Invalid amount. Please select a valid membership.');
      return;
    }
  
    const options = {
      key: 'YOUR_RAZORPAY_KEY', // 🔥 Very important: YOUR LIVE KEY or TEST KEY here
      amount: membershipAmount * 100, // 🔥 Razorpay takes amount in paise (₹1 = 100 paise)
      currency: 'INR',
      name: 'Job Portal',
      description: `${selectedMembership} Membership Payment`,
      handler: function (response) {
        console.log('Payment Success:', response);
        setSuccess('Payment successful!');
        setFormData(prev => ({ ...prev, membership_package: selectedMembership }));
        setMembershipDialogOpen(false);
      },
      prefill: {
        name: formData.company_name || 'Your Company Name',
        email: profile.email || 'test@example.com',
        contact: formData.phone_number || '9999999999'
      },
      theme: {
        color: '#3399cc'
      }
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  if (loading) {
    return (
      <Container>
        <Typography variant="h5" className="text-center py-8">
          Loading profile...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Grid container spacing={4}>
        {/* Profile Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className="p-6">
            <Box className="flex flex-col items-center">
              <div className="relative">
                <Avatar 
                  src={formData.logo_url}
                  alt={formData.company_name}
                  sx={{ width: 120, height: 120 }}
                  className="border-4 border-gray-200"
                >
                  <BusinessIcon fontSize="large" />
                </Avatar>
                {editMode && (
                  <div className="absolute bottom-0 right-0">
                    <input
                      accept="image/*"
                      type="file"
                      id="logo-upload"
                      hidden
                      onChange={handleLogoUpload}
                    />
                    <label htmlFor="logo-upload">
                      <IconButton component="span" className="bg-white shadow-md" size="small">
                        <UploadIcon />
                      </IconButton>
                    </label>
                  </div>
                )}
              </div>

              <Typography variant="h6" className="mt-4">
                {formData.company_name}
              </Typography>

              <Chip
                label={`${formData.membership_package} Package`}
                color={formData.membership_package === 'premium' ? 'primary' : 'default'}
                className="mt-2"
              />

              {formData.featured && (
                <Chip
                  icon={<StarIcon />}
                  label="Featured"
                  color="warning"
                  className="mt-2"
                />
              )}

              {isEditable && !editMode && (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => setEditMode(true)}
                  className="mt-4"
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Profile Details */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className="p-6">
            {editMode ? (
              <div className="space-y-4">
                <Typography variant="h6">Edit Company Profile</Typography>

                <TextField
                  fullWidth
                  label="Company Name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  required
                />

                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                />

                <TextField
                  fullWidth
                  label="Company Website"
                  name="company_url"
                  value={formData.company_url}
                  onChange={handleInputChange}
                />

                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="Company Profile"
                  name="profile"
                  value={formData.profile}
                  onChange={handleInputChange}
                />

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
                  <Button
                    variant="outlined"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Typography variant="h6">Company Profile</Typography>
                <Typography variant="body1">
                  {formData.profile || 'No profile information available.'}
                </Typography>
                {formData.company_url && (
                  <Typography variant="body1">
                    Website: <a href={formData.company_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{formData.company_url}</a>
                  </Typography>
                )}
                {formData.phone_number && (
                  <Typography variant="body1">
                    Phone: {formData.phone_number}
                  </Typography>
                )}
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Membership Payment Dialog */}
      <Dialog open={membershipDialogOpen} onClose={() => setMembershipDialogOpen(false)}>
        <DialogTitle>Upgrade to {selectedMembership} Package</DialogTitle>
        <DialogContent>
          <Typography>
            Pay ₹{membershipAmount / 100} to upgrade to {selectedMembership} membership.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMembershipDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handlePayment}>
            Pay Now
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error || !!success}
        autoHideDuration={6000}
        onClose={() => {
          setError(null);
          setSuccess('');
        }}
      >
        <Alert
          severity={error ? 'error' : 'success'}
          onClose={() => {
            setError(null);
            setSuccess('');
          }}
        >
          {error || success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CompanyProfile;