import React from "react";

import { AppBar, Toolbar, Typography } from "@material-ui/core";
import CreateDialog from "../Dialog/createDialog";
export default props => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" style={{ flex: 1 }}>
        Customers
      </Typography>
      <CreateDialog />
    </Toolbar>
  </AppBar>
);
