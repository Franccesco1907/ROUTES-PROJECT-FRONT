import React from "react";
import { List } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import Menu from "../components/PageComponents/Menu"; // relocate?
import { UserContext } from "./UserContext";

//Drawer props
const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 5px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 2px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(8.2, 8),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DrawerAdmin(props) {
  const { open, listaMenu } = props;
  //const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { selectedIndex, setSelectedIndex } = React.useContext(UserContext);

  const handleListItemClick = (e, indice) => {
    setSelectedIndex(indice);
  };
  return (
    <Drawer variant="permanent" elevation={1} open={open}>
      <DrawerHeader />
      {/* <MenuPrueba/> */}
      <List>
        {listaMenu.map((item, index) => {
          return (
            <Menu
              open={open}
              item={item}
              key={index}
              handleListItemClick={handleListItemClick}
              isSelected={selectedIndex === index}
            />
          );
        })}
      </List>
    </Drawer>
  );
}
