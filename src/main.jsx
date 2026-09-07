import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { DashboardProvider } from "./context/DashboardContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <DashboardProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </DashboardProvider>
    </ThemeProvider>
  </React.StrictMode>
);
