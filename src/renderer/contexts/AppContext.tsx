import { Persistent } from "@utils/cache/persistent";
import React from "react";

Persistent.setSession("TOKEN__", `token`);
const appGlobal = {
  setToken: (token: string) => {
    Persistent.setSession("TOKEN__", token);
  },
  getToken: () => {
    return Persistent.getSession("TOKEN__");
  },
};
export const AppContext = React.createContext(appGlobal);
export const useAppContext = () => {
  return React.useContext(AppContext);
};
const AppWrapper: React.FC<any> = ({ children }) => {
  return (
    <AppContext.Provider value={appGlobal}>{children}</AppContext.Provider>
  );
};

export default AppWrapper;
