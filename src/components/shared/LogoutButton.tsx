import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutButton() {
  const { logout } = useAuth0();

  return (
    <button
      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-28 ml-8"
      type="submit"
      // TODO: Redirect to marketing site once that is online
      onClick={() => logout({ returnTo: `${window.location.origin}/logged-out` })}
    >
      Log Out
    </button>
  );
}
