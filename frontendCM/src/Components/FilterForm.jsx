// FiltersComponent.js
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Grid2,
  Typography,
} from "@mui/material";


const FiltersForm = ({
  filters,
  uniqueFilters,
  setFilters,
  handleClearFilters,
}) => {
  return (
    <>
      <Grid2 item  fullWidth  size={{xs:12,md:3,sm:12}} sx={{ bgcolor: "background.paper", borderRadius: 1, boxShadow: 1,maxWidth:"-webkit-fill-available",minWidth:'330px',width:'100%' }}>
        <Typography
          variant="h6"
          sx={{
            mb: 0,
            mt: 1,
            ml: 2,
            color: "text.primary",
            fontWeight: "bold",maxWidth:"-webkit-fill-available"
          }}
        >
          Filter
        </Typography>
        <Grid2
          container
          spacing={1}
          direction="column"
          alignItems="left"
          fullWidth
          sx={{
            marginBottom: 2,
           
            bgcolor: "background.paper",
            borderRadius: 1,
            p: 2,
          }}
        >
          {/* Flow Name Filter */}
          <Grid2 item xs={12} sx={{maxWidth:"-webkit-fill-available"}}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Flow Name</InputLabel>
              <Select
                value={filters.flowName}
                onChange={(e) =>
                  setFilters({ ...filters, flowName: e.target.value })
                }
                label="Flow Name"
                sx={{ bgcolor: "background.default", color: "text.primary" }}
              >
                <MenuItem value="">All</MenuItem>
                {uniqueFilters.flowName.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>

          {/* Process Name Filter */}
          <Grid2 item xs={12} sx={{maxWidth:"-webkit-fill-available"}}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Process Name</InputLabel>
              <Select
                value={filters.processName}
                onChange={(e) =>
                  setFilters({ ...filters, processName: e.target.value })
                }
                label="Process Name"
                sx={{ bgcolor: "background.default", color: "text.primary" }}
              >
                <MenuItem value="">All</MenuItem>
                {uniqueFilters.processName.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>

          {/* Country Filter */}
          <Grid2 item xs={12} sx={{maxWidth:"-webkit-fill-available"}}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Country</InputLabel>
              <Select
                value={filters.country}
                onChange={(e) =>
                  setFilters({ ...filters, country: e.target.value })
                }
                label="Country"
                sx={{ bgcolor: "background.default", color: "text.primary" }}
              >
                <MenuItem value="">All</MenuItem>
                {uniqueFilters.country.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>

          {/* CAS Number Filter */}
          <Grid2 item xs={12} sx={{maxWidth:"-webkit-fill-available"}}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>CAS Number</InputLabel>
              <Select
                value={filters.CAS}
                onChange={(e) => setFilters({ ...filters, CAS: e.target.value })}
                label="CAS Number"
                sx={{ bgcolor: "background.default", color: "text.primary" }}
              >
                <MenuItem value="">All</MenuItem>
                {uniqueFilters.CAS.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>

          {/* Page Size */}
         

          {/* Clear Filters Button */}
          <Grid2 item xs={12}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                textTransform: "none",
                width: "100%", // Full width
                borderRadius: "8px", // Customize border radius (e.g., 8px)
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
              onClick={handleClearFilters}
            >
              CLEAR FILTERS
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
};

export default FiltersForm;
