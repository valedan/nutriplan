import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutButton() {
  const { user } = useAuth0();

  if (user) {
    return <h1>Welcome to Nutriplan, {user.name || user.email}</h1>;
  }
  return <h1>Welcome to Nutriplan</h1>;
}
