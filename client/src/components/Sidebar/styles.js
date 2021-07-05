import { makeStyles } from "@material-ui/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  paper: {
    backgroundColor: "#252B3A",
    height: "100vw",
    borderRadius: 0,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 40,
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
    },
  },
  toolbar: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",

    ...theme.mixins.toolbar,
    marginBottom: 15,
  },
  toolbarBackground: {
    color: "black",
    opacity: 0.1,
  },
  image: {
    marginTop: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  /*
  sidebarList: {
    marginTop: theme.spacing(6),
  },
  */
  mobileBackButton: {
    paddingTop: theme.spacing(0),
    marginLeft: 5,
    marginTop: theme.spacing(0.5),
    color: "rgba(255, 255, 255, 0.35)",
  },
}));
