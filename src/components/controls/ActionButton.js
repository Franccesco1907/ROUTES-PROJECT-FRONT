import React from "react";
import { IconButton } from "@mui/material";

export default function ActionButton(props) {
  const { color, children, onClick, ...other } = props;

  return (
    <IconButton color={color} onClick={onClick} {...other}>
      {children}
    </IconButton>
  );
}
