import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import TimerIcon from "@mui/icons-material/Timer";
import ScienceIcon from '@mui/icons-material/Science';
import { useRequest } from "../context/RequestContext";
import ItemDetailsDialog from "./ItemDetailsDialog";

const DataCard = ({ item }) => {
  const { addToRequest } = useRequest();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        elevation={3}
        sx={{
          borderRadius: 3,
          mb: 3,
          width:'100%',
          minWidth: 333,
          transition: "transform 0.2s ease-in-out",
          bgcolor: "background.paper",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              textAlign: "left",
              color: "primary.main",
            }}
          >
            <ScienceIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            {item.flowName || "N/A"}
          </Typography>

          <Divider sx={{ mb: 2, bgcolor: "divider" }} />

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              <DescriptionIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              <strong>Process Name:</strong> {item.processName || "N/A"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              <LocationOnIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              <strong>Country:</strong> {item.country || "N/A"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              <DescriptionIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              <strong>CAS:</strong> {item.CAS || "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <TimerIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              <strong>Reference Period:</strong> {item.referencePeriod || "N/A"}
            </Typography>
          </Box>

          <Divider sx={{ mb: 2, bgcolor: "divider" }} />

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={handleOpen}
              sx={{ textTransform: "none" }}
              startIcon={<InfoIcon />}
            >
              More Details
            </Button>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => addToRequest(item)}
              sx={{
                textTransform: "none",
                bgcolor: "secondary.main",
                "&:hover": {
                  bgcolor: "secondary.dark",
                },
              }}
              startIcon={<AddCircleIcon />}
            >
              Add to Request
            </Button>
          </Box>
        </CardContent>
      </Card>

      <ItemDetailsDialog open={open} handleClose={handleClose} item={item} />
    </>
  );
};

export default DataCard;
