import tinycolor from "tinycolor2";

const primary = "#536DFE";
const secondary = "#F54E60";
const warning = "#FFA800";
const alert = "#F54E60";
const success = "#1BC55F";
const info = "#9013FE";
const noInfo = "#E2E2E2";
const lightenRate = 7.5;
const darkenRate = 15;

const defaultTheme = {
  palette: {
    primary: {
      main: primary,
      light: tinycolor(primary).lighten(lightenRate).toHexString(),
      dark: tinycolor(primary).darken(darkenRate).toHexString(),
    },
    secondary: {
      main: secondary,
      light: tinycolor(secondary).lighten(lightenRate).toHexString(),
      dark: tinycolor(secondary).darken(darkenRate).toHexString(),
      contrastText: "#FFFFFF",
    },
    warning: {
      main: warning,
      light: tinycolor(warning).lighten(lightenRate).toHexString(),
      dark: tinycolor(warning).darken(darkenRate).toHexString(),
    },
    alert: {
      main: alert,
    },
    success: {
      main: success,
      light: tinycolor(success).lighten(lightenRate).toHexString(),
      dark: tinycolor(success).darken(darkenRate).toHexString(),
    },
    info: {
      main: info,
      light: tinycolor(info).lighten(lightenRate).toHexString(),
      dark: tinycolor(info).darken(darkenRate).toHexString(),
    },
    noInfo: {
      main: noInfo,
      light: tinycolor(info).lighten(lightenRate).toHexString(),
      dark: tinycolor(info).darken(darkenRate).toHexString(),
    },
    text: {
      primary: "#4A4A4A",
      secondary: "#6E6E6E",
      hint: "#B9B9B9",
    },
    background: {
      default: "#EDEFF7",
      light: {
        opacity: "0.2",
      },
    },
    dash: {
      primary: "#008DE4",
      green: "#1BC55F",
      yellow: "#FFA800",
      red: "#F54E60",
      lightGrey: "#252B3A",
      sidebar: {
        background: "#252B3A",
        opacity: "0.2",
      },
      background: "#EDEFF7",
    },
  },
  customShadows: {
    widget:
      "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetDark:
      "0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetWide:
      "0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
  },
  overrides: {
    MuiBackdrop: {
      root: {
        backgroundColor: "#4A4A4A1A",
      },
    },
    MuiMenu: {
      paper: {
        boxShadow: "0px 0px 30px rgba(82, 63, 105, 0.15);",
      },
    },
    MuiSelect: {
      icon: {
        color: "inherit",
      },
    },

    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: "#FFFFFF !important",
          "&:focus": {
            backgroundColor: "#F3F5FF",
          },
        },
      },
      button: {
        "&:hover, &:focus": {
          backgroundColor: "#F3F5FF",
        },
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: "white",
      },
    },
    MuiTableRow: {
      root: {
        height: 56,
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: "1px solid rgba(224, 224, 224, .5)",
        paddingLeft: 24,
      },
      head: {
        fontSize: "0.95rem",
      },
      body: {
        fontSize: "0.95rem",
      },
    },
    MuiPopOverPaper: {},
    PrivateSwitchBase: {
      root: {
        marginLeft: 10,
      },
    },
  },
};

export default defaultTheme;
