import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";
import styles from "./nav.module.css";

import "./nav.module.css";

export interface NavLink {
  name: string;
  url: string;
  root?: boolean;
}

export interface NavProps {
  className: string;
  links: NavLink[];
}

export const Nav: FunctionComponent<NavProps> = ({ className, links }) => {
  const router = useRouter();

  const pathname = router.pathname;

  return (
    <nav className={classNames(styles.nav, className)}>
      {links.map(({ url, name, root }) => (
        <Link key={url} href={url}>
          <a
            className={classNames(
              styles.item,
              (pathname.startsWith(url) || (root && pathname === "/")) &&
                styles.active
            )}
          >
            <div>
              <span>{name}</span>
            </div>
          </a>
        </Link>
      ))}
    </nav>
  );
};
