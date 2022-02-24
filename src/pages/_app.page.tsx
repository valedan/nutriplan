/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "config/styles.css";
import "config/loading.css";
import Head from "next/head";
import { Auth0Provider } from "@auth0/auth0-react";
import type { AppProps } from "next/app";
import { Layout } from "components";
import { ApolloWrapper } from "providers";

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
        <Head>
          <title key="title">Nutriplan | Nutrition made simple</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloWrapper>
    </Auth0Provider>
  );
};

export default MyApp;
