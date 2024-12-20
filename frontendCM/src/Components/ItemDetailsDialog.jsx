import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const ItemDetailsDialog = ({ open, handleClose, item }) => {
  const [selectedProperty, setSelectedProperty] = useState("");

  // Get all properties of the `item` object dynamically
  const itemProperties = Object.keys(item);

  const handlePropertyChange = (event) => {
    setSelectedProperty(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{
        // bgcolor: "background.paper",
        color: "text.primary",
      }}
    >
      <DialogTitle sx={{ color: "primary.main" }}>
        {item.flowName || "Details"}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom sx={{ color: "text.secondary" }}>
          <strong>Process Name:</strong> {item.processName || "N/A"}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: "text.secondary" }}>
          <strong>Country:</strong> {item.country || "N/A"}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: "text.secondary" }}>
          <strong>CAS:</strong> {item.CAS || "N/A"}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: "text.secondary" }}>
          <strong>Reference Period:</strong> {item.referencePeriod || "N/A"}
        </Typography>

        {/* Dropdown for selecting additional properties */}
        <FormControl fullWidth variant="outlined" margin="dense" sx={{ mt: 2 }}>
          <InputLabel>Select Property</InputLabel>
          <Select
            value={selectedProperty}
            onChange={handlePropertyChange}
            label="Select Property"
            sx={{
              bgcolor: "background.default",
              color: "text.primary",
            }}
          >
            {itemProperties.map((property) => (
              <MenuItem key={property} value={property} sx={{ color: "text.primary" }}>
                {property}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedProperty && (
          <Typography variant="body1" gutterBottom sx={{ mt: 2, color: "text.secondary" }}>
            <strong>{selectedProperty}:</strong> {item[selectedProperty] || "N/A"}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained" sx={{ textTransform: "none" }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemDetailsDialog;
