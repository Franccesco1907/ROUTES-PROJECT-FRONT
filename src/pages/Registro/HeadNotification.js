import React from "react";
import { Typography, Divider } from "@mui/material";
import { PR } from "../../components/PackRunner/PR";

export default function HeadNotification(props) {
  let { title, body } = props;

  title = title ?? "Nuevo Usuario del Sistema";
  body =
    body ??
    "Registro de informacion completo, ahora puede enviar su solicitud.";
  /* TODO: restriccion de 3 solicitudes por dia a Usuario Externo */
  // "Registro de informacion completo, ahora puede enviar su solicitud.  Sin embargo, por motivos de seguridad, solo puede enviar una cantidad limitada de solicitudes."

  return (
    <div>
      <PR.Title size="medium" text={title} />
      <Typography children={body} />
      <Divider sx={{ my: 1 }} />
    </div>
  );
}
