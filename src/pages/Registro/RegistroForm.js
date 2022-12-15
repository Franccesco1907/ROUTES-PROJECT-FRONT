import { React } from "react";
import { Box, Grid } from "@mui/material";
import { useForm, Form } from "../../components/useForm";
import { Controls } from "../../components/controls/Controls";
import SendIcon from "@mui/icons-material/Send";

import * as PRLocalServices from "../../services/PRLocalServices.js";

const initialFieldValues = {
  id: 0,
  email: "",
  name: "",
  password: "",
  confirmPsw: "",
  dni: "",
  ruc: "",
  role: 0,
};

const radioGroupValues = [
  { id: 0, title: "Administrador" },
  { id: 1, title: "Cliente" },
];

export default function RegistroForm(props) {
  const { values, errors, setErrors, handleInputChange } =
    useForm(initialFieldValues);
  const { submitValues } = props;

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) submitValues(values);
  }

  function validate() {
    return true;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <Controls.Input
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            name="password"
            label="Contraseña"
            value={values.password}
            onChange={handleInputChange}
            error={errors.password}
            type="password"
          />
          <Controls.Input
            name="confirmPsw"
            label="Confirmacion de contraseña"
            value={values.confirmPsw}
            onChange={handleInputChange}
            error={errors.confirmPsw}
            type="password"
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            name="name"
            label="Nombre y Apellidos"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <Controls.RadioGroup
            name="role"
            label="Rol"
            value={values.role}
            onChange={handleInputChange}
            items={radioGroupValues}
          />
          {values.role == 0 && (
            <Controls.Input
              name="dni"
              label="DNI"
              value={values.dni}
              onChange={handleInputChange}
              error={errors.dni}
            />
          )}
          {values.role == 1 && (
            <Controls.Input
              name="ruc"
              label="RUC"
              value={values.ruc}
              onChange={handleInputChange}
              error={errors.ruc}
            />
          )}
          <Box display="flex" justifyContent="flex-end">
            <Controls.Button
              text="Registrarse"
              type="submit"
              endIcon={<SendIcon />}
            />
          </Box>
          {console.log(values)}
        </Grid>
      </Grid>
    </Form>
  );
}
