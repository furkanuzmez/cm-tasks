import { useState, useEffect } from 'react';
import { TextField, Box, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ placeholder = "Search...", query, onSearch, debounceTime = 300 }) => {
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch) {
        onSearch(localQuery);
      }
    }, debounceTime);

    return () => {
      clearTimeout(handler); // Clear timeout if the value changes
    };
  }, [localQuery, debounceTime, onSearch]);

  useEffect(() => {
    // Synchronize internal state when parent query changes
    setLocalQuery(query);
  }, [query]);

  const handleSearch = (event) => {
    setLocalQuery(event.target.value);
  };

  return (
    <>
      
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={placeholder}
            value={localQuery}
            onChange={handleSearch}
            sx={{
              '& .MuiInputBase-root': {
                paddingRight: '40px', // Add space for the icon
              },
            }}
          />
          <SearchIcon
            sx={{
              position: 'absolute',
              right: '10px',
              color: 'grey.500',
              pointerEvents: 'none',
            }}
          />
        </Box>
      
    </>
  );
};

export default SearchBar;
