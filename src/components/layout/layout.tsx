import React, { FunctionComponent, PropsWithChildren } from "react";
import { Nav } from "../nav";
import styles from "./layout.module.css";

export interface LayoutProps {}

export const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = ({
  children,
}) => {
  return (
    <>
      <div className={styles.inScreen}>
        <Nav
          className="p-6"
          links={[
            { name: "Home", url: "/home", root: true },
            { name: "Articles", url: "/articles" },
            { name: "Photos", url: "/photos" },
            { name: "About", url: "/about" },
          ]}
        />
        <main className={styles.main}>{children}</main>
      </div>
      <footer className={styles.footer}>
        Design, development by yggdrasil.
      </footer>
    </>
  );
};
