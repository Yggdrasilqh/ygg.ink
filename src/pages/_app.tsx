import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from "next/app";
import { Layout, TopMask } from "../components";
import Head from "next/head";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

config.autoAddCss = false;

export type NextPageWithLayout<TProps> = NextPage<TProps> & {
  topMask?: boolean;
};

type AppPropsWithOptions = AppProps & {
  Component: NextPageWithLayout<unknown>;
};

function MyApp({ Component, pageProps }: AppPropsWithOptions) {
  let topMask = <></>;

  if (Component.topMask) {
    topMask = <TopMask />;
  }

  return (
    <Layout>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width"
          initial-scale="1.0"
          user-scalable="no"
          viewport-fit="cover"
        />
      </Head>
      {topMask}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
