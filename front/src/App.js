import "./App.css";
import React from "react";
import Header from "./components/layout/Header/Header";
import Navbar from "./components/layout/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/layout/Footer/Footer";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />

        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
