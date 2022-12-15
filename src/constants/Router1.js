import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import HeaderUser from "../components/PageComponents/HeaderUser.js";

import MisPedidos from "../pages/Cliente/MisPedidos/MisPedidos";
import DetallePedido from "../pages/Cliente/DetallePedido/DetallePedido";
import Login from "../pages/Login/Login";
import RegistrarPedido from "../pages/Cliente/RegistrarPedido/RegistrarPedido";
import PlanTransporte from "../pages/Cliente/PlanTransporte/PlanTransporte";
import ErrorDireccionamiento from "../pages/Dev/Error404";
import Simulacion7Dias from "../pages/Administrador/Simulaciones/Simulacion7Dias";
import SimulacionColapso from "../pages/Administrador/Simulaciones/SimulacionColapso";
import Operacion from "../pages/Administrador/Simulaciones/Operacion";
import Registro from "../pages/Registro/Registro";

const privateroutes = [
  /* Admin */
  {
    requireRoles: [0],
    path: "/admin/simulacion/7dias",
    page: Simulacion7Dias,
  },
  {
    requireRoles: [0],
    path: "/admin/simulacion/colapso",
    page: SimulacionColapso,
  },
  {
    requireRoles: [0],
    path: "/admin/operacion",
    page: Operacion,
  },
  /* Cliente */
  { requireRoles: [1], path: "/client/misPedidos", page: MisPedidos },
  {
    requireRoles: [1],
    path: "/client/misPedidos/detalle/planTransporte",
    page: PlanTransporte,
  },
  { requireRoles: [1], path: "/client/misPedidos", page: MisPedidos },
  {
    requireRoles: [1],
    path: "/client/misPedidos/detalle",
    page: DetallePedido,
  },
  {
    requireRoles: [1],
    path: "/client/registrarPedido",
    page: RegistrarPedido,
  },
];

export default function Router1(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const rol = JSON.parse(localStorage.getItem("rol"));

  function generateRouteRol(rol) {
    switch (rol) {
      case 0:
        return "/admin";
      case 1:
        return "/client";
      default:
        return "/registro";
    }
  }

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/admin" requireRoles={[0]}>
          <Redirect to="/admin/simulacion/7dias" />
        </PrivateRoute>
        <PrivateRoute exact path="/client" requireRoles={[1]}>
          <Redirect to="/client/misPedidos" />
        </PrivateRoute>

        {privateroutes.map((r, index) => (
          <PrivateRoute
            key={index}
            exact
            path={r.path}
            requireRoles={r.requireRoles}
            component={() => <HeaderUser pagina={r.page} />}
          ></PrivateRoute>
        ))}

        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/">
          {user?.id > 0 ? (
            <Redirect to={generateRouteRol(rol)} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route exact path="/registro" component={() => <Registro />}></Route>

        <Route default render={() => <ErrorDireccionamiento />} />
      </Switch>
    </Router>
  );
}
