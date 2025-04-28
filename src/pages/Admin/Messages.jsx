"use client"

import { useState } from "react"
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Card,
  Grid,
  Tabs,
  Tab,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material"
import { Save as SaveIcon } from "@mui/icons-material"

const Messages = () => {
  const [tabValue, setTabValue] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState("")
  const [detailDialog, setDetailDialog] = useState({
    open: false,
    message: null,
  })
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    content: "",
    action: null,
  })

  // Mock data
  const [messages, setMessages] = useState([
    {
      id: 1,
      subject: "New Feature Announcement",
      recipients: "All Users",
      recipientCount: 10542,
      dateSent: "2023-06-15",
      status: "delivered",
      content:
        "We are excited to announce the launch of our new job matching algorithm that will help job seekers find more relevant opportunities and employers find better candidates. This update will be rolled out to all users over the next week.",
    },
    {
      id: 2,
      subject: "Subscription Renewal",
      recipients: "Premium Employers",
      recipientCount: 45,
      dateSent: "2023-06-10",
      status: "delivered",
      content:
        "Your premium employer subscription is due for renewal in the next 7 days. To continue enjoying premium features, please ensure your payment method is up to date. If you have any questions, please contact our support team.",
    },
    {
      id: 3,
      subject: "Job Application Tips",
      recipients: "All Job Seekers",
      recipientCount: 7297,
      dateSent: "2023-06-05",
      status: "delivered",
      content:
        "We've put together some tips to help you improve your job applications and increase your chances of getting hired. Check out our latest blog post for expert advice on resume writing, interview preparation, and more.",
    },
    {
      id: 4,
      subject: "Account Verification",
      recipients: "New Users",
      recipientCount: 324,
      dateSent: "2023-06-01",
      status: "delivered",
      content:
        "Welcome to JobPortal! To ensure the security of your account and access all features, please verify your email address by clicking the link in the verification email we sent you. If you didn't receive the email, you can request a new one from your account settings.",
    },
    {
      id: 5,
      subject: "Payment Reminder",
      recipients: "Specific Users",
      recipientCount: 12,
      dateSent: "2023-05-28",
      status: "pending",
      content:
        "This is a friendly reminder that your payment for the Premium Job Seeker subscription is due. Please update your payment information in your account settings to continue enjoying premium features.",
    },
  ])

  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Welcome Message",
      subject: "Welcome to JobPortal",
      createdDate: "2023-05-15",
      content:
        "Welcome to JobPortal! We're excited to have you join our platform. Here you can find job opportunities, connect with employers, and advance your career. If you have any questions, our support team is here to help.",
    },
    {
      id: 2,
      name: "Payment Confirmation",
      subject: "Your Payment Has Been Processed",
      createdDate: "2023-05-10",
      content:
        "Thank you for your payment. Your transaction has been successfully processed, and your subscription has been activated/renewed. You now have full access to all premium features.",
    },
    {
      id: 3,
      name: "Job Application Received",
      subject: "Your Job Application Has Been Received",
      createdDate: "2023-05-05",
      content:
        "Thank you for applying for the [Job Title] position at [Company Name]. Your application has been received and is currently under review. We will contact you if your qualifications match our requirements.",
    },
    {
      id: 4,
      name: "Password Reset",
      subject: "Password Reset Instructions",
      createdDate: "2023-05-01",
      content:
        "You recently requested to reset your password. Click the link below to create a new password. If you did not request a password reset, please ignore this email or contact support if you have concerns.",
    },
    {
      id: 5,
      name: "Account Verification",
      subject: "Verify Your Account",
      createdDate: "2023-04-28",
      content:
        "Thank you for registering with JobPortal. To complete your registration and access all features, please verify your email address by clicking the link below.",
    },
  ])

  // Event handlers
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleDetailDialogOpen = (message) => {
    setDetailDialog({
      open: true,
      message,
    })
  }

  const handleDetailDialogClose = () => {
    setDetailDialog({
      ...detailDialog,
      open: false,
    })
  }

  const handleConfirmDialogOpen = (title, content, action) => {
    setConfirmDialog({
      open: true,
      title,
      content,
      action,
    })
  }

  const handleConfirmDialogClose = () => {
    setConfirmDialog({
      ...confirmDialog,
      open: false,
    })
  }

  const handleConfirmAction = () => {
    if (confirmDialog.action) {
      confirmDialog.action()
    }
    handleConfirmDialogClose()
  }

  const handleDeleteMessage = (id) => {
    handleConfirmDialogOpen("Confirm Delete", "Are you sure you want to delete this message?", () => {
      setMessages(messages.filter((message) => message.id !== id))
    })
  }

  const handleDeleteTemplate = (id) => {
    handleConfirmDialogOpen("Confirm Delete", "Are you sure you want to delete this template?", () => {
      setTemplates(templates.filter((template) => template.id !== id))
    })
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
        width: "100%",
        mx: "auto",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: "#111827" }}>
          Message Center
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Send messages to employers and job seekers.
        </Typography>
      </Box>

      {/* Tabs for message types */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.95rem",
              minWidth: 120,
              py: 1.5,
            },
            "& .Mui-selected": {
              fontWeight: 600,
              color: "#0969da",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#0969da",
              height: 3,
            },
          }}
        >
          <Tab label="Compose" />
          <Tab label="Sent Messages" />
          <Tab label="Templates" />
        </Tabs>
      </Box>

      {/* Compose message form */}
      {tabValue === 0 && (
        <Card sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", mb: 4, overflow: "hidden" }}>
          <Box sx={{ p: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.08)" }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827" }}>
              Compose New Message
            </Typography>
          </Box>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  select
                  label="Recipient Type"
                  fullWidth
                  defaultValue="all"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                >
                  <MenuItem value="all">All Users</MenuItem>
                  <MenuItem value="jobseekers">All Job Seekers</MenuItem>
                  <MenuItem value="employers">All Employers</MenuItem>
                  <MenuItem value="premium">Premium Users</MenuItem>
                  <MenuItem value="specific">Specific Users</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Subject"
                  fullWidth
                  placeholder="Enter message subject"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Message"
                  fullWidth
                  multiline
                  rows={8}
                  placeholder="Enter your message here"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel control={<Switch color="primary" defaultChecked />} label="Send as email" />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    sx={{
                      borderRadius: 2,
                      borderColor: "#d1d5db",
                      color: "#4b5563",
                      "&:hover": {
                        borderColor: "#9ca3af",
                        bgcolor: "#f9fafb",
                      },
                    }}
                  >
                    Save as Template
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#0969da",
                      borderRadius: 2,
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                      "&:hover": {
                        bgcolor: "#0859c6",
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>
      )}

      {/* Sent messages */}
      {tabValue === 1 && (
        <Card sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", mb: 4, overflow: "hidden" }}>
          <Box sx={{ p: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.08)" }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827" }}>
              Sent Messages
            </Typography>
          </Box>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {messages.map((message) => (
                <Grid item xs={12} key={message.id}>
                  <Card sx={{ p: 3, borderRadius: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {message.subject}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {message.dateSent}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Recipients: {message.recipients} ({message.recipientCount})
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 3 }} noWrap>
                      {message.content}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: 2,
                          borderColor: "#d1d5db",
                          color: "#4b5563",
                        }}
                        onClick={() => handleDetailDialogOpen(message)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{
                          borderRadius: 2,
                        }}
                        onClick={() => handleDeleteMessage(message.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      )}

      {/* Message templates */}
      {tabValue === 2 && (
        <Card sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", mb: 4, overflow: "hidden" }}>
          <Box sx={{ p: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.08)" }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827" }}>
              Message Templates
            </Typography>
          </Box>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {templates.map((template) => (
                <Grid item xs={12} md={6} key={template.id}>
                  <Card sx={{ p: 3, borderRadius: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {template.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {template.createdDate}
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Subject: {template.subject}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 3, height: 60, overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {template.content}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: 2,
                          borderColor: "#0969da",
                          color: "#0969da",
                        }}
                      >
                        Use Template
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: 2,
                          borderColor: "#d1d5db",
                          color: "#4b5563",
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{
                          borderRadius: 2,
                        }}
                        onClick={() => handleDeleteTemplate(template.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Card>
      )}
    </Container>
  )
}

export default Messages
