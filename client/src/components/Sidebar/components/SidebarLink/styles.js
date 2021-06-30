import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    "&:hover, &:focus": {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
  },
  externalLink: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
  },
  linkActive: {
    backgroundColor: theme.palette.background.light,
  },
  linkNested: {
    paddingLeft: 0,
    "&:hover, &:focus": {
      backgroundColor: "#FFFFFF",
    },
  },
  linkIcon: {
    color: theme.palette.text.secondary + "99",
    transition: theme.transitions.create("color"),
    minWidth: 40,
    display: "flex",
    paddingLeft: 7,
  },
  linkIconActive: {
    color: theme.palette.primary.main,
  },
  linkText: {
    color: theme.palette.text.secondary + "CC",
    transition: theme.transitions.create(["opacity", "color"]),
    fontSize: 16,
  },
  linkTextActive: {
    color: "white",
    opacity: 0.95,
  },
  linkTextHidden: {
    opacity: 0,
  },
  nestedList: {
    paddingLeft: theme.spacing(2) + 30,
  },
  sectionTitle: {
    marginLeft: theme.spacing(4.5),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    height: 1,
    backgroundColor: "#D8D8D880",
  },
}));
