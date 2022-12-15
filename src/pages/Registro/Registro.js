import React from "react";
import { Paper } from "@mui/material";
import Header1 from "../../constants/Header1.js";
import RegistroForm from "./RegistroForm.js";
import HeadNotification from "./HeadNotification.js";
import Notification from "../../components/utils/Notification";
import { useHistory } from "react-router";
import { UserContext } from "../../constants/UserContext";

import userService from "../../services/userService";

export default function Registro() {
  const history = useHistory();
  const { setUser, setRol } = React.useContext(UserContext);
  const [notify, setNotify] = React.useState({
    isOpen: false,
    message: "",
    type: "",
  });

  function submitValues(values) {
    let obj = {
      user: {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      dni: values.dni,
      ruc: values.ruc,
    };
    if (values.dni) {
      console.log(values.dni);
      userService
        .registerAdmin(obj)
        .then((res) => {
          /* success */
          setUser(res.user);
          setRol(0);
          localStorage.setItem("ind", 0);
          setNotify({
            isOpen: true,
            message: "Registro exitoso",
            type: "success",
          });
          /* redirect to next page */
          history.push("/admin");
          //window.location.reload();
        })
        .catch((res) => {
          setNotify({
            isOpen: true,
            message:
              "Estamos teniendo problemas de conexión.  Consulte con un administrador por favor.",
            type: "error",
          });
        });
    } else {
      console.log("first");
      userService
        .registerClient(obj)
        .then((res) => {
          /* success */
          setUser(res.user);
          setRol(1);
          localStorage.setItem("ind", 0);
          setNotify({
            isOpen: true,
            message: "Registro exitoso",
            type: "success",
          });
          /* redirect to next page */
          history.push("/client");
          //window.location.reload();
        })
        .catch((res) => {
          setNotify({
            isOpen: true,
            message:
              "Estamos teniendo problemas de conexión.  Consulte con un administrador por favor.",
            type: "error",
          });
        });
    }
  }

  return (
    <>
      <Header1 />
      <Paper sx={{ m: 22, p: 5 }}>
        <HeadNotification
          title="Creacion de cuenta"
          body="Completa sus datos personales para registrarse"
        />
        <RegistroForm submitValues={submitValues} />
      </Paper>
      {/* "modals" */}
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
