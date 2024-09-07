import React, { useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { NextPageWithLayout } from "./_app";

export interface ResumeProps {}

export const Resume: NextPageWithLayout<ResumeProps> = () => {
  useEffect(() => {
    location.href =
      "https://pjigj2ikbamdp3sp.public.blob.vercel-storage.com/YGG-CN-Resume-DnXH0WsBHJEIbYpYSmZejpMsabh59E.pdf";
  }, []);

  return <></>;
};

Resume.topMask = false;
Resume.withoutNav = true;
Resume.footerPrefix = (
  <Link href="/">
    <FontAwesomeIcon
      className={classNames(
        "mr-2",
        "group-hover:scale-90",
        "transition-transform",
        "origin-right",
        "mt-1"
      )}
      icon={faLeftLong}
    />
  </Link>
);

export default Resume;
