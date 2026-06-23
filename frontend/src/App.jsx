import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import {
  useState,
  useEffect
} from "react";

import Navbar from "./components/Navbar";

import ProjectPage from "./pages/ProjectPage";
import ForecastPage from "./pages/ForecastPage";

function App() {

  const [darkMode, setDarkMode] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "darkMode"
        );

      return saved
        ? JSON.parse(saved)
        : false;
    });

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <ProjectPage
              darkMode={darkMode}
              setDarkMode={
                setDarkMode
              }
            />
          }
        />

        <Route
          path="/forecast"
          element={
            <ForecastPage
              darkMode={darkMode}
              setDarkMode={
                setDarkMode
              }
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;