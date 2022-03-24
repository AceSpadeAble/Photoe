import React from "react";
import "./App.css";
import {Button} from "react-bootstrap";
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
function App() {
  return (
    <Router>
    <div className="App">
      <div className="hero">
        <div className="hero_logo"></div>
        <h1 className="hero_header">
          Photo editing, hassle free.
        </h1>
        <Link to="/app">
        <Button className="hero_btn" variant="light">Upload an Image</Button>
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