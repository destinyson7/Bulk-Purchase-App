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
import Input from "@material-ui/core/Input";
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
  },
  table: {
    minWidth: 700
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class CustomerSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: "",
      search: "",
      products: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
        .then(res =>
          this.setState({
            userData: res.data
          })
        )
        .catch(err => {
          console.log("now");
          // console.log(this.state.userData);
          console.log(err);
          localStorage.removeItem("access-token");
          this.props.history.push("/LogIn");
        });
    }
  }

  handleChange(event) {
    // console.log(this.state);
    const { name, value, type } = event.target;
    this.setState(
      {
        [name]: value
      },
      () => {
        if (value === "Price") {
          let newProducts = this.state.products;
          if (newProducts && newProducts.length) {
            newProducts.sort(function(a, b) {
              return a.price - b.price;
            });
            this.setState({
              products: newProducts
            });
          }

          return;
        } else if (value === "Remaining Quantity") {
          let newProducts = this.state.products;
          if (newProducts && newProducts.length) {
            newProducts.sort(function(a, b) {
              return a.quantityRemaining - b.quantityRemaining;
            });
            this.setState({
              products: newProducts
            });
            console.log("newProducts", this.state.products);
          }

          return;
        } else if (value === "Vendor Rating") {
          let newProducts = this.state.products;
          if (newProducts && newProducts.length) {
            newProducts.sort(function(a, b) {
              return b.vendorRating - a.vendorRating;
            });
            this.setState({
              products: newProducts
            });
            console.log("newProducts", this.state.products);
          }

          return;
        } else {
          return;
        }
      }
    );
  }

  onSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:4000/products/search", {
        search: this.state.search
      })
      .then(resp => {
        // console.log("data", resp.data);
        // console.log("id", this.state.userData.id);
        this.setState({
          products: resp.data
        });
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
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
                Search for Product
              </Link>
              <Link
                variant="button"
                color="textPrimary"
                href="/customer/view"
                className={classes.link}
              >
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

        <div className="input-group">
          <input
            type="text"
            className="form-control"
            name="search"
            placeholder="Search for a Product"
            aria-label="Amount (to the nearest dollar)"
            onChange={this.handleChange}
            value={this.state.search}
          />
          <div className="input-group-append">
            <span className="input-group-btn">
              <Button
                variant="contained"
                color="primary"
                onClick={this.onSubmit}
              >
                Search
              </Button>
            </span>
            <span className="input-group-text">
              <select
                name="sortBy"
                type="select"
                value={this.state.sortBy}
                onChange={this.handleChange}
              >
                <option selected value="None">
                  Sort By (default: None)
                </option>
                <option value="Price">Price</option>
                <option value="Remaining Quantity">Remaining Quantity</option>
                <option value="Vendor Rating">Vendor Rating</option>
              </select>
            </span>
          </div>
        </div>

        <br />
        <br />
        <br />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Sr. No</StyledTableCell>
                <StyledTableCell>Vendor Name</StyledTableCell>
                <StyledTableCell>Vendor Rating</StyledTableCell>
                <StyledTableCell>Product Name</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">
                  Remaining Quantity
                </StyledTableCell>
                <StyledTableCell align="right">Cancel ?</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.products && this.state.products.length ? (
                this.state.products.map(row => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.vendorName}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.vendorRating}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.price}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.quantityRemaining}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        name="isCancelled"
                        onClick={e => this.handleChange(e, row.id)}
                      >
                        Cancel
                      </Button>
                    </StyledTableCell>
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

export default withRouter(withStyles(styles)(CustomerSearch));
