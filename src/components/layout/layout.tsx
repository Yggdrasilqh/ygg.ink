import classNames from "classnames";
import _ from "lodash";
import { useRouter } from "next/router";
import React, {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
  UIEventHandler,
} from "react";
import { useLayoutEffect } from "../../hooks";
import { Nav } from "../nav";
import styles from "./layout.module.css";

export interface LayoutProps {
  rememberScroll?: boolean;
}

const func = _.debounce((path: string, scrollTop: number) => {
  localStorage.setItem(path, `${scrollTop}`);
}, 200);

export const Layout: FunctionComponent<
  PropsWithChildren<LayoutProps>
> = ({ children, rememberScroll }) => {
  const [collapseNav, setCollapseNav] = useState(false);

  const router = useRouter();
  const path = router.pathname;

  const scrollArea = useRef<HTMLDivElement>(null);

  const onScroll: UIEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const scrollTop = event.currentTarget.scrollTop;

      if (scrollTop > 100) {
        setCollapseNav(true);
      } else {
        setCollapseNav(false);
      }

      func(location.pathname, scrollTop);
    },
    [setCollapseNav]
  );

  useLayoutEffect(() => {
    const scrollableElement = scrollArea.current;

    if (scrollableElement) {
      if (rememberScroll) {
        const targetTop = parseInt(
          localStorage.getItem(location.pathname) ?? "0"
        );

        scrollableElement.scrollTo(0, targetTop);
      } else {
        scrollableElement.scrollTo(0, 0);
        setCollapseNav(false);
      }
    }
  }, [path, rememberScroll]);

  return (
    <>
      <div
        className={classNames(
          styles.inScreen,
          "overflow-auto",
          "h-screen"
        )}
        ref={scrollArea}
        onScroll={rememberScroll ? onScroll : undefined}
      >
        <div className="group p-6 fixed z-50">
          <div className={classNames("overflow-hidden")}>
            <Nav
              className={classNames(
                "group-hover:mt-0 transition-all",
                {
                  "-mt-5": collapseNav,
                }
              )}
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
