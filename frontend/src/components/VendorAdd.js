import React, { Component } from "react";
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
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Tanish Lad
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = theme => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none"
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[700]
        : theme.palette.grey[200]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2)
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6)
    }
  }
});

class VendorAdd extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              Bulk Purchase App
            </Typography>
            <nav>
              <Link variant="button" href="#" className={classes.link}>
                Add
              </Link>
              <Link
                variant="button"
                color="textPrimary"
                href="#"
                className={classes.link}
              >
                View
              </Link>
              <Link
                variant="button"
                color="textPrimary"
                href="#"
                className={classes.link}
              >
                Ready to Dispatch
              </Link>
              <Link
                variant="button"
                color="textPrimary"
                href="#"
                className={classes.link}
              >
                Dispatched
              </Link>
            </nav>
            <Button
              href="#"
              color="primary"
              variant="outlined"
              className={classes.link}
            >
              Log Out
            </Button>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              <br />
              <center>
                <b>ADD A PRODUCT</b>
              </center>
              <br />
              <br />
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormLabel component="legend">
                    <b>Name of Product:</b>
                    <br />
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name of Product"
                    name="name"
                    autoComplete="name"
                  />
                </Grid>

                <Grid item xs={12}>
                  <br />
                  <FormLabel component="legend">
                    <b>Price of Bundle: (in INR)</b>
                    <br />
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="price"
                    label="Price of Bundle"
                    id="price"
                    autoComplete="price"
                  />
                </Grid>
                <Grid item xs={12}>
                  <br />
                  <FormLabel component="legend">
                    <b>Quantity in Bundle:</b>
                    <br />
                  </FormLabel>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="quantity"
                    label="Quantity in Bundle"
                    id="quantity"
                    autoComplete="quantity"
                  />
                </Grid>
              </Grid>
              <br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Add Product
              </Button>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(VendorAdd);
