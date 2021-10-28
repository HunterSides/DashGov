import { makeStyles } from "@material-ui/styles";
import { Autorenew } from "@material-ui/icons";

export default makeStyles((theme) => ({
  logotype: {
    color: "white",
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(2.5),
    fontWeight: 500,
    fontSize: 18,
    whiteSpace: "nowrap",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },

  appBar: {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
    [theme.breakpoints.only("xs")]: {
      backgroundColor: "#252B3A",
    },
    [theme.breakpoints.only("sm")]: {
      backgroundColor: "#252B3A",
    },
    [theme.breakpoints.only("md")]: {
      backgroundColor: "#252B3A",
    },
    [theme.breakpoints.only("lg")]: {
      backgroundColor: "#FFFFFF",
    },
    [theme.breakpoints.only("xl")]: {
      backgroundColor: "#FFFFFF",
    },

    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  selectInput: {
    padding: 10,
    paddingRight: 30,
    "&:focus": {
      backgroundColor: "transparent",
    },
    "&:hover": {
      color: theme.palette.dash.primary,
    },
  },

  hide: {
    display: "none",
  },
  grow: {
    flexGrow: 1,
  },
  dashGovBlue: {
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
    [theme.breakpoints.only("sm")]: {
      display: "none",
    },
    [theme.breakpoints.only("md")]: {
      display: "none",
    },
  },
  dashGovWhite: {
    [theme.breakpoints.only("lg")]: {
      display: "none",
    },
  },
  image: {
    [theme.breakpoints.only("md")]: {
      fill: "#252B3A",
    },
    [theme.breakpoints.only("lg")]: {
      fill: "#252B3A",
    },
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    height: 36,
    padding: 0,
    paddingRight: 36 + theme.spacing(1.25),
    width: "100%",
  },
  messageContent: {
    display: "flex",
    flexDirection: "column",
  },
  headerMenu: {
    marginTop: theme.spacing(7),
  },
  headerMenuList: {
    display: "flex",
    flexDirection: "column",
  },
  headerMenuItem: {
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.light,
      // color: "white",
    },
  },
  headerMenuButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5),
    [theme.breakpoints.only("xs")]: {
      color: "#FFFFFF",
    },
    [theme.breakpoints.only("sm")]: {
      color: "#FFFFFF",
    },
    [theme.breakpoints.only("md")]: {
      color: "#FFFFFF",
    },
    [theme.breakpoints.only("lg")]: {
      color: "#FFFFFF",
    },
  },
  headerMenuButtonSandwich: {
    marginLeft: 9,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
    [theme.breakpoints.only("xs")]: {
      color: "#FFFFFF",
    },
    [theme.breakpoints.only("sm")]: {
      color: "#FFFFFF",
    },
    [theme.breakpoints.only("md")]: {
      color: "#FFFFFF",
    },
    [theme.breakpoints.only("lg")]: {
      color: "#FFFFFF",
    },
    padding: theme.spacing(0.5),
  },
  headerMenuButtonCollapse: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      color: "#FFFFFF",
    },
    [theme.breakpoints.only("sm")]: {
      color: "#FFFFFF",
    },
    [theme.breakpoints.only("md")]: {
      color: "#FFFFFF",
    },
    [theme.breakpoints.only("lg")]: {
      color: "#FFFFFF",
    },
    headerIcon: {
      fontSize: 28,
      color: "rgba(255, 255, 255, 0.35)",
    },
    headerIconCollapse: {
      color: "rgba(255, 255, 255, 0.35)",
    },
  },
  messageNotification: {
    height: "auto",
    display: "flex",
    alignItems: "center",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.background.light,
    },
  },

  messageNotificationSide: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  messageNotificationBodySide: {
    alignItems: "flex-start",
    marginRight: 0,
  },
  dashRate: {
    [theme.breakpoints.only("xs")]: {
      color: "#FFFFFF",
    },
    [theme.breakpoints.only("sm")]: {
      color: "#FFFFFF",
    },
    [theme.breakpoints.only("md")]: {
      color: "#FFFFFF",
    },
    [theme.breakpoints.only("lg")]: {
      color: "#252B3A",
    },
    [theme.breakpoints.only("xl")]: {
      color: "#252B3A",
    },
  },

  paper: {
    borderRadius: 5,
    overflowX: "unset",
    overflowY: "unset",
    "&::before": {
      content: '""',
      position: "absolute",
      marginRight: ".5em",
      top: -14,
      right: 0,
      width: 10,
      height: 10,
      backgroundColor: "white",
      boxShadow: "0px 0px 30px rgba(82, 63, 105, 0.15)",
      transform: "translate(-50%, 90%) rotate(315deg)",
      clipPath:
        "polygon(-5px -5px, calc(100% + 5px) -5px, calc(100% + 5px) calc(100% + 5px))",
    },
  },
  currency: {
    minHeight: "auto",
    maxHeight: "auto",
  },
  list: {
    paddingRight: "15px",
    paddingLeft: "15px",
    paddingBottom: "12px",
    paddingTop: "12px",

    "& li": {
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "12px",
      backgroundColor: "white",
      color: "#7F8C98",
      "&:hover": {
        color: theme.palette.dash.primary,
        backgroundColor: "transparent",
      },
      "&:focus": {
        color: theme.palette.dash.primary,
        backgroundColor: "white",
      },
      "&:selected": {
        color: theme.palette.dash.primary,
        backgroundColor: "transparent",
      },
    },
  },
  select: {
    [theme.breakpoints.only("xs")]: {
      color: "#FFFFFF",
    },
    [theme.breakpoints.only("sm")]: {
      color: "#FFFFFF",
    },
    [theme.breakpoints.only("md")]: {
      color: "#FFFFFF",
    },
    [theme.breakpoints.only("lg")]: {
      color: "#252B3A",
    },
    [theme.breakpoints.only("xl")]: {
      color: "#252B3A",
    },
  },
}));
