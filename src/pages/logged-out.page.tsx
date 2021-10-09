import { LoginButton } from "../components/shared";

const LoggedOut = () => {
  return (
    <div>
      <h1>You have been logged out</h1>
      <span>Click here to log back in: </span>
      <LoginButton />
    </div>
  );
};

export default LoggedOut;
