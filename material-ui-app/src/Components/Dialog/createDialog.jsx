import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class createDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      setOpen: false
    };
  }

  handleClickOpen = () => {
    this.setState({ setOpen: true });
  };

  handleToggle = () => {
    this.setState({ setOpen: !this.state.setOpen });
  };

  render() {
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
          fullScreen
          open={this.state.setOpen}
          onClose={this.handleToggle}
          TransitionComponent={Transition}
        >
          <AppBar style={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleToggle}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="h6"
                style={{
                  flex: 1
                }}
              >
                Create new Customer Record
              </Typography>
              <Button color="inherit" onClick={this.handleToggle}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                primary="Default notification ringtone"
                secondary="Tethys"
              />
            </ListItem>
          </List>
        </Dialog>
      </React.Fragment>
    );
  }
}
