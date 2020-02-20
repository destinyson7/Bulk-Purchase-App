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
import { getJwt } from "./../helpers/jwt";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

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

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

function createData(name, id, price, quantityRemaining) {
  return { name, id, price, quantityRemaining };
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

class CustomerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: ""
    };
  }

  componentDidMount() {
    const jwt = getJwt();

    console.log("jwt", jwt);

    if (!jwt) {
      this.props.history.push("/LogIn");
    } else {
      axios
        .get("http://localhost:4000/auth", {
          headers: { authorization: `Bearer: ${jwt}` }
        })
        .then(res => {
          this.setState({
            userData: res.data
          });
          axios
            .post("http://localhost:4000/orders/view", {
              customerID: this.state.userData.id
            })
            .then(res => {
              this.setState({
                products: res.data
              });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log("now");
          // console.log(this.state.userData);
          console.log(err);
          localStorage.removeItem("access-token");
          this.props.history.push("/LogIn");
        });
    }
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
              <Link
                variant="button"
                color="textPrimary"
                href="/customer/search"
                className={classes.link}
              >
                Search for Product
              </Link>
              <Link variant="button" href="#" className={classes.link}>
                View Orders
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
        <br />
        <br />
        <br />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Sr. No</StyledTableCell>
                <StyledTableCell align="center">Product Name</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">
                  Quantity Ordered
                </StyledTableCell>
                <StyledTableCell align="center">Edit Quantity</StyledTableCell>
                <StyledTableCell align="center">Order ?</StyledTableCell>
                <StyledTableCell align="center">Rate Order</StyledTableCell>
                <StyledTableCell align="center">Rate?</StyledTableCell>
                <StyledTableCell align="center">Review Order</StyledTableCell>
                <StyledTableCell align="center">Review ?</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.products && this.state.products.length ? (
                this.state.products.map(row => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell
                      style={{ color: row.color }}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {row.status}
                    </StyledTableCell>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.quantity}
                    </StyledTableCell>
                    {row.status === "Waiting" ? (
                      <StyledTableCell align="center">
                        <form
                          className={classes.root}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField id="standard-basic" label="New Quantity" />
                        </form>
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell align="center"></StyledTableCell>
                    )}
                    {row.status === "Waiting" ? (
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          name="isCancelled"
                        >
                          Order
                        </Button>
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell align="center"></StyledTableCell>
                    )}
                    {row.status === "Dispatched" ? (
                      <StyledTableCell align="center">
                        <FormControl className={classes.formControl}>
                          <InputLabel id="demo-simple-select-helper-label">
                            Rating
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                          >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                          </Select>
                          <FormHelperText>Select from 1 to 5</FormHelperText>
                        </FormControl>
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell align="center"></StyledTableCell>
                    )}
                    {row.status === "Dispatched" ? (
                      <StyledTableCell align="center">
                        <Button
                          variant="outlined"
                          color="primary"
                          name="isCancelled"
                        >
                          Rate
                        </Button>
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell align="center"></StyledTableCell>
                    )}
                    {row.status === "Dispatched" ? (
                      <StyledTableCell align="center">
                        <form
                          className={classes.root}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField id="standard-basic" label="Review" />
                        </form>
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell align="center"></StyledTableCell>
                    )}
                    {row.status === "Dispatched" ? (
                      <StyledTableCell align="center">
                        <Button
                          variant="outlined"
                          color="primary"
                          name="isCancelled"
                        >
                          Review
                        </Button>
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell align="center"></StyledTableCell>
                    )}
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow></StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(CustomerView));
