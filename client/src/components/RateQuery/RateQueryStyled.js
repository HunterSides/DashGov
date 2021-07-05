import React from "react";
import { Button } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import classnames from "classnames";
import useStyles from "./styles";
import { Typography } from "../Wrappers";

export default function Notification({ variant, ...props }) {
  var classes = useStyles();
  var theme = useTheme();

  return (
    <div
      className={classnames(classes.notificationContainer, props.className, {
        [classes.notificationContained]: variant === "contained",
        [classes.notificationContainedShadowless]: props.shadowless,
      })}
      style={{
        backgroundColor:
          variant === "contained" &&
          theme.palette[props.color] &&
          theme.palette[props.color].main,
      }}
    >
      <div className={classes.messageContainer}>
        <Typography
          className={classnames({
            [classes.containedTypography]: variant === "contained",
          })}
          variant={props.typographyVariant}
          size={variant !== "contained" && !props.typographyVariant && "md"}
        >
          {props.label}
        </Typography>
        {props.extraButton && props.extraButtonClick && (
          <Button
            onClick={props.extraButtonClick}
            disableRipple
            className={classes.extraButton}
          >
            {props.extraButton}
          </Button>
        )}
      </div>
    </div>
  );
}
