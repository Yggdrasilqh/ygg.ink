import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from "next/app";
import { Layout, TopMask } from "../components";
import Head from "next/head";
import type { NextPage } from "next";
import { FC, ReactNode } from "react";

config.autoAddCss = false;

export type NextPageWithLayout<TProps> = NextPage<TProps> & {
  topMask?: boolean;
  withoutNav?: boolean;
  footerPrefix?: ReactNode;
  rememberScroll?: boolean;
};

type AppPropsWithOptions = AppProps & {
  Component: NextPageWithLayout<unknown>;
};

const MyApp: FC<AppPropsWithOptions> = ({ Component, pageProps }) => {
  let topMask = <></>;

  if (Component.topMask) {
    topMask = <TopMask />;
  }

  return (
    <Layout
      withoutNav={Component.withoutNav}
      rememberScroll={Component.rememberScroll}
      footerPrefix={Component.footerPrefix}
    >
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        {/* <meta
          name="viewport"
          content="width=device-width"
          initialScale="1.0"
          userScalable="no"
          viewportFit="cover"
        /> */}
      </Head>
      {topMask}
      <Component {...pageProps} />
      {/* <Toast /> */}
    </Layout>
  );
};

export default MyApp;
