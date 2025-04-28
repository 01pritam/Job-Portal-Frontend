import React, { useState, useEffect } from "react";
import {
  Container, Typography, Box, Table, TableHead, TableBody,
  TableRow, TableCell, TableContainer, Paper, CircularProgress,
  TextField, InputAdornment, IconButton, TablePagination, Avatar, Button
} from "@mui/material";
import { Search as SearchIcon, Refresh as RefreshIcon, Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";

const ManageJobSeekers = () => {
  const [jobSeekers, setJobSeekers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchJobSeekers();
  }, []);

  const fetchJobSeekers = async () => {
    try {
      const response = await axios.get("https://jobbackend-kotd.onrender.com/api/profile/all-jobseekers");
      setJobSeekers(response.data || []);
    } catch (error) {
      console.error("Failed to fetch jobseekers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jobbackend-kotd.onrender.com/api/profile/jobseeker/${id}`);
      setJobSeekers(prev => prev.filter(js => js._id !== id));
    } catch (error) {
      console.error('Failed to delete jobseeker:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const filteredJobSeekers = jobSeekers.filter(js => 
    (js.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (js.phone_number || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Job Seekers
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
          }}
        />
        <IconButton onClick={fetchJobSeekers}>
          <RefreshIcon />
        </IconButton>
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Photo</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Privacy</TableCell>
                <TableCell>Resume</TableCell>
                <TableCell>Qualifications</TableCell>
                <TableCell>Experiences</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredJobSeekers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(seeker => (
                <TableRow key={seeker._id}>
                  <TableCell><Avatar src={seeker.photo_url} /></TableCell>
                  <TableCell>{seeker.full_name || "N/A"}</TableCell>
                  <TableCell>{seeker.phone_number || "N/A"}</TableCell>
                  <TableCell>{seeker.privacy_level}</TableCell>
                  <TableCell>
                    {seeker.resume_url ? (
                      <a href={seeker.resume_url} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2' }}>View</a>
                    ) : "N/A"}
                  </TableCell>
                  <TableCell>
                    {seeker.qualifications?.map(q => `${q.degree} at ${q.institute} (${q.year})`).join(', ') || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {seeker.experiences?.map(e => `${e.job_title} at ${e.company}`).join(', ') || 'N/A'}
                  </TableCell>
                  <TableCell>{new Date(seeker.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button size="small" color="error" onClick={() => handleDelete(seeker._id)}>
                      <DeleteIcon fontSize="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredJobSeekers.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </Container>
  );
};

export default ManageJobSeekers;