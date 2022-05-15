import React, { useEffect } from "react";
import "./App.css";
import { Link, Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './HomePage';
function App() {

  return (
    <Router>

    <div className="App">
      <div className="hero">
        <div className="hero_logo"></div>
        <h1 className="header-white fade-in centered">
          Photo editing, hassle free.
        </h1>
        <Link to="/app">
        <Button variant="light" className="centered fade-in">Upload an Image</Button>
        </Link>
    </div>
    </div>
    <Routes>
              <Route exact path='/app' element={< HomePage />}></Route>
              {localStorage.getItem("user") ? <Route path="/" element={<Navigate replace to="/app" />} /> : null }
    </Routes>
    </Router>
  );
}
export default App;