import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import { Rain } from "../components";
import { faFileArchive } from "@fortawesome/free-regular-svg-icons";
import { Card } from "../components/card";

export interface AboutProps {}

export const About: FunctionComponent<AboutProps> = () => {
  return (
    <div className={"min-h-screen flex-1 flex flex-col p-6"}>
      <Rain />
      <Card />
    </div>
  );
};

export default About;
