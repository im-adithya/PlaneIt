import React from "react";
import { AuthContext } from "../Auth";

export const useLogout = () => {
  const authContext = React.useContext(AuthContext);
  const logoutHandler = () => {
    authContext.user.setCurrentUser(null);
    localStorage.removeItem("planeituser");
  };
  return logoutHandler;
};
