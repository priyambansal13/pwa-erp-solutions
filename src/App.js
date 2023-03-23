import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router } from "react-router-dom";

import ThemeCustomization from "./themes";

import Routes from "./Routes/index";

function App() {
  return (
    <>
      <ThemeCustomization>
        <Router basename="/">
          <Routes />
        </Router>
      </ThemeCustomization>
    </>
  );
}

export default App;
