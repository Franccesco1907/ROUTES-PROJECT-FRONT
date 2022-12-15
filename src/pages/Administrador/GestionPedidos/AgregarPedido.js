import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Form } from "../../../components/useForm";
import { useTheme } from "@mui/material/styles";
import { Controls } from "../../../components/controls/Controls";

import pedidoService from "../../../services/pedidoService";

const initialFieldValues = {
  id: 0,
  nombre: "",
  apellido: "",
  codigo: "",
  especialidad: "",
  telefono: "",
  correo: "",
  dni: "",
};

export default function AgregaPedido() {
  const [newNumPaquetes, setNumPaquetes] = useState("");
  const [errorNumPaquetes, setErrorNumPaquetes] = useState(false);

  const [newFechaPedido, setFechaPedido] = useState("");
  const [errorFechaPedido, setErrorFechaPedido] = useState(false);

  const [newCliente, setCliente] = useState("");
  const [errorCliente, setErrorCliente] = useState(false);

  const [newDeposito, setDeposito] = useState("");
  const [errorDeposito, setErrorDeposito] = useState(false);

  const [newOficina, setOficina] = useState("");
  const [errorOficina, setErrorOficina] = useState(false);

  const theme = useTheme();
  const ColumnGridItemStyle = {
    padding: theme.spacing(2),
    align: "left",
  };

  const validate = () => {
    //VALIDACIONES
    return true;
  };

  /*const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
    } = useForm(initialFieldValues, true, validate);*/

  const handleSubmit = async (e) => {
    /* e is a "default parameter" */
    e.preventDefault();
    //Obtenemos el id del docnete
    const user = JSON.parse(localStorage.getItem("user"));
    if (validate()) {
      const newPed = {
        numPackages: newNumPaquetes,
        orderDate: newFechaPedido,
        client: {},
        depot: {},
        office: {},
      };
      console.log(newPed);
      const rpta = await pedidoService.registerPedido(newPed);
      console.log(rpta);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item sx={6} md={6} style={ColumnGridItemStyle}>
          <Typography variant="h4" mb={2}>
            DATOS GENERALES
          </Typography>
          <Controls.DateTimePickerv2
            name="fecha_pedido"
            label="Fecha de pedido"
            onChange={(e) => {
              setFechaPedido(e.target.value);
            }}
            disabled
            openTo="year"
            views={["year", "month", "day", "hours", "minutes"]}
          />
          <Controls.Input
            name="numPaquetes"
            label="Numero de Paquetes"
            defaultValue=""
            onChange={(e) => {
              setNumPaquetes(e.target.value);
            }}
            error={errorNumPaquetes}
            helperText={errorNumPaquetes && "Este campo está vacío"}
          />
        </Grid>
        <Grid item sx={6} md={6} style={ColumnGridItemStyle}>
          {/* Cliente
        Deposito
        Oficina */}
        </Grid>
      </Grid>
      <Grid cointainer align="right" mt={5}>
        <div>
          <Controls.Button
            // disabled={true}
            variant="disabled"
            text="Cancelar"
          />
          <Controls.Button
            // variant="contained"
            // color="primary"
            // size="large"
            text="Guardar Cambios"
            type="submit"
          />
        </div>
      </Grid>
    </Form>
  );
}
