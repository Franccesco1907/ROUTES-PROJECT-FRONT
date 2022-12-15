import {
  AppBar,
  Grid,
  IconButton,
  Button,
  Toolbar,
  Divider,
  Avatar,
} from "@mui/material";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory, Redirect } from "react-router";
import { Controls } from "../components/controls/Controls";

import DehazeIcon from "@mui/icons-material/Dehaze";
import logout from "../assets/images/log-out.png";

const useStyles = makeStyles((themex) => ({
  root: {
    backgroundColor: "#fdfdff",
  },
  pageIcon: {
    display: "inline-block",
    padding: themex.spacing(1),
    color: "#00002b",
  },
}));

export default function Header2(props) {
  const history = useHistory();
  const { foto, nombre, idRol, rol, handleDrawerOpen } = props;
  const classes = useStyles();

  const onLogoutSuccess = () => {
    localStorage.removeItem("rol");
    localStorage.removeItem("user");
    localStorage.removeItem("ind");
    /*  setUser({}); */
    // setRole({});
    //localStorage.clear();
    history.push("/");
  };
  const onLogoutFailure = (response) => {
    // console.log(response)
    console.log("Failed to log out");
  };

  return (
    <AppBar
      sx={{
        marginTop: "65px",
        bgcolor: "#fff",
        boxShadow: 1,
        transform: "translateZ(0)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      position="fixed"
    >
      <Toolbar>
        <Grid
          container
          ml={-1}
          mr={0}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item pr={2}>
            <IconButton onClick={handleDrawerOpen}>
              <DehazeIcon fontSize="medium" />
            </IconButton>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item pl={2}>
            <Avatar alt="profile pic" src={foto} />
          </Grid>
          <Grid item sm alignItems="right">
            <div className={classes.pageIcon}>
              <Typography
                variant="h6"
                component="div"
                sx={{ bgcolor: "primary" }}
              >
                {nombre}
              </Typography>
              <Typography variant="body1" component="div">
                {rol}
              </Typography>
            </div>
          </Grid>
          <Grid item>
            <Controls.Button
              variant="outlined"
              size="small"
              text="Cerrar sesión"
              onClick={()=>{onLogoutSuccess()}}
              endIcon={<img src={logout} />}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
