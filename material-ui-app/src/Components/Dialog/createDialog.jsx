import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { createCustomer } from "../../Actions/postActions";
import PropTypes from "prop-types";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class createDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      setOpen: false,
      firstName: "",
      lastName: "",
      email: "",
      birthDate: new Date("6/6/2019")
    };
  }

  handleClickOpen = () => {
    this.setState({ setOpen: true });
  };

  handleToggle = () => {
    this.setState({ setOpen: !this.state.setOpen });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleDateChange = date => {
    this.setState({ birthDate: date });
  };

  createCustomer = () => {
    //get max value of a property in an object or array
    const maxVal = Math.max(...this.props.customers.map(c => c.customerKey), 0);
    console.log(maxVal);
    //Math.floor(Math.random() * 100000000 + 1
    const cust = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailAddress: this.state.email,
      birthDate: this.state.birthDate,
      geographyKey: 26,
      customerAlternateKey: "AW000" + (maxVal + 1)
    };
    this.props.createCustomer(cust);
    this.handleToggle();
  };
  render() {
    const { firstName, lastName, email, birthDate } = this.state;
    return (
      <React.Fragment>
        <Fab
          color="default"
          size="small"
          aria-label="Add"
          onClick={this.handleClickOpen}
        >
          <AddIcon />
        </Fab>
        <Dialog
          open={this.state.setOpen}
          onClose={this.handleToggle}
          TransitionComponent={Transition}
        >
          <DialogContent>
            <AppBar style={{ position: "relative" }}>
              <Toolbar>
                <DialogTitle id="max-width-dialog-title">
                  Create new record
                </DialogTitle>
              </Toolbar>
            </AppBar>
            <form>
              <List>
                <ListItem>
                  <TextField
                    id="standard-name"
                    label="First Name"
                    value={firstName}
                    onChange={this.handleChange("firstName")}
                    margin="normal"
                    style={{ width: 500 }}
                    placeholder="First Name"
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    id="standard-name"
                    label="Last Name"
                    value={lastName}
                    onChange={this.handleChange("lastName")}
                    margin="normal"
                    style={{ width: 500 }}
                    placeholder="Last Name"
                  />
                </ListItem>

                <ListItem>
                  <TextField
                    id="standard-name"
                    label="Email"
                    value={email}
                    onChange={this.handleChange("email")}
                    margin="normal"
                    style={{ width: 500 }}
                    placeholder="Email"
                  />
                </ListItem>
                <ListItem>
                  <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    onChange={this.handleChange("birthDate")}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </ListItem>
              </List>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.createCustomer} color="primary">
              Create
            </Button>
            <Button onClick={this.handleToggle} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
createDialog.propTypes = {
  createCustomer: PropTypes.func.isRequired,
  customers: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  customers: state.posts.records,
  newCustomer: state.posts.record
});

export default connect(
  mapStateToProps,
  { createCustomer }
)(createDialog);
