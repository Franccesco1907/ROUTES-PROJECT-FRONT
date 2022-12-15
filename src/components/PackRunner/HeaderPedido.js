import { Grid, Typography } from "@mui/material";
import React from "react";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

export default function HeaderPedido(props) {
  const { pedido } = props;

  return (
    <Grid container spacing={{ xs: "10px" }}>
      <Grid item sx={{ mt: "10px", mb: "10px", ml: 2 }}></Grid>
      <Grid item sx={{ mt: "9px" }}>
        <Typography
          variant="h4"
          display="inline"
          fontWeight="550"
          sx={{ color: "primary.light" }}
        ></Typography>
        <Typography variant="h4" display="inline">
          {`${pedido.cliente.fullName}`}
        </Typography>
        <div />
        <Typography
          variant="h4"
          display="inline"
          fontWeight="550"
          sx={{ color: "primary.light" }}
        >
          {"Para: \xa0"}
        </Typography>
        <Typography variant="body1" display="inline"></Typography>
        <Typography variant="body1" marginBottom={2}></Typography>
      </Grid>
    </Grid>
  );
}
