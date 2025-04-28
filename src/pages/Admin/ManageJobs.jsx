import { useState, useEffect } from "react";
import {
  Container, Box, Typography, Button, TextField, InputAdornment,
  Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Chip, IconButton, Dialog, DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import {
  Search as SearchIcon, Refresh as RefreshIcon,
  Visibility as VisibilityIcon, Delete as DeleteIcon
} from "@mui/icons-material";
import axios from "axios";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationToDelete, setLocationToDelete] = useState(""); // 🔥 New state
  const [detailDialog, setDetailDialog] = useState({ open: false, job: null });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("https://jobbackend-kotd.onrender.com/api/job/alljobs");
        setJobs(response.data || []);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleLocationChange = (e) => setLocationToDelete(e.target.value); // 🔥
  const handleDetailDialogOpen = (job) => setDetailDialog({ open: true, job });
  const handleDetailDialogClose = () => setDetailDialog({ ...detailDialog, open: false });

  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(`https://jobbackend-kotd.onrender.com/api/job/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  const handleDeleteJobsByLocation = async () => {
    if (!locationToDelete.trim()) {
      alert("Please enter a location to delete.");
      return;
    }
    if (!window.confirm(`Are you sure you want to delete all jobs at location: ${locationToDelete}?`)) {
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/api/job/jobs/location`, {
        params: { location: locationToDelete }
      });
      alert(`All jobs at ${locationToDelete} deleted successfully.`);
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete jobs by location:', error);
      alert('Failed to delete jobs.');
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Job Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage job listings and applications.
        </Typography>
      </Box>

      {/* Search and Delete by Location */}
      <Box sx={{ display: "flex", mb: 4, gap: 2, alignItems: "center" }}>
        <TextField
          placeholder="Search jobs..."
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
          sx={{ maxWidth: 300 }}
        />

        <TextField
          placeholder="Enter location to delete jobs..."
          variant="outlined"
          size="small"
          value={locationToDelete}
          onChange={handleLocationChange}
          sx={{ maxWidth: 300 }}
        />

        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteJobsByLocation}
        >
          Delete Jobs by Location
        </Button>

        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </Box>

      {/* Jobs Table */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", mb: 4 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Company</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Applicants</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs
                .filter((job) => {
                  const query = searchQuery.toLowerCase();
                  return (
                    job.title.toLowerCase().includes(query) ||
                    (job.companyName || "").toLowerCase().includes(query) ||
                    (job.location || "").toLowerCase().includes(query)
                  );
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((job) => (
                  <TableRow key={job._id} hover>
                    <TableCell>{job.title}</TableCell>
                    <TableCell>{job.companyName || "N/A"}</TableCell>
                    <TableCell>{job.location || "N/A"}</TableCell>
                    <TableCell>
                      <Chip
                        label={job.isApproved ? "Approved" : "Pending"}
                        size="small"
                        sx={{
                          bgcolor: job.isApproved ? "#dcfce7" : "#fef9c3",
                          color: job.isApproved ? "#2ea44f" : "#d4a72c",
                        }}
                      />
                    </TableCell>
                    <TableCell>{job.numberOfApplicants}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => handleDetailDialogOpen(job)}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteJob(job._id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <TablePagination
            component="div"
            count={jobs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Box>
      </Card>

      {/* Job Details Dialog */}
      <Dialog
        open={detailDialog.open}
        onClose={handleDetailDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Job Details</DialogTitle>
        <DialogContent dividers>
          {detailDialog.job && (
            <>
              <Typography variant="h6" gutterBottom>{detailDialog.job.title}</Typography>
              <Typography variant="body1" gutterBottom>Company: {detailDialog.job.companyName || "N/A"}</Typography>
              <Typography variant="body1" gutterBottom>Location: {detailDialog.job.location}</Typography>
              <Typography variant="body1" gutterBottom>Description: {detailDialog.job.description}</Typography>
              <Typography variant="body1" gutterBottom>Applicants: {detailDialog.job.numberOfApplicants}</Typography>
              <Typography variant="body1" gutterBottom>Status: {detailDialog.job.isApproved ? "Approved" : "Pending"}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageJobs;