import React, { useState, useEffect } from "react";
import {
  Container, Typography, Box, Table, TableHead, TableBody,
  TableRow, TableCell, TableContainer, Paper, CircularProgress,
  TextField, InputAdornment, IconButton, TablePagination, Avatar, Button
} from "@mui/material";
import { Search as SearchIcon, Refresh as RefreshIcon, Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";

const ManageEmployers = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchEmployers();
  }, []);

  const fetchEmployers = async () => {
    try {
      const response = await axios.get("https://jobbackend-kotd.onrender.com/api/profile/all-employers");
      setEmployers(response.data || []);
    } catch (error) {
      console.error("Failed to fetch employers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jobbackend-kotd.onrender.com/api/profile/employer/${id}`);
      setEmployers(prev => prev.filter(emp => emp._id !== id));
    } catch (error) {
      console.error('Failed to delete employer:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const filteredEmployers = employers.filter(emp => 
    (emp.company_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (emp.phone_number || '').toLowerCase().includes(searchQuery.toLowerCase())
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
        Manage Employers
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
        <IconButton onClick={fetchEmployers}>
          <RefreshIcon />
        </IconButton>
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Logo</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Membership</TableCell>
                <TableCell>Featured</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(emp => (
                <TableRow key={emp._id}>
                  <TableCell><Avatar src={emp.logo_url} /></TableCell>
                  <TableCell>{emp.company_name || "N/A"}</TableCell>
                  <TableCell>{emp.phone_number || "N/A"}</TableCell>
                  <TableCell>{emp.membership_package}</TableCell>
                  <TableCell>{emp.featured ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{new Date(emp.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button size="small" color="error" onClick={() => handleDelete(emp._id)}>
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
          count={filteredEmployers.length}
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

export default ManageEmployers;