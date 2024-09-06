import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import { Rain } from "../components";
import { faFileArchive } from "@fortawesome/free-regular-svg-icons";
import { Card } from "../components/card";
import { NextPageWithLayout } from "./_app";

export interface AboutProps {}

export const About: NextPageWithLayout<AboutProps> = () => {
  return (
    <div
      className={"flex-none flex p-6 mt-[-74px]"}
      style={{
        height: "calc(100vh - 160px + 74px)",
      }}
    >
      <embed
        className="w-4/6"
        src="https://pjigj2ikbamdp3sp.public.blob.vercel-storage.com/YGG-CN-Resume-DnXH0WsBHJEIbYpYSmZejpMsabh59E.pdf#toolbar=0&navpanes=0zoom=page-width"
        // height={""}
      />
      <div className="w-2/6 z-50">
        <Card />
      </div>
    </div>
  );
};

About.topMask = true;

export default About;
