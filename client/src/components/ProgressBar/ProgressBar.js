import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

import { Grid, LinearProgress, Box } from "@material-ui/core";

import "./ProgressBarStyles.scss";

const CustomProgressBar = (props) => {
  return (
    <div>
      <ProgressBar class="progress">
        <ProgressBar variant="yes" now={90} key={1} />
        <ProgressBar variant="abstain" now={5} key={2} />
        <ProgressBar variant="no" now={5} key={3} />
      </ProgressBar>
    </div>
  );
};

export default CustomProgressBar;
