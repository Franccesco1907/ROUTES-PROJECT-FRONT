import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useForm, Form } from "../../../components/useForm";
import { useTheme } from "@mui/material/styles";
import { Controls } from "../../../components/controls/Controls";

import pedidoService from "../../../services/pedidoService";

export default function EditarPedido(props) {
  const {
    recordForEdit,
    setOpenPopup,
    records,
    setRecords,
    transformarPedidos,
    editIndex,
    setEditIndex,
  } = props;

  const [newNumPaquetes, setNumPaquetes] = useState(recordForEdit.numPaquetes);
  const [errorNumPaquetes, setErrorNumPaquetes] = useState(false);

  const [newFechaPedido, setFechaPedido] = useState(recordForEdit.fechaPedido);
  const [errorFechaPedido, setErrorFechaPedido] = useState(false);

  const [newCliente, setCliente] = useState(recordForEdit.cliente);
  const [errorCliente, setErrorCliente] = useState(false);

  const [newDeposito, setDeposito] = useState(recordForEdit.deposito);
  const [errorDeposito, setErrorDeposito] = useState(false);

  const [newOficina, setOficina] = useState(recordForEdit.oficina);
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

  const handleSubmit = async (e) => {
    /* e is a "default parameter" */
    e.preventDefault();
    if (validate()) {
      const editPed = {
        id: recordForEdit.id,
        numPackages: newNumPaquetes,
        orderDate: newFechaPedido,
        client: {
          id: recordForEdit.id_client,
        },
        depot: {
          id: recordForEdit.id_depot,
        },
        office: {
          id: recordForEdit.id_office,
        },
      };
      console.log(editPed);
      const rpta = await pedidoService.updatePedido(editPed);
      console.log(rpta);
      if (rpta) {
        const rptaArr = [rpta];
        //Hacemos la insercion
        const newPed = transformarPedidos(rptaArr);
        const newRecords = records;
        newRecords[editIndex] = newPed[0];
        setRecords(newRecords);
        setEditIndex();
        setOpenPopup(false);
      }
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
            defaultValue={recordForEdit.fechaPedido}
            onChange={(e) => {
              setFechaPedido(e.target.value);
            }}
            openTo="year"
            views={["year", "month", "day", "hours", "minutes"]}
          />
          <Controls.Input
            name="numPaquetes"
            label="Numero de Paquetes"
            defaultValue={recordForEdit.numPackages}
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
            onClick={() => setOpenPopup(false)}
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
