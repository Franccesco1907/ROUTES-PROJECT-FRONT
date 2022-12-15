import React, { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [rol, setRol] = useState(JSON.parse(localStorage.getItem("rol")) || {});

  const [open, setOpen] = useState(
    JSON.parse(localStorage.getItem("oasd")) || true
  );

  const [selectedIndex, setSelectedIndex] = useState(
    JSON.parse(localStorage.getItem("ind")) || 0
  );

  const [selectedIndexI, setSelectedIndexI] = useState(
    JSON.parse(localStorage.getItem("iind")) || 0
  );

  const setUserAndLocal = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };
  const setRoleAndLocal = (rol) => {
    localStorage.setItem("rol", JSON.stringify(rol));
    setRol(rol);
  };
  const setOpenAndLocal = (open) => {
    localStorage.setItem("oasd", JSON.stringify(open));
    setOpen(open);
  };
  const setIndexAndLocal = (selectedIndex) => {
    localStorage.setItem("ind", JSON.stringify(selectedIndex));
    setSelectedIndex(selectedIndex);
  };

  const setIndexItemAndLocal = (selectedIndexI) => {
    localStorage.setItem("iind", JSON.stringify(selectedIndexI));
    setSelectedIndexI(selectedIndexI);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: setUserAndLocal,
        rol,
        setRol: setRoleAndLocal,
        open,
        setOpen: setOpenAndLocal,
        selectedIndex,
        setSelectedIndex: setIndexAndLocal,
        selectedIndexI,
        setSelectedIndexI: setIndexItemAndLocal,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
