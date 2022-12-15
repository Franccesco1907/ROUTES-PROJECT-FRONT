import React from "react";
import { makeStyles } from "@mui/styles";
import { AppBar, Grid, Toolbar } from "@mui/material";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Logo from "../../assets/images/Logo.png";
import Header2 from "../../constants/Header2";
import DrawerAdmin from "../../constants/DrawerAdmin";
import { UserContext } from "../../constants/UserContext";
import { MenuAdministrador } from "./MenuAdministrador";
import { MenuCliente } from "./MenuCliente";

function BoxPadding(props) {
  return (
    <Box
      component="main"
      width={1}
      p={2}
      overflow="auto" // grow with content
      sx={{
        backgroundColor: "#ffffff",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom right",
        backgroundSize: "contain",
      }}
    >
      <DrawerHeader /> {props.children}
    </Box>
  );
}

const useStyles = makeStyles((themex) => ({
  root: {
    backgroundColor: "#fdfdff",
  },
  pageHeader: {
    padding: themex.spacing(4),
    display: "flex",
    marginBottom: themex.spacing(2),
  },
  pageIcon: {
    display: "inline-block",
    padding: themex.spacing(1),
    color: "#00002b",
  },
  pageTitle: {
    paddingLeft: themex.spacing(4),
    "& .MuiTypography-body1": {
      opacity: "0.6",
    },
  },
  userImage: {
    position: "relative",
    bottom: "1px",
  },
  gridSpace: {
    marginTop: themex.spacing(0),
  },
  menuImagen: {
    position: "relative",
    height: "45px",
  },
  active: {
    background: "#000",
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(8.2, 8),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function HeaderUser(props) {
  const { user, open, setOpen } = React.useContext(UserContext);

  const classes = useStyles();
  let listaMenu = [];

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  let rolName; // rolname
  let rol = JSON.parse(localStorage.getItem("rol"));

  if (rol === 0) {
    rolName = "Administrador";
    listaMenu = MenuAdministrador;
  } else if (rol === 1) {
    rolName = "Cliente";
    listaMenu = MenuCliente;
  }

  return (
    <Box display="flex" top="0px" bottom="0px" width="100%">
      {/*Header Azul*/}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "primary",
          boxShadow: 1,
          transform: "translateZ(0)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Grid container alignItems="center" mr={2}>
            <Grid item sm></Grid>
            <Grid item>
              <img className={classes.menuImagen} src={Logo} alt=""></img>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/*Header de Información de usuario*/}
      <Header2
        nombre={user.name}
        idRol={rol}
        rol={rolName}
        handleDrawerOpen={handleDrawerOpen}
      />
      {/* SideBar (aka. Navbar, aka. Drawer) */}
      <DrawerAdmin open={open} listaMenu={listaMenu} />
      {/* Router de Paginas pasa el prop */}
      <BoxPadding>
        <props.pagina />
      </BoxPadding>
    </Box>
  );
}
