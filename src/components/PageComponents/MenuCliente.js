import React from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
export const MenuCliente = [
  {
    text: "Mis Pedidos",
    path: "/client/misPedidos",
    icon: <LibraryBooksIcon />,
    indice: 0,
  },
  {
    text: "Registrar Pedido",
    path: "/client/registrarPedido",
    icon: <AppRegistrationIcon />,
    indice: 1,
  },
];
