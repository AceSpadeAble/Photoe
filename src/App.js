import React from "react";
import "./App.css";
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
    </Routes>
    </Router>
  );
}
export default App;