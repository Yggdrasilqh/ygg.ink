import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { NextPageWithLayout } from "./_app";

export interface ResumeProps {}

export const Resume: NextPageWithLayout<ResumeProps> = () => {
  return (
    <iframe
      className="h-screen mb-2"
      src="https://pjigj2ikbamdp3sp.public.blob.vercel-storage.com/YGG-CN-Resume-DnXH0WsBHJEIbYpYSmZejpMsabh59E.pdf#toolbar=0&navpanes=0zoom=page-width"
    />
  );
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
