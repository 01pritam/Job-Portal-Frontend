"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Alert,
  Snackbar,
  Paper,
  Divider,
} from "@mui/material"
import { List, ListItem, ListItemAvatar, ListItemText, ListItemButton, ListItemIcon } from "@mui/material"
import React from "react"
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  BusinessCenter as BusinessCenterIcon,
  Payment as PaymentIcon,
  Settings as SettingsIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Message as MessageIcon,
  LocationOn as LocationOnIcon,
  Star as StarIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
} from "@mui/icons-material"
import ManageJobs from "./ManageJobs"
import Payments from "./Payments"
import ManageEmployers from "./ManageEmployers"
import Messages from "./Messages"
import ManageJobSeekers from "./ManageJobSeekers"

// Import API service
// In a real application, you would have a separate file for API services
// Example: import { fetchDashboardStats, fetchUsers } from "../services/api"

const AdminDashboard = () => {
  // State management
  const [navOpen, setNavOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  // Mock data - in a real app, this would come from API calls
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 10542,
    totalEmployers: 3245,
    totalJobSeekers: 7297,
    totalJobs: 5678,
    activeJobs: 2345,
    pendingJobs: 432,
    totalApplications: 15789,
    totalPayments: 4567,
    recentPayments: 789,
    pendingPayments: 123,
  })

  // Fetch data using axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // In a real app, these would be actual API calls using axios
        // Example:
        /*
      const response = await axios.get('/api/dashboard/stats');
      if (response.status === 200) {
        setDashboardStats(response.data);
      } else {
        throw new Error('Failed to fetch dashboard stats');
      }
      */

        // For demo purposes, we'll simulate the API call
        setTimeout(() => {
          // Simulate successful API response
          setDashboardStats({
            totalUsers: 10542,
            totalEmployers: 3245,
            totalJobSeekers: 7297,
            totalJobs: 5678,
            activeJobs: 2345,
            pendingJobs: 432,
            totalApplications: 15789,
            totalPayments: 4567,
            recentPayments: 789,
            pendingPayments: 123,
          })
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Error fetching data. Please try again.",
          severity: "error",
        })
      }
    }

    fetchData()
  }, [])

  // Example function to demonstrate sending data to backend
  const updateSettings = async (settingsData) => {
    try {
      setLoading(true)

      // In a real app, this would be an actual API call using axios
      // Example:
      /*
    const response = await axios.post('/api/settings', settingsData);
    if (response.status === 200) {
      setSnackbar({
        open: true,
        message: "Settings updated successfully!",
        severity: "success",
      });
    } else {
      throw new Error('Failed to update settings');
    }
    */

      // For demo purposes, we'll simulate the API call
      setTimeout(() => {
        setLoading(false)
        setSnackbar({
          open: true,
          message: "Settings updated successfully!",
          severity: "success",
        })
      }, 1000)
    } catch (error) {
      console.error("Error updating settings:", error)
      setLoading(false)
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Error updating settings. Please try again.",
        severity: "error",
      })
    }
  }

  // Event handlers
  const toggleNav = () => {
    const newNavState = !navOpen
    setNavOpen(newNavState)

    // Dispatch a custom event that the navbar can listen for
    const event = new CustomEvent("sidebarToggle", {
      detail: { open: newNavState },
    })
    window.dispatchEvent(event)
  }

  const handleSectionChange = (section) => {
    setActiveSection(section)
    if (window.innerWidth < 960) {
      setNavOpen(false)
    }
  }

  const handleNotificationOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget)
  }

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null)
  }

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // Navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
    { id: "jobseekers", label: "Manage Job Seekers", icon: <PersonIcon /> },
    {
      id: "employers",
      label: "Manage Employers",
      icon: <BusinessCenterIcon />,
    },
    { id: "jobs", label: "Manage Jobs", icon: <BusinessCenterIcon /> },
    { id: "payments", label: "Payment Management", icon: <PaymentIcon /> },
    { id: "locations", label: "Location Management", icon: <LocationOnIcon /> },
    { id: "services", label: "Service Management", icon: <StarIcon /> },
    { id: "messages", label: "Message Center", icon: <MessageIcon /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon /> },
  ]

  // Navigation panel
  const navigationPanel = (
    <Box
      sx={{
        position: "fixed",
        top: 0, // Changed from 64 to 0 to start from the top
        left: 0,
        bottom: 0,
        width: navOpen ? 250 : 0,
        bgcolor: "white",
        boxShadow: navOpen ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
        transition: "width 0.3s ease",
        overflowX: "hidden",
        overflowY: "auto",
        zIndex: 1200,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 2, mt: 8 }}>
        {" "}
        {/* Added margin top to account for navbar */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: "#0969da", mr: 2 }}>A</Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Admin User
            </Typography>
            <Typography variant="caption" color="text.secondary">
              admin@jobportal.com
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mb: 1 }} />

      <List component="nav" sx={{ px: 1, flex: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={activeSection === item.id}
              onClick={() => handleSectionChange(item.id)}
              sx={{
                borderRadius: 1.5,
                py: 1,
                "&.Mui-selected": {
                  backgroundColor: "#e6f2ff",
                  color: "#0969da",
                  "&:hover": {
                    backgroundColor: "#d9ecff",
                  },
                  "& .MuiListItemIcon-root": {
                    color: "#0969da",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: activeSection === item.id ? 600 : 400,
                  fontSize: "0.9rem",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderRadius: 1.5,
              m: 1,
              color: "text.secondary",
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  // Render different sections based on activeSection
  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard()
      case "jobseekers":
        return <ManageJobSeekers />
      case "employers":
        return <ManageEmployers />
      case "jobs":
        return <ManageJobs />
      case "payments":
        return <Payments />
      case "messages":
        return <Messages />
      case "locations":
        return renderLocations()
      case "services":
        return renderServices()
      case "settings":
        return renderSettings()
      default:
        return renderDashboard()
    }
  }

  // Dashboard section
  const renderDashboard = () => {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: "#111827" }}>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome to the JobPortal admin dashboard. Here's an overview of your platform.
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                background: "linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                },
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <Box sx={{ height: 4, bgcolor: "#0969da" }} />
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Total Users
                  </Typography>
                  <Avatar
                    sx={{
                      bgcolor: "#dbeafe",
                      color: "#0969da",
                      width: 40,
                      height: 40,
                      boxShadow: "0 4px 8px rgba(9,105,218,0.15)",
                    }}
                  >
                    <PeopleIcon />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1, color: "#111827" }}>
                  {dashboardStats.totalUsers.toLocaleString()}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Chip
                    label="↑ 12%"
                    size="small"
                    sx={{
                      bgcolor: "#dcfce7",
                      color: "#2ea44f",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      height: 20,
                      mr: 1,
                      boxShadow: "0 2px 4px rgba(46,164,79,0.1)",
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    vs last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                background: "linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                },
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <Box sx={{ height: 4, bgcolor: "#2ea44f" }} />
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Active Jobs
                  </Typography>
                  <Avatar
                    sx={{
                      bgcolor: "#dcfce7",
                      color: "#2ea44f",
                      width: 40,
                      height: 40,
                      boxShadow: "0 4px 8px rgba(46,164,79,0.15)",
                    }}
                  >
                    <BusinessCenterIcon />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1, color: "#111827" }}>
                  {dashboardStats.activeJobs.toLocaleString()}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Chip
                    label="↑ 8%"
                    size="small"
                    sx={{
                      bgcolor: "#dcfce7",
                      color: "#2ea44f",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      height: 20,
                      mr: 1,
                      boxShadow: "0 2px 4px rgba(46,164,79,0.1)",
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    vs last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                background: "linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                },
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <Box sx={{ height: 4, bgcolor: "#bf3989" }} />
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Total Applications
                  </Typography>
                  <Avatar
                    sx={{
                      bgcolor: "#f3e8ff",
                      color: "#bf3989",
                      width: 40,
                      height: 40,
                      boxShadow: "0 4px 8px rgba(191,57,137,0.15)",
                    }}
                  >
                    <PersonIcon />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1, color: "#111827" }}>
                  {dashboardStats.totalApplications.toLocaleString()}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Chip
                    label="↑ 15%"
                    size="small"
                    sx={{
                      bgcolor: "#dcfce7",
                      color: "#2ea44f",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      height: 20,
                      mr: 1,
                      boxShadow: "0 2px 4px rgba(46,164,79,0.1)",
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    vs last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 3,
                background: "linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                },
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <Box sx={{ height: 4, bgcolor: "#d4a72c" }} />
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Total Payments
                  </Typography>
                  <Avatar
                    sx={{
                      bgcolor: "#fef9c3",
                      color: "#d4a72c",
                      width: 40,
                      height: 40,
                      boxShadow: "0 4px 8px rgba(212,167,44,0.15)",
                    }}
                  >
                    <PaymentIcon />
                  </Avatar>
                </Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1, color: "#111827" }}>
                  ${(dashboardStats.totalPayments * 100).toLocaleString()}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Chip
                    label="↑ 10%"
                    size="small"
                    sx={{
                      bgcolor: "#dcfce7",
                      color: "#2ea44f",
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      height: 20,
                      mr: 1,
                      boxShadow: "0 2px 4px rgba(46,164,79,0.1)",
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    vs last month
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* User Distribution & Recent Activity */}
        <Grid container spacing={4} sx={{ mb: 5 }}>
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.08)" }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827" }}>
                    Recent Activity
                  </Typography>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: "#f8fafc" }}>
                        <TableCell sx={{ fontWeight: 600, color: "#4b5563" }}>Activity</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#4b5563" }}>User</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#4b5563" }}>Time</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#4b5563" }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[
                        {
                          activity: "New job posted",
                          user: "Emily Davis",
                          time: "10 minutes ago",
                          status: "pending",
                        },
                        {
                          activity: "Payment received",
                          user: "Jane Smith",
                          time: "25 minutes ago",
                          status: "completed",
                        },
                        {
                          activity: "New user registered",
                          user: "Alex Johnson",
                          time: "1 hour ago",
                          status: "active",
                        },
                        {
                          activity: "Job application submitted",
                          user: "Michael Wilson",
                          time: "2 hours ago",
                          status: "pending",
                        },
                        {
                          activity: "Service purchased",
                          user: "David Miller",
                          time: "3 hours ago",
                          status: "completed",
                        },
                      ].map((row, index) => (
                        <TableRow key={index} hover>
                          <TableCell sx={{ py: 2 }}>{row.activity}</TableCell>
                          <TableCell sx={{ py: 2 }}>{row.user}</TableCell>
                          <TableCell sx={{ py: 2 }}>{row.time}</TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Chip
                              label={row.status}
                              size="small"
                              sx={{
                                bgcolor:
                                  row.status === "completed"
                                    ? "#dcfce7"
                                    : row.status === "pending"
                                      ? "#fef9c3"
                                      : "#dbeafe",
                                color:
                                  row.status === "completed"
                                    ? "#2ea44f"
                                    : row.status === "pending"
                                      ? "#d4a72c"
                                      : "#0969da",
                                fontWeight: 500,
                                fontSize: "0.75rem",
                                height: 20,
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#111827" }}>
                  User Distribution
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500, color: "#4b5563" }}>
                        Job Seekers
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="#111827">
                        {dashboardStats.totalJobSeekers.toLocaleString()} (
                        {Math.round((dashboardStats.totalJobSeekers / dashboardStats.totalUsers) * 100)}
                        %)
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        bgcolor: "#e6f2ff",
                        borderRadius: 2,
                        height: 12,
                      }}
                    >
                      <Box
                        sx={{
                          width: `${Math.round((dashboardStats.totalJobSeekers / dashboardStats.totalUsers) * 100)}%`,
                          bgcolor: "#0969da",
                          height: "100%",
                          borderRadius: 2,
                        }}
                      />
                    </Box>
                  </Box>

                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500, color: "#4b5563" }}>
                        Employers
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="#111827">
                        {dashboardStats.totalEmployers.toLocaleString()} (
                        {Math.round((dashboardStats.totalEmployers / dashboardStats.totalUsers) * 100)}
                        %)
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        bgcolor: "#dcfce7",
                        borderRadius: 2,
                        height: 12,
                      }}
                    >
                      <Box
                        sx={{
                          width: `${Math.round((dashboardStats.totalEmployers / dashboardStats.totalUsers) * 100)}%`,
                          bgcolor: "#2ea44f",
                          height: "100%",
                          borderRadius: 2,
                        }}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: "#111827" }}>
                      Job Status Distribution
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box
                        sx={{
                          flex: 1,
                          p: 2,
                          bgcolor: "#dbeafe",
                          borderRadius: 2,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#0969da" }}>
                          {dashboardStats.activeJobs}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#0969da", fontWeight: 500 }}>
                          Active
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          flex: 1,
                          p: 2,
                          bgcolor: "#fef9c3",
                          borderRadius: 2,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#d4a72c" }}>
                          {dashboardStats.pendingJobs}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#d4a72c", fontWeight: 500 }}>
                          Pending
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#111827" }}>
            Quick Actions
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                title: "Manage Job Seekers",
                icon: <PersonIcon />,
                color: "#0969da",
                bg: "#dbeafe",
                action: () => handleSectionChange("jobseekers"),
              },
              {
                title: "Manage Employers",
                icon: <BusinessCenterIcon />,
                color: "#2ea44f",
                bg: "#dcfce7",
                action: () => handleSectionChange("employers"),
              },
              {
                title: "Manage Jobs",
                icon: <BusinessCenterIcon />,
                color: "#d4a72c",
                bg: "#fef9c3",
                action: () => handleSectionChange("jobs"),
              },
              {
                title: "Payment Management",
                icon: <PaymentIcon />,
                color: "#bf3989",
                bg: "#f3e8ff",
                action: () => handleSectionChange("payments"),
              },
              {
                title: "Message Center",
                icon: <MessageIcon />,
                color: "#0969da",
                bg: "#dbeafe",
                action: () => handleSectionChange("messages"),
              },
              {
                title: "Settings",
                icon: <SettingsIcon />,
                color: "#2ea44f",
                bg: "#dcfce7",
                action: () => handleSectionChange("settings"),
              },
            ].map((action, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: 3,
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                    },
                  }}
                  onClick={action.action}
                >
                  <Avatar
                    sx={{
                      bgcolor: action.bg,
                      color: action.color,
                      mb: 2,
                      width: 48,
                      height: 48,
                    }}
                  >
                    {action.icon}
                  </Avatar>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      textAlign: "center",
                      color: "#111827",
                    }}
                  >
                    {action.title}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Detailed Analytics */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#111827" }}>
            Detailed Analytics
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  background: "linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827" }}>
                      Monthly Job Postings
                    </Typography>
                    <Chip
                      label="Last 6 months"
                      size="small"
                      sx={{
                        bgcolor: "#f3f4f6",
                        fontWeight: 500,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      height: 250,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Chart would be displayed here
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Total Postings
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827" }}>
                        1,245
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Growth
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: "#2ea44f" }}>
                        +15.3%
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Conversion
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827" }}>
                        24.5%
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  background: "linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 3,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827" }}>
                      Revenue Breakdown
                    </Typography>
                    <Chip
                      label="This quarter"
                      size="small"
                      sx={{
                        bgcolor: "#f3f4f6",
                        fontWeight: 500,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      }}
                    />
                  </Box>
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 2, borderRadius: 2, bgcolor: "#f9fafb" }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Employer Subscriptions
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#0969da" }}>
                          $245,689
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#2ea44f" }}>
                          ↑ 8.2% vs last quarter
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 2, borderRadius: 2, bgcolor: "#f9fafb" }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Job Seeker Services
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#bf3989" }}>
                          $98,432
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#2ea44f" }}>
                          ↑ 12.5% vs last quarter
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 2, borderRadius: 2, bgcolor: "#f9fafb" }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Featured Listings
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#d4a72c" }}>
                          $76,210
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#2ea44f" }}>
                          ↑ 5.7% vs last quarter
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 2, borderRadius: 2, bgcolor: "#f9fafb" }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Premium Services
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: "#2ea44f" }}>
                          $124,567
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#2ea44f" }}>
                          ↑ 15.3% vs last quarter
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderRadius: 2,
                        borderColor: "#0969da",
                        color: "#0969da",
                        "&:hover": {
                          borderColor: "#0859c6",
                          bgcolor: "#f0f7ff",
                        },
                      }}
                    >
                      View Full Report
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Recent Users */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: "#111827" }}>
            Recent Users
          </Typography>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              background: "linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <List sx={{ p: 0 }}>
                {[
                  {
                    name: "John Doe",
                    email: "john@example.com",
                    type: "Job Seeker",
                    time: "2 hours ago",
                    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
                  },
                  {
                    name: "Jane Smith",
                    email: "jane@example.com",
                    type: "Employer",
                    time: "3 hours ago",
                    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
                  },
                  {
                    name: "Robert Johnson",
                    email: "robert@example.com",
                    type: "Job Seeker",
                    time: "5 hours ago",
                    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
                  },
                  {
                    name: "Emily Davis",
                    email: "emily@example.com",
                    type: "Employer",
                    time: "6 hours ago",
                    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
                  },
                  {
                    name: "Michael Wilson",
                    email: "michael@example.com",
                    type: "Job Seeker",
                    time: "8 hours ago",
                    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
                  },
                ].map((user, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && <Divider component="li" />}
                    <ListItem
                      sx={{
                        py: 2,
                        px: 3,
                        transition: "background-color 0.2s",
                        "&:hover": {
                          bgcolor: "rgba(0,0,0,0.02)",
                        },
                      }}
                      secondaryAction={
                        <Chip
                          label={user.type}
                          size="small"
                          sx={{
                            bgcolor: user.type === "Employer" ? "#dcfce7" : "#dbeafe",
                            color: user.type === "Employer" ? "#2ea44f" : "#0969da",
                            fontWeight: 500,
                            fontSize: "0.75rem",
                            height: 24,
                          }}
                        />
                      }
                    >
                      <ListItemAvatar>
                        <Avatar src={user.avatar} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.name}
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="text.primary">
                              {user.email}
                            </Typography>
                            {" — Registered " + user.time}
                          </React.Fragment>
                        }
                        primaryTypographyProps={{ fontWeight: 600 }}
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
              <Box
                sx={{
                  p: 2,
                  borderTop: "1px solid rgba(0, 0, 0, 0.08)",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="text"
                  sx={{
                    color: "#0969da",
                    "&:hover": {
                      bgcolor: "#f0f7ff",
                    },
                  }}
                >
                  View All Users
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    )
  }

  // Locations section
  const renderLocations = () => {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: "#111827" }}>
            Location Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage locations for job listings.
          </Typography>
        </Box>

        {/* Search and filter */}
        <Box sx={{ display: "flex", mb: 4, gap: 2, alignItems: "center" }}>
          <TextField
            placeholder="Search locations..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 400, flex: 1 }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            size="medium"
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
            Filter
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            size="medium"
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
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "#0969da",
              ml: "auto",
              borderRadius: 2,
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              "&:hover": {
                bgcolor: "#0859c6",
              },
            }}
            size="medium"
          >
            Add Location
          </Button>
        </Box>

        {/* Locations table */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            mb: 4,
            overflow: "hidden",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f8fafc" }}>
                  <TableCell sx={{ fontWeight: 600, color: "#4b5563", py: 2.5 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#4b5563", py: 2.5 }}>Country</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#4b5563", py: 2.5 }}>State/Province</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#4b5563", py: 2.5 }}>Job Count</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: "#4b5563", py: 2.5 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    id: 1,
                    name: "San Francisco",
                    country: "USA",
                    state: "California",
                    jobCount: 245,
                  },
                  {
                    id: 2,
                    name: "New York",
                    country: "USA",
                    state: "New York",
                    jobCount: 198,
                  },
                  {
                    id: 3,
                    name: "Seattle",
                    country: "USA",
                    state: "Washington",
                    jobCount: 156,
                  },
                  {
                    id: 4,
                    name: "Los Angeles",
                    country: "USA",
                    state: "California",
                    jobCount: 132,
                  },
                  {
                    id: 5,
                    name: "Chicago",
                    country: "USA",
                    state: "Illinois",
                    jobCount: 98,
                  },
                  {
                    id: 6,
                    name: "Austin",
                    country: "USA",
                    state: "Texas",
                    jobCount: 87,
                  },
                  {
                    id: 7,
                    name: "Boston",
                    country: "USA",
                    state: "Massachusetts",
                    jobCount: 76,
                  },
                  {
                    id: 8,
                    name: "Denver",
                    country: "USA",
                    state: "Colorado",
                    jobCount: 65,
                  },
                  {
                    id: 9,
                    name: "Atlanta",
                    country: "USA",
                    state: "Georgia",
                    jobCount: 54,
                  },
                  {
                    id: 10,
                    name: "Miami",
                    country: "USA",
                    state: "Florida",
                    jobCount: 43,
                  },
                ].map((location) => (
                  <TableRow key={location.id} hover>
                    <TableCell sx={{ py: 2.5 }}>{location.name}</TableCell>
                    <TableCell sx={{ py: 2.5 }}>{location.country}</TableCell>
                    <TableCell sx={{ py: 2.5 }}>{location.state}</TableCell>
                    <TableCell sx={{ py: 2.5 }}>{location.jobCount}</TableCell>
                    <TableCell align="right" sx={{ py: 2.5 }}>
                      <IconButton size="small" sx={{ color: "#4b5563" }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: "#4b5563" }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
              borderTop: "1px solid rgba(0, 0, 0, 0.08)",
            }}
          >
            <TablePagination
              component="div"
              count={100}
              rowsPerPage={10}
              page={0}
              onPageChange={() => {}}
              onRowsPerPageChange={() => {}}
            />
          </Box>
        </Card>
      </Container>
    )
  }

  // Services section
  const renderServices = () => {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: "#111827" }}>
            Service Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage services for employers and job seekers.
          </Typography>
        </Box>

        {/* Tabs for service types */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs
            value={0}
            onChange={() => {}}
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
            <Tab label="All Services" />
            <Tab label="For Job Seekers" />
            <Tab label="For Employers" />
          </Tabs>
        </Box>

        {/* Search and filter */}
        <Box sx={{ display: "flex", mb: 4, gap: 2, alignItems: "center" }}>
          <TextField
            placeholder="Search services..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 400, flex: 1 }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            size="medium"
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
            Filter
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            size="medium"
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
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: "#0969da",
              ml: "auto",
              borderRadius: 2,
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              "&:hover": {
                bgcolor: "#0859c6",
              },
            }}
            size="medium"
          >
            Add Service
          </Button>
        </Box>

        {/* Services table */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            mb: 4,
            overflow: "hidden",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f8fafc" }}>
                  <TableCell sx={{ fontWeight: 600, color: "#4b5563", py: 2.5 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#4b5563", py: 2.5 }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#4b5563", py: 2.5 }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#4b5563", py: 2.5 }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: "#4b5563", py: 2.5 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  {
                    id: 1,
                    name: "Resume Boost",
                    type: "jobseeker",
                    price: 29.99,
                    status: "active",
                  },
                  {
                    id: 2,
                    name: "Featured Job Posting",
                    type: "employer",
                    price: 99.99,
                    status: "active",
                  },
                  {
                    id: 3,
                    name: "Career Coaching",
                    type: "jobseeker",
                    price: 149.99,
                    status: "active",
                  },
                  {
                    id: 4,
                    name: "Premium Company Profile",
                    type: "employer",
                    price: 199.99,
                    status: "active",
                  },
                  {
                    id: 5,
                    name: "Interview Preparation",
                    type: "jobseeker",
                    price: 79.99,
                    status: "active",
                  },
                  {
                    id: 6,
                    name: "Unlimited Job Postings",
                    type: "employer",
                    price: 499.99,
                    status: "active",
                  },
                  {
                    id: 7,
                    name: "Resume Database Access",
                    type: "employer",
                    price: 299.99,
                    status: "active",
                  },
                  {
                    id: 8,
                    name: "Job Application Tracking",
                    type: "jobseeker",
                    price: 19.99,
                    status: "inactive",
                  },
                  {
                    id: 9,
                    name: "Skill Assessment",
                    type: "jobseeker",
                    price: 39.99,
                    status: "active",
                  },
                  {
                    id: 10,
                    name: "Recruitment Assistance",
                    type: "employer",
                    price: 399.99,
                    status: "pending",
                  },
                ].map((service) => (
                  <TableRow key={service.id} hover>
                    <TableCell sx={{ py: 2.5 }}>{service.name}</TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Chip
                        label={service.type === "jobseeker" ? "Job Seeker" : "Employer"}
                        size="small"
                        sx={{
                          bgcolor: service.type === "jobseeker" ? "#dbeafe" : "#dcfce7",
                          color: service.type === "jobseeker" ? "#0969da" : "#2ea44f",
                          fontWeight: 500,
                          fontSize: "0.75rem",
                          height: 24,
                          borderRadius: 1.5,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>${service.price.toFixed(2)}</TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Chip
                        label={service.status}
                        size="small"
                        sx={{
                          bgcolor:
                            service.status === "active"
                              ? "#dcfce7"
                              : service.status === "inactive"
                                ? "#fee2e2"
                                : "#fef9c3",
                          color:
                            service.status === "active"
                              ? "#2ea44f"
                              : service.status === "inactive"
                                ? "#dc2626"
                                : "#d4a72c",
                          fontWeight: 500,
                          fontSize: "0.75rem",
                          height: 24,
                          borderRadius: 1.5,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ py: 2.5 }}>
                      <IconButton size="small" sx={{ color: "#4b5563" }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: "#4b5563" }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
              borderTop: "1px solid rgba(0, 0, 0, 0.08)",
            }}
          >
            <TablePagination
              component="div"
              count={100}
              rowsPerPage={10}
              page={0}
              onPageChange={() => {}}
              onRowsPerPageChange={() => {}}
            />
          </Box>
        </Card>
      </Container>
    )
  }

  // Settings section
  const renderSettings = () => {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: "#111827" }}>
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure system settings and preferences.
          </Typography>
        </Box>

        {/* Tabs for settings */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs
            value={0}
            onChange={() => {}}
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
            <Tab label="General" />
            <Tab label="Appearance" />
            <Tab label="Roles & Permissions" />
            <Tab label="Email" />
          </Tabs>
        </Box>

        {/* General settings */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            mb: 4,
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: 3, borderBottom: "1px solid rgba(0, 0, 0, 0.08)" }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827" }}>
              General Settings
            </Typography>
          </Box>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Site Name"
                  fullWidth
                  defaultValue="JobPortal"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Site URL"
                  fullWidth
                  defaultValue="https://jobportal.com"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Admin Email"
                  fullWidth
                  defaultValue="admin@jobportal.com"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Default Language"
                  fullWidth
                  defaultValue="en"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  <MenuItem value="de">German</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Button
                    variant="outlined"
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
                    Reset
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() =>
                      updateSettings({
                        siteName: "JobPortal",
                        siteUrl: "https://jobportal.com",
                        adminEmail: "admin@jobportal.com",
                        defaultLanguage: "en",
                      })
                    }
                    sx={{
                      bgcolor: "#0969da",
                      borderRadius: 2,
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                      "&:hover": {
                        bgcolor: "#0859c6",
                      },
                    }}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    )
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* Navigation Panel */}
      {navigationPanel}

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: "100%",
          transition: "margin-left 0.3s ease",
          ml: { xs: 0, md: navOpen ? "250px" : 0 },
          bgcolor: "#f9fafb",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Dashboard Navbar that resizes with sidebar */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1100,
            bgcolor: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            transition: "width 0.3s ease, margin-left 0.3s ease",
            width: "100%",
            ml: { xs: 0, md: navOpen ? "0" : 0 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            py: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Hamburger menu for sidebar */}
            <IconButton
              onClick={toggleNav}
              sx={{
                mr: 2,
                "&:hover": { bgcolor: "#f0f7ff" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#111827" }}>
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Icons removed to avoid duplication with main Navbar */}
          </Box>
        </Box>

        <Box sx={{ p: { xs: 2, md: 3 }, width: "100%" }}>{renderSection()}</Box>
      </Box>

      {/* Menus and Dialogs */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationClose}
        PaperProps={{
          sx: {
            minWidth: 320,
            maxWidth: 320,
            mt: 1,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Notifications
          </Typography>
        </Box>
        {[
          {
            title: "New user registration",
            time: "10 minutes ago",
            read: false,
          },
          {
            title: "New job posting requires approval",
            time: "25 minutes ago",
            read: false,
          },
          {
            title: "Payment received from Jane Smith",
            time: "1 hour ago",
            read: true,
          },
          { title: "System update completed", time: "2 hours ago", read: true },
        ].map((notification, index) => (
          <MenuItem
            key={index}
            onClick={handleNotificationClose}
            sx={{
              py: 1.5,
              px: 2,
              borderLeft: notification.read ? "none" : "3px solid #0969da",
              bgcolor: notification.read ? "transparent" : "rgba(9, 105, 218, 0.05)",
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight={notification.read ? 400 : 600}>
                {notification.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {notification.time}
              </Typography>
            </Box>
          </MenuItem>
        ))}
        <Box
          sx={{
            p: 1.5,
            borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            textAlign: "center",
          }}
        >
          <Button size="small" sx={{ color: "#0969da" }}>
            View All Notifications
          </Button>
        </Box>
      </Menu>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Loading overlay */}
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(255, 255, 255, 0.7)",
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}

export default AdminDashboard
