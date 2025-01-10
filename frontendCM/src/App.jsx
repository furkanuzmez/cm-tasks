import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline} from "@mui/material";

import { lightTheme, darkTheme } from "../src/theme/theme";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import Header from './components/MainHeader';
import Footer from './components/MainFooter';
import Main from './components/MainLayout'
import { RequestProvider } from "./context/RequestContext";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Get initial theme from localStorage or default to false
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    // Save the theme to localStorage whenever it changes
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <RequestProvider>

        <Router>
        < >
                <Header toggleTheme={toggleTheme} darkMode={darkMode} />
                <Main>
                    <Routes>
                        <Route path="/" element={<SearchPage />} />
                        <Route path="/dataSearch" element={<SearchPage />} />
                    </Routes>
                </Main>
                <Footer />
            </>
        </Router>
         
        </RequestProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
