import { useState, useEffect } from "react";
import {
  Container,
  CircularProgress,
  Typography,
  Backdrop,
  Grid2
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

  const apiEndpoint = "https://cmworks.onrender.com/data/filter/";

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        page_size: pageSize,
        ...(query && { contains: query }),
        ...(filters.flowName && { column: "flowName", value: filters.flowName }),
        ...(filters.processName && {
          column: "processName",
          value: filters.processName,
        }),
        ...(filters.country && { column: "country", value: filters.country }),
        ...(filters.CAS && { column: "CAS", value: filters.CAS }),
      });

      const response = await fetch(`${apiEndpoint}?${params.toString()}`);
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.detail || "Failed to fetch data");
      }

      const result = await response.json();
      setData(result.data || []);
      setTotalPages(result.total_pages || 1);
      extractUniqueFilters(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const extractUniqueFilters = (data) => {
    const flowNames = [...new Set(data.map((item) => item.flowName || ""))];
    const processNames = [...new Set(data.map((item) => item.processName || ""))];
    const countries = [...new Set(data.map((item) => item.country || ""))];
    const CASNumbers = [...new Set(data.map((item) => item.CAS || ""))];

    setUniqueFilters({
      flowName: flowNames,
      processName: processNames,
      country: countries,
      CAS: CASNumbers,
    });
  };

  useEffect(() => {
    fetchData();
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

            <Grid2
              size={{ xs: 12, md: 6, sm: 12 }}
              alignItems="flex-start"
              sx={{
                minHeight: 400,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                 // Centers the content
                minWidth: 330,
              }}
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
