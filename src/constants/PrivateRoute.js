import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

/* From https://v5.reactrouter.com/web/example/auth-workflow */
export default function PrivateRoute(props) {
  const { requireRoles, component: Component, ...rest } = props;
  const history = useHistory();

  let rol = JSON.parse(localStorage.getItem("rol"));

  let permiso = 0;

  if (requireRoles.includes(rol)) {
    permiso = 1;
  }
  if (rol == null) {
    permiso = 2;
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        switch (permiso) {
          case 0:
            switch (rol) {
              case 0:
                return history.push("/admin");
              case 1:
                return history.push("/client");
              default:
                return history.push("/registro");
            }
          case 1:
            return <Component {...props} />;
          default:
            return <Redirect to={{ pathname: "/login" }} />;
        }
      }}
    />
  );
}
