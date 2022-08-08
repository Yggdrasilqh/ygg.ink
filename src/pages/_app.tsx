import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps } from "next/app";
import { Layout } from "../components";
import Head from "next/head";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
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
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
