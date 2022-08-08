import classNames from "classnames";
import React, { FunctionComponent, PropsWithChildren, useState } from "react";
import { Nav } from "../nav";
import styles from "./layout.module.css";

export interface LayoutProps {}

export const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = ({
  children,
}) => {
  const [collapseNav, setCollapseNav] = useState(false);

  return (
    <>
      <div
        className={classNames(styles.inScreen, "overflow-auto", "h-screen")}
        onScroll={(event) => {
          if (event.currentTarget.scrollTop > 100) {
            setCollapseNav(true);
          } else {
            setCollapseNav(false);
          }
        }}
      >
        <div className="group p-6 fixed z-10">
          <div className={classNames("overflow-hidden")}>
            <Nav
              className={classNames("group-hover:mt-0 transition-all", {
                "-mt-5": collapseNav,
              })}
              links={[
                { name: "Home", url: "/home", root: true },
                { name: "Articles", url: "/articles" },
                { name: "Photos", url: "/photos" },
                { name: "About", url: "/about" },
              ]}
            />
          </div>
        </div>
        <main className={classNames(styles.main)}>{children}</main>
        <footer className={styles.footer}>
          Design, development by yggdrasil.
        </footer>
      </div>
    </>
  );
};
