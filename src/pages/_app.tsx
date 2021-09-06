/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "tailwindcss/tailwind.css";
import { Auth0Provider } from "@auth0/auth0-react";
import type { AppProps } from "next/app";
import ApolloWrapper from "../utils/ApolloWrapper";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI}
      audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
      scope="read:current_user update:current_user_metadata"
    >
      <ApolloWrapper>
        <Component {...pageProps} />
      </ApolloWrapper>
    </Auth0Provider>
  );
};

export default MyApp;
