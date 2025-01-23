import { useState, useEffect } from "react";
import {
  Container,
  CircularProgress,
  Typography,
  Backdrop,
  Grid2,
} from "@mui/material";

import PageSize from "../components/PageSize";
import FilterForm from "../components/FilterForm";
import DataCardList from "../components/DataCardList";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import RequestList from "../components/RequestList";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [uniqueFilters, setUniqueFilters] = useState({
    flowName: [],
    processName: [],
    country: [],
    CAS: [],
  });
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    flowName: "",
    processName: "",
    country: "",
    CAS: "",
  });

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const apiEndpoint = `${apiBaseUrl}/data/filter/`;
const uniqueValuesEndpoint = `${apiBaseUrl}/data/unique-values/`;


  const fetchUniqueValues = async () => {
    try {
      const response = await fetch(uniqueValuesEndpoint);
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.detail || "Failed to fetch unique values");
      }
      const result = await response.json();
      setUniqueFilters(result || {});
      console.log(result);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Construct query parameters
      const params = new URLSearchParams({
        page: currentPage,
        page_size: pageSize,
        ...(query && { contains: query }),
        ...Object.keys(filters).reduce((acc, key) => {
          if (filters[key]) {
            acc[key] = filters[key]; // Add each filter directly as a query parameter
          }
          return acc;
        }, {}),
      });
      console.log(params.toString());
      const response = await fetch(`${apiEndpoint}?${params.toString()}`);
      if (!response.ok) {
        const errorDetails = await response.json();
  
        // Extract error message safely
        const errorMessage =
          typeof errorDetails.detail === "string"
            ? errorDetails.detail
            : JSON.stringify(errorDetails.detail) || "Failed to fetch data";
  
        throw new Error(errorMessage);
      }
  
      const result = await response.json();
      setData(result.data || []);
      setTotalPages(result.total_pages || 1);
    } catch (err) {
      console.error("Error fetching data:", err); // Log the error for debugging
      setError(err.message); // Set the error message
    } finally {
      setLoading(false);
    }
  };
  
  
  

  useEffect(() => {
    fetchUniqueValues(); // Fetch unique values on component load
  }, []);

  useEffect(() => {
    fetchData(); // Fetch data whenever dependencies change
  }, [currentPage, pageSize, filters, query]);

  const handleClearFilters = () => {
    setFilters({
      flowName: "",
      processName: "",
      country: "",
      CAS: "",
    });
    setQuery("");
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setQuery(value);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ p: 2, bgcolor: "background.default", color: "text.primary" }}
    >
      <Backdrop
        open={loading}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid2 container spacing={1}>
        <Grid2 size={{ xs: 12, md: 12 }}>
          <Header />
        </Grid2>

        <SearchBar
          placeholder="Search for chemicals..."
          query={query}
          onSearch={handleSearch}
        />

        {error ? (
          <Typography color="error" align="center">
            Error: {error}
          </Typography>
        ) : (
          <Grid2 container spacing={1}>
            <FilterForm
              filters={filters}
              uniqueFilters={uniqueFilters}
              setFilters={setFilters}
              pageSize={pageSize}
              setPageSize={setPageSize}
              handleClearFilters={handleClearFilters}
            />

            <Grid2 item  

fullWidth   sx={{ bgcolor: "background.paper", borderRadius: 1, boxShadow: 1,maxWidth:"-webkit-fill-available",minWidth:'200px',width:'100%' }}
              
              size={{ xs: 12, md: 6, sm: 12 }}
              alignItems="flex-start"
              
            >
              <PageSize pageSize={pageSize} setPageSize={setPageSize} />
              <DataCardList
                data={data}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </Grid2>

            <RequestList />
          </Grid2>
        )}
      </Grid2>
    </Container>
  );
};

export default SearchPage;
