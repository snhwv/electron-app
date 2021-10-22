import { useAppContext } from "@contexts/AppContext";
import React from "react";
import { Redirect } from "react-router-dom";

const withAuth = (Component: React.FC<any>) => (props: any) => {
  const appContext = useAppContext();
  const hasToken = appContext.getToken();
  return hasToken ? (
    <Component {...props}></Component>
  ) : (
    <Redirect to="/login"></Redirect>
  );
};
export default withAuth;
