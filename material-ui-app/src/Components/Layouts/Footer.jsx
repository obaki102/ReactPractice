import React from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";

export default ({ departments }) => (
  <Paper>
    <Tabs indicatorColor="primary" textColor="primary" centered value={1}>
      {departments.map(category => (
        <Tab key={category.id} label={category.value} value={category.id} />
      ))}
      ;
    </Tabs>
  </Paper>
);
