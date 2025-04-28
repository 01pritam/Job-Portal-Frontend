"use client"

import { useState } from "react"
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Tabs,
  Tab,
} from "@mui/material"
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  Visibility as VisibilityIcon,
  Receipt as ReceiptIcon,
  Download as DownloadIcon,
} from "@mui/icons-material"

const Payments = () => {
  const [tabValue, setTabValue] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState("")
  const [detailDialog, setDetailDialog] = useState({
    open: false,
    payment: null,
  })

  // Mock data
  const [payments, setPayments] = useState([
    {
      id: 1,
      user: "Jane Smith",
      email: "jane@example.com",
      userType: "employer",
      amount: 199.99,
      plan: "Premium Employer",
      status: "completed",
      date: "2023-06-15",
      paymentMethod: "Credit Card",
      transactionId: "TRX123456789",
    },
    {
      id: 2,
      user: "John Doe",
      email: "john@example.com",
      userType: "jobseeker",
      amount: 49.99,
      plan: "Job Seeker Pro",
      status: "completed",
      date: "2023-06-14",
      paymentMethod: "PayPal",
      transactionId: "TRX987654321",
    },
    {
      id: 3,
      user: "Emily Davis",
      email: "emily@example.com",
      userType: "employer",
      amount: 299.99,
      plan: "Enterprise",
      status: "completed",
      date: "2023-06-10",
      paymentMethod: "Credit Card",
      transactionId: "TRX456789123",
    },
    {
      id: 4,
      user: "Michael Wilson",
      email: "michael@example.com",
      userType: "jobseeker",
      amount: 49.99,
      plan: "Job Seeker Pro",
      status: "pending",
      date: "2023-06-16",
      paymentMethod: "Bank Transfer",
      transactionId: "TRX789123456",
    },
    {
      id: 5,
      user: "Lisa Taylor",
      email: "lisa@example.com",
      userType: "employer",
      amount: 199.99,
      plan: "Premium Employer",
      status: "completed",
      date: "2023-06-05",
      paymentMethod: "Credit Card",
      transactionId: "TRX321654987",
    },
    {
      id: 6,
      user: "David Miller",
      email: "david@example.com",
      userType: "jobseeker",
      amount: 49.99,
      plan: "Job Seeker Pro",
      status: "failed",
      date: "2023-06-12",
      paymentMethod: "Credit Card",
      transactionId: "TRX654987321",
    },
    {
      id: 7,
      user: "Jennifer Thomas",
      email: "jennifer@example.com",
      userType: "employer",
      amount: 199.99,
      plan: "Premium Employer",
      status: "completed",
      date: "2023-06-08",
      paymentMethod: "PayPal",
      transactionId: "TRX159753456",
    },
    {
      id: 8,
      user: "Robert Johnson",
      email: "robert@example.com",
      userType: "jobseeker",
      amount: 49.99,
      plan: "Job Seeker Pro",
      status: "completed",
      date: "2023-06-01",
      paymentMethod: "Credit Card",
      transactionId: "TRX753159456",
    },
    {
      id: 9,
      user: "Sarah Brown",
      email: "sarah@example.com",
      userType: "employer",
      amount: 199.99,
      plan: "Premium Employer",
      status: "pending",
      date: "2023-06-16",
      paymentMethod: "Bank Transfer",
      transactionId: "TRX456159753",
    },
    {
      id: 10,
      user: "James Anderson",
      email: "james@example.com",
      userType: "jobseeker",
      amount: 49.99,
      plan: "Job Seeker Pro",
      status: "completed",
      date: "2023-06-03",
      paymentMethod: "PayPal",
      transactionId: "TRX159456753",
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

  const handleDetailDialogOpen = (payment) => {
    setDetailDialog({
      open: true,
      payment,
    })
  }

  const handleDetailDialogClose = () => {
    setDetailDialog({
      ...detailDialog,
      open: false,
    })
  }

  // Calculate total revenue
  const totalRevenue = payments
    .filter((payment) => payment.status === "completed")
    .reduce((sum, payment) => sum + payment.amount, 0)

  // Calculate pending revenue
  const pendingRevenue = payments
    .filter((payment) => payment.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0)

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
          Payment Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage payments from employers and job seekers.
        </Typography>
      </Box>

      {/* Payment Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            <Box sx={{ height: 4, bgcolor: "#0969da" }} />
            {/* No need for external card component import */}
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Total Revenue
                </Typography>
                <Box sx={{ bgcolor: "#dbeafe", p: 1, borderRadius: 2 }}>
                  <ReceiptIcon sx={{ color: "#0969da", fontSize: 20 }} />
                </Box>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1, color: "#111827" }}>
                ${totalRevenue.toFixed(2)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                From {payments.filter((payment) => payment.status === "completed").length} completed payments
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            <Box sx={{ height: 4, bgcolor: "#d4a72c" }} />
            {/* No need for external card component import */}
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Pending Revenue
                </Typography>
                <Box sx={{ bgcolor: "#fef9c3", p: 1, borderRadius: 2 }}>
                  <ReceiptIcon sx={{ color: "#d4a72c", fontSize: 20 }} />
                </Box>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1, color: "#111827" }}>
                ${pendingRevenue.toFixed(2)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                From {payments.filter((payment) => payment.status === "pending").length} pending payments
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            <Box sx={{ height: 4, bgcolor: "#2ea44f" }} />
            {/* No need for external card component import */}
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Employer Payments
                </Typography>
                <Box sx={{ bgcolor: "#dcfce7", p: 1, borderRadius: 2 }}>
                  <ReceiptIcon sx={{ color: "#2ea44f", fontSize: 20 }} />
                </Box>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1, color: "#111827" }}>
                $
                {payments
                  .filter((payment) => payment.userType === "employer")
                  .reduce((sum, payment) => sum + payment.amount, 0)
                  .toFixed(2)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                From {payments.filter((payment) => payment.userType === "employer").length} employer payments
              </Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            <Box sx={{ height: 4, bgcolor: "#bf3989" }} />
            {/* No need for external card component import */}
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Job Seeker Payments
                </Typography>
                <Box sx={{ bgcolor: "#f3e8ff", p: 1, borderRadius: 2 }}>
                  <ReceiptIcon sx={{ color: "#bf3989", fontSize: 20 }} />
                </Box>
              </Box>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1, color: "#111827" }}>
                $
                {payments
                  .filter((payment) => payment.userType === "jobseeker")
                  .reduce((sum, payment) => sum + payment.amount, 0)
                  .toFixed(2)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                From {payments.filter((payment) => payment.userType === "jobseeker").length} job seeker payments
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs for payment status */}
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
          <Tab label="All Payments" />
          <Tab label="Completed" />
          <Tab label="Pending" />
          <Tab label="Failed" />
        </Tabs>
      </Box>

      {/* Search and filter */}
      <Box sx={{ display: "flex", mb: 4, gap: 2, alignItems: "center" }}>
        <TextField
          placeholder="Search payments..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
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
          variant="outlined"
          startIcon={<DownloadIcon />}
          sx={{
            ml: "auto",
            borderRadius: 2,
            borderColor: "#0969da",
            color: "#0969da",
            "&:hover": {
              borderColor: "#0859c6",
              bgcolor: "#f0f7ff",
            },
          }}
          size="medium"
        >
          Export
        </Button>
      </Box>

      {/* Payments table */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", mb: 4, overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8fafc" }}>
                <TableCell sx={{ fontWeight: 600, color: "#4b5563", py: 2.5 }}>Transaction ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#4b5563", py: 2.5 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#4b5563", py: 2.5 }}>User Type</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#4b5563", py: 2.5 }}>Plan</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#4b5563", py: 2.5 }}>Amount</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#4b5563", py: 2.5 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#4b5563", py: 2.5 }}>Date</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: "#4b5563", py: 2.5 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments
                .filter((payment) => {
                  // Filter by tab
                  if (tabValue === 1 && payment.status !== "completed") return false
                  if (tabValue === 2 && payment.status !== "pending") return false
                  if (tabValue === 3 && payment.status !== "failed") return false

                  // Filter by search query
                  if (searchQuery) {
                    const query = searchQuery.toLowerCase()
                    return (
                      payment.user.toLowerCase().includes(query) ||
                      payment.plan.toLowerCase().includes(query) ||
                      payment.transactionId.toLowerCase().includes(query)
                    )
                  }
                  return true
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((payment) => (
                  <TableRow key={payment.id} hover>
                    <TableCell sx={{ py: 2.5 }}>{payment.transactionId}</TableCell>
                    <TableCell sx={{ py: 2.5 }}>{payment.user}</TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Chip
                        label={payment.userType === "jobseeker" ? "Job Seeker" : "Employer"}
                        size="small"
                        sx={{
                          bgcolor: payment.userType === "jobseeker" ? "#dbeafe" : "#dcfce7",
                          color: payment.userType === "jobseeker" ? "#0969da" : "#2ea44f",
                          fontWeight: 500,
                          fontSize: "0.75rem",
                          height: 24,
                          borderRadius: 1.5,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>{payment.plan}</TableCell>
                    <TableCell sx={{ py: 2.5 }}>${payment.amount.toFixed(2)}</TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Chip
                        label={payment.status}
                        size="small"
                        sx={{
                          bgcolor:
                            payment.status === "completed"
                              ? "#dcfce7"
                              : payment.status === "failed"
                                ? "#fee2e2"
                                : "#fef9c3",
                          color:
                            payment.status === "completed"
                              ? "#2ea44f"
                              : payment.status === "failed"
                                ? "#dc2626"
                                : "#d4a72c",
                          fontWeight: 500,
                          fontSize: "0.75rem",
                          height: 24,
                          borderRadius: 1.5,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>{payment.date}</TableCell>
                    <TableCell align="right" sx={{ py: 2.5 }}>
                      <IconButton
                        size="small"
                        sx={{ color: "#4b5563" }}
                        onClick={() => handleDetailDialogOpen(payment)}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: "#4b5563" }}>
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2, borderTop: "1px solid rgba(0, 0, 0, 0.08)" }}>
          <TablePagination
            component="div"
            count={payments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </Card>

      {/* Payment Detail Dialog */}
      <Dialog open={detailDialog.open} onClose={handleDetailDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Payment Details</DialogTitle>
        <DialogContent dividers>
          {detailDialog.payment && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: "#111827" }}>
                    Transaction #{detailDialog.payment.transactionId}
                  </Typography>
                  <Chip
                    label={detailDialog.payment.status}
                    sx={{
                      bgcolor:
                        detailDialog.payment.status === "completed"
                          ? "#dcfce7"
                          : detailDialog.payment.status === "failed"
                            ? "#fee2e2"
                            : "#fef9c3",
                      color:
                        detailDialog.payment.status === "completed"
                          ? "#2ea44f"
                          : detailDialog.payment.status === "failed"
                            ? "#dc2626"
                            : "#d4a72c",
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                    Customer Information
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Name
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {detailDialog.payment.user}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {detailDialog.payment.email}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      User Type
                    </Typography>
                    <Chip
                      label={detailDialog.payment.userType === "jobseeker" ? "Job Seeker" : "Employer"}
                      size="small"
                      sx={{
                        bgcolor: detailDialog.payment.userType === "jobseeker" ? "#dbeafe" : "#dcfce7",
                        color: detailDialog.payment.userType === "jobseeker" ? "#0969da" : "#2ea44f",
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        height: 24,
                        borderRadius: 1.5,
                        mt: 0.5,
                      }}
                    />
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 2, height: "100%" }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                    Payment Information
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Amount
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: "#111827" }}>
                      ${detailDialog.payment.amount.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Plan
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {detailDialog.payment.plan}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Payment Method
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {detailDialog.payment.paymentMethod}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Date
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {detailDialog.payment.date}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailDialogClose}>Close</Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            sx={{
              bgcolor: "#0969da",
              "&:hover": {
                bgcolor: "#0859c6",
              },
            }}
          >
            Download Invoice
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Payments
