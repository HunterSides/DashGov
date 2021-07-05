import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";
import { Box, IconButton, Link } from "@material-ui/core";
import Icon from "@mdi/react";

//icons
import {
  mdiFacebook as FacebookIcon,
  mdiTwitter as TwitterIcon,
  mdiGithub as GithubIcon,
} from "@mdi/js";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
          </Switch>
          <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
          >
            <div>
              <Link
                color={"primary"}
                href={""}
                target={"_blank"}
                className={classes.link}
              >
                About Us
              </Link>
              <Link
                color={"primary"}
                href={""}
                target={"_blank"}
                className={classes.link}
              >
                Blog
              </Link>
            </div>
            <div>
              <Link href={""} target={"_blank"}>
                <IconButton aria-label="facebook">
                  <Icon path={FacebookIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
              <Link href={""} target={"_blank"}>
                <IconButton aria-label="twitter">
                  <Icon path={TwitterIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
              <Link href={""} target={"_blank"}>
                <IconButton aria-label="github" style={{ marginRight: -12 }}>
                  <Icon path={GithubIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
            </div>
          </Box>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
