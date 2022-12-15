import { Alert } from "@mui/material";
import React from "react";

//Iconos Mesa de Partes
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";

export default function Etiqueta(props) {
  let { text, type, sx, ...other } = props;

  /* Carga Pedidos */
  if (type === "pendiente") {
    text = "Pendiente";
    other.icon = <AccessTimeOutlinedIcon />;
    other.color = "pendiente";
  } else if (type === "entregado") {
    text = "entregado";
    other.icon = <NearMeOutlinedIcon />;
    other.color = "entregado";
  } else if (type === "enCurso") {
    text = "enCurso";
    other.icon = <AccessTimeOutlinedIcon />;
    other.color = "pendiente";
  } else if (type === "pendienteConfirmado") {
    text = "pendienteConfirmado";
    other.icon = <HowToRegOutlinedIcon />;
    other.color = "pendienteConfirmado";
  }
  if (!["error", "info", "success", "warning"].includes(type)) type = "info";

  return (
    // <Box //display="flex"
    // transform="scale(0.5)"   // FIXME: No funciona :(
    //   alignItems="center" justifyContent="center"
    // borderRadius="50px" overflow="hidden"
    //  m={0.5}
    //>
    <Alert
      severity={type}
      sx={{
        ...sx,
        pt: 0,
        pb: 0,
        minWidth: "140px",
        maxWidth: "180px",
        height: "40px",
        borderRadius: "20px",

        transform: "scale(.93)",
      }}
      {...other}
    >
      {text}
    </Alert>
  );
}
