import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DataTableProps {
  data: Array<{ [key: string]: any }>;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, onDelete, onEdit }) => {
  const [filter, setFilter] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Array<{ [key: string]: any }>>(data);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);

    const filtered = data.filter((item) =>
      Object.values(item).some((field) =>
        String(field).toLowerCase().includes(value.toLowerCase())
      )
    );

    setFilteredData(filtered);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleDelete = () => {
    if (onDelete && selectedItemId !== null) {
      onDelete(selectedItemId);
    }
    setDeleteConfirmationOpen(false);
  };

  const handleEdit = (id: number) => {
    if (onEdit) {
      onEdit(id);
    }
  };

  const handleDeleteConfirmationOpen = (id: number) => {
    setSelectedItemId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setSelectedItemId(null);
    setDeleteConfirmationOpen(false);
  };

  if (!data || data.length === 0) {
    // Handle the case where there is no data to display.
    return <div>No data available.</div>;
  }

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={filter}
        onChange={handleFilterChange}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              {Object.keys(data[0]).map((field, index) => (
                <TableCell key={index}>{field}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>
                  <IconButton onClick={() => handleEdit(row.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteConfirmationOpen(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                {Object.values(row).map((value, colIndex) => (
                  <TableCell key={colIndex}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={deleteConfirmationOpen} onClose={handleDeleteConfirmationClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleDeleteConfirmationClose} color="primary">
            Cancel
          </button>
          <button onClick={handleDelete} color="primary">
            Confirm
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataTable;
