import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "components";

const LoggedOut = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <h1>You have been logged out</h1>
      <span>Click here to log back in: </span>
      <Button size="small" onClick={() => loginWithRedirect()}>
        Log in
      </Button>
    </div>
  );
};

export default LoggedOut;
