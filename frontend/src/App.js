import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Register from "./components/Register";
import LogIn from "./components/LogIn";
import NavBar from "./components/Navbar";

function App(props) {
  return (
    <Router>
      <div className="container">
        <Route exact path="/" component={Register} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={LogIn} />
      </div>
    </Router>
  );
}

export default App;
