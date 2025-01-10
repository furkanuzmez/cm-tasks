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
      sx={{ bgcolor: "background.paper", borderRadius: 1, p: 2 }}
      size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
    >
      {data.length > 0 ? (
        <Grid2
          container
          spacing={2}
          sx={{ maxHeight: "460px", overflowY: "scroll" }}
        >
          {" "}
          {data.map((item, index) => (
            <Grid2 key={index} item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
              <DataCard item={item} />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Grid2 item xs={12} sx={{ minWidth: 1200 }}>
          <Typography align="left" color="text.secondary">
            No data available.
          </Typography>
        </Grid2>
      )}

      {data.length > 0 ? (
        <Grid2
          item
          size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
          sx={{ display: "flex", justifyContent: "center", mt: 2 }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
          />
        </Grid2>
      ) : (
        <Typography align="center" color="text.secondary"></Typography>
      )}

      {/* Scrollable section for data list */}

      {/* Pagination always visible */}
    </Grid2>
  );
};

export default DataCardList;
