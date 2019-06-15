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
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { fetchCustomer } from "../../Actions/postActions";
import PropTypes from "prop-types";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class editDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      setOpen: false,
      firstName: "",
      lastName: "",
      emailAddress: "",
      birthDate: ""
    };
  }

  componentWillMount() {
    //this.setState({ firstName: this.props.customer.firstName });
  }

  handleClickOpen = () => {
    this.setState({ setOpen: true });
    this.props.fetchCustomer(this.props.customerKey);
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
    this.handleToggle();
  };
  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      birthDate
    } = this.props.customer;
    return (
      <React.Fragment>
        <Fab
          color="primary"
          size="small"
          aria-label="Add"
          onClick={this.handleClickOpen}
        >
          <EditIcon />
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
                  {"Edit record :" + lastName + " " + firstName}
                </DialogTitle>
              </Toolbar>
            </AppBar>
            <form>
              <List>
                <ListItem>
                  <TextField
                    id="standard-name"
                    label="First Name"
                    value={firstName || ""}
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
                    value={lastName || ""}
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
                    value={emailAddress || ""}
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
                    value={birthDate || "1990-01-01"}
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
editDialog.propTypes = {
  fetchCustomer: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  customer: state.posts.customer
});

export default connect(
  mapStateToProps,
  { fetchCustomer }
)(editDialog);
