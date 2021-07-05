import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List, Paper, Box } from "@material-ui/core";

import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  FindInPageOutlined as BudgetIcon,
} from "@material-ui/icons";
import DashLogo from "../../images/DashLogo.svg";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

import useStyles from "./styles";

import SidebarLink from "./components/SidebarLink/SidebarLink";

import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "Budget",
    link: "/app/budget",
    icon: <BudgetIcon />,
  },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  var [hidden, setHidden] = useState(false);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  const handleToggle = () => {
    setHidden(!hidden);
  };
  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
        image: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={false} //set to isSidebarOpened to toggle sidebar in mobile view
    >
      <Paper className={classes.paper}>
        <Box className={classes.toolbar}>
          <Box ml={3} display="flex">
            <div>
              {/* <IconButton 
              className={classes.mobileBackButton}
              onClick={() => toggleSidebar(layoutDispatch)}
            >
              <ArrowBackIcon
                onClick={handleToggle}
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }}
              />
            </IconButton>*/}

              <img
                hidden={hidden}
                className={classes.image}
                src={DashLogo}
                alt="Dash Logo"
              />
            </div>
          </Box>
        </Box>

        <List className={classes.sidebarList}>
          {structure.map((link) => (
            <SidebarLink
              key={link.id}
              location={location}
              isSidebarOpened={isSidebarOpened}
              {...link}
            />
          ))}
        </List>
      </Paper>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
