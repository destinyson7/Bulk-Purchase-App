import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

import Register from "./components/Register"
import LogIn from "./components/LogIn"
import Navbar1 from "./components/Navbar"

function App() {
  return (
    <Router>
      <Navbar1 />
      <div className="container">
        <Route exact path="/" component={ Register } />
        <Route path="/register" component={ Register } />
        <Route path="/login" component={ LogIn } />
      </div>
    </Router>
  );
}

export default App;
