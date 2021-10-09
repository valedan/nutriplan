import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingScreen } from "../components/shared";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    void loginWithRedirect({});
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default RequireAuth;
