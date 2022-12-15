import React from "react";
import { Typography } from "@mui/material";

export default function Title(props) {
  const { text, ...other } = props;
  let variant = "h3";
  let pb = 2;
  if (props.size === "medium") {
    variant = "h5";
  } else if (props.size === "small") {
    variant = "h4";
    pb = 1;
  }
  return (
    <Typography
      variant={variant}
      // fontWeight={"bold"}
      // paddingTop="5px"
      // paddingBottom="4px"
      pb={pb}
      align="left"
      color="primary.light"
      {...other}
    >
      {text}
    </Typography>
  );
}
