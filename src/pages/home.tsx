import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import { Rain } from "../components";
import { faFileArchive } from "@fortawesome/free-regular-svg-icons";
import Spline from "@splinetool/react-spline";

export interface HomeProps {}

export const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className={"min-h-screen flex-1 flex flex-col p-6 relative"}>
      <Rain />
      <Spline
        className=" absolute !h-2/3 !w-2/3  bottom-32 -right-12"
        scene="https://prod.spline.design/NGXytJaGgM9iV3fz/scene.splinecode"
      />
      <div className="flex  items-end justify-between mt-auto">
        <div className="text-xl whitespace-pre-line">
          {`
            Works archive.
            Photos archive. 
            Thoughts archive. 
            
            All about:`}
        </div>
        <h1 className="text-9xl">YGGDRASIL</h1>
      </div>
    </div>
  );
};

export default Home;
