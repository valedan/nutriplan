import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-28 ml-8"
      type="submit"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
}
