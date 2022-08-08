import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { CSSProperties, FunctionComponent } from "react";
import styles from "./nav.module.css";

import "./nav.module.css";

export interface NavLink {
  name: string;
  url: string;
  root?: boolean;
}

export interface NavProps {
  className?: string;
  links: NavLink[];
  style?: CSSProperties;
}

export const Nav: FunctionComponent<NavProps> = ({
  className,
  links,
  style,
}) => {
  const router = useRouter();

  const pathname = router.pathname;

  return (
    <nav className={classNames(className, styles.nav)} style={style}>
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
