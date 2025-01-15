import DataCard from "./DataCard";
import { Pagination, Typography, Grid2 } from "@mui/material";
// Grid2 is imported from @mui/material/Unstable_Grid2

const DataCardList = ({ data, currentPage, totalPages, setCurrentPage }) => {
  return (
    <Grid2
      container
      spacing={2}
      justifyContent="flex-start"
      fullWidth
      sx={{ bgcolor: "background.paper", borderRadius: 1, p: 2,  width: "100%" }}
    >
      {data.length > 0 ? (
        <Grid2
          container
          spacing={2}
          sx={{
            maxHeight: "460px",
            overflowY: "scroll",
            
            width: "100%",
            minWidth: "330px", //
          }}
        >
          {data.map((item, index) => (
            <Grid2 key={index} item size={{ xs: 12, sm: 12, md: 12, lg: 12 }} sx={{ width: "98%" }}>
              <DataCard item={item} />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Grid2 item xs={12} sx={{ minWidth: 1200 }} size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Typography align="left" color="text.secondary">
            No data available.
          </Typography>
        </Grid2>
      )}

      {data.length > 0 && (
        <Grid2
          item
          size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
          sx={{ display: "flex",  mt: 2,  minWidth: {
            xs: "200px", // Smaller minWidth for mobile
            sm: "200px", // Slightly larger minWidth for tablets
            md: "600px", // Default value for desktops
          }, width:'100%',
          justifyContent: {
            xs: "left", // Smaller minWidth for mobile
            sm: "left", // Slightly larger minWidth for tablets
            md: "center", // Default value for desktops
          }, }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
          />
        </Grid2>
      )}
    </Grid2>
  );
};


export default DataCardList;
