import { AppBar, Grid, Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Logo from "../assets/images/Logo.png";

const useStyles = makeStyles((themex) => ({
  root: {
    backgroundColor: "#fdfdff",
  },
  menuImagen: {
    position: "relative",
    height: "45px",
  },
}));

export default function Header1() {
  const classes = useStyles();
  return (
    <>
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
    </>
  );
}
