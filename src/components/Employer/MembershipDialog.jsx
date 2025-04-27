import React from 'react'

const MembershipDialog = () => {
  return (
    <div>
      <Dialog 
        open={openMembershipDialog} 
        onClose={() => setOpenMembershipDialog(false)}
        maxWidth="md"
      >
        <DialogTitle>
          <Typography variant="h5" className="font-bold">
            Upgrade Your Membership
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={3} className="mt-1">
            <Grid item xs={12} md={4}>
              <Card elevation={2} className={employer.membership_package === 'free' ? 'border-2 border-blue-500' : ''}>
                <CardContent className="text-center">
                  <Typography variant="h6" className="font-bold">
                    Free
                  </Typography>
                  <Typography variant="h4" className="my-4">
                    $0<Typography variant="caption">/month</Typography>
                  </Typography>
                  <Divider className="my-3" />
                  <Box className="text-left">
                    <Typography variant="body2" className="mb-2 flex items-center">
                      <VerifiedIcon fontSize="small" className="mr-2 text-green-500" />
                      Post up to 1 job
                    </Typography>
                    <Typography variant="body2" className="mb-2 flex items-center">
                      <VerifiedIcon fontSize="small" className="mr-2 text-green-500" />
                      Basic company profile
                    </Typography>
                    <Typography variant="body2" className="mb-2 flex items-center">
                      <VerifiedIcon fontSize="small" className="mr-2 text-green-500" />
                      7-day job listings
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="mt-4"
                    disabled={employer.membership_package === 'free'}
                    onClick={() => handleMembershipUpgrade('free')}
                  >
                    {employer.membership_package === 'free' ? 'Current Plan' : 'Downgrade'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card elevation={2} className={employer.membership_package === 'standard' ? 'border-2 border-blue-500' : ''}>
                <CardContent className="text-center">
                  <Typography variant="h6" className="font-bold">
                    Standard
                  </Typography>
                  <Typography variant="h4" className="my-4">
                    $49<Typography variant="caption">/month</Typography>
                  </Typography>
                  <Divider className="my-3" />
                  <Box className="text-left">
                    <Typography variant="body2" className="mb-2 flex items-center">
                      <VerifiedIcon fontSize="small" className="mr-2 text-green-500" />
                      Post up to 5 jobs
                    </Typography>
                    <Typography variant="body2" className="mb-2 flex items-center">
                      <VerifiedIcon fontSize="small" className="mr-2 text-green-500" />
                      Enhanced company profile
                    </Typography>
                    <Typography variant="body2" className="mb-2 flex items-center">
                      <VerifiedIcon fontSize="small" className="mr-2 text-green-500" />
                      30-day job listings
                    </Typography>
                    <Typography variant="body2" className="mb-2 flex items-center">
                      <VerifiedIcon fontSize="small" className="mr-2 text-green-500" />
                      Application tracking
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="mt-4"
                    disabled={employer.membership_package === 'standard'}
                    onClick={() => handleMembershipUpgrade('standard')}
                  >
                    {employer.membership_package === 'standard' ? 'Current Plan' : 
                     employer.membership_package === 'premium' ? 'Downgrade' : 'Upgrade'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card elevation={3} className={employer.membership_package === 'premium' ? 'border-2 border-blue-500' : ''}>
                <Box className="bg-purple-600 text-white py-1 text-center">
                  <Typography variant="subtitle2">MOST POPULAR</Typography>
                </Box>
                <CardContent className="text-center">
                  <Typography variant="h6" className="font-bold">
                    Premium
                  </Typography>
                  <Typography variant="h4" className="my-4">
                    $99<Typography variant="caption">/month</Typography>
                  </Typography>
                  <Divider className="my-3" />
                  <Box className="text-left">
                    <Typography variant="body2" className="mb-2 flex items-center">
                      <VerifiedIcon fontSize="small" className="mr-2 text-green-500" />
                      Unlimited job postings
                    </Typography>
                    <Typography variant="body2" className="mb-2 flex items-center">
                      <VerifiedIcon fontSize="small" className="mr-2 text-green-500" />
                      Featured company profile
                    </Typography>
                    <Typography variant="body2" className="mb-2 flex items-center">
                      <VerifiedIcon fontSize="small" className="mr-2 text-green-500" />
                      60-day job listings
                    </Typography>
                    <Typography variant="body2" className="mb-2 flex items-center">
                      <VerifiedIcon fontSize="small" className="mr-2 text-green-500" />
                      Priority in search results
                    </Typography>
                    <Typography variant="body2" className="mb-2 flex items-center">
                      <VerifiedIcon fontSize="small" className="mr-2 text-green-500" />
                      Advanced analytics
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    className="mt-4"
                    disabled={employer.membership_package === 'premium'}
                    onClick={() => handleMembershipUpgrade('premium')}
                  >
                    {employer.membership_package === 'premium' ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setOpenMembershipDialog(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default MembershipDialog
