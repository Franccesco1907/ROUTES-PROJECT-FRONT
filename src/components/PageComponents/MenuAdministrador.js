import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

export const MenuAdministrador = [
  {
    text: "Simulaciones",
    path: "",
    icon: <LibraryBooksIcon />,
    indice: 0,
    subNav: [
      {
        text: "7 días",
        path: "/admin/simulacion/7dias",
        indice: 0,
      },
      {
        text: "Operaciones",
        path: "/admin/operacion",
        indice: 0,
      },
      {
        text: "Colapso",
        path: "/admin/simulacion/colapso",
        indice: 0,
      },
    ],
  },
];
