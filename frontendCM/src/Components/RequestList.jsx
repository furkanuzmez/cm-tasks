import { useRequest } from "../context/RequestContext";
import { Box, Typography, Button, Paper, Grid2 } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const RequestList = () => {
  const { requestList, removeFromRequest } = useRequest();

  return (
    <>
      <Grid2 size={{xs:12,md:3,sm:12}} sx={{ bgcolor: "background.paper", borderRadius: 1, boxShadow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            mt: 2,
            ml: 2,
            color: "text.primary",
            fontWeight: "bold",
          }}
        >
          Selected Products
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "12px",
            maxHeight: "500px", // Limit height for scrollable area
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: "background.paper",
            p: 2,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto", // Enable scroll for long lists
              pr: 1,
            }}
          >
            {requestList.length > 0 ? (
              requestList.map((item, index) => (
                <Paper
                  key={index}
                  elevation={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "background.default",
                  }}
                >
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        color: "text.primary",
                        mb: 0.5,
                      }}
                    >
                      {item.flowName || "Unknown Product"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      <strong>Process Name:</strong> {item.processName || "N/A"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 0.5 }}
                    >
                      <strong>Country:</strong> {item.country || "N/A"}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    onClick={() => removeFromRequest(item)}
                    sx={{
                      textTransform: "none",
                      alignSelf: "flex-end",
                      mt: 1,
                    }}
                    startIcon={<DeleteOutlineIcon />}
                  >
                    Remove
                  </Button>
                </Paper>
              ))
            ) : (
              <Typography color="text.secondary">
                No items in the request list.
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                width: "100%",
                borderRadius: 2,
              }}
            >
              Send Request
            </Button>
          </Box>
        </Box>
      </Grid2>
    </>
  );
};

export default RequestList;
