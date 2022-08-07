import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FunctionComponent } from "react";
import { Rain } from "../components";
import { faFileArchive } from "@fortawesome/free-regular-svg-icons";

export interface HomeProps {}

export const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className={"h-full flex-1 flex flex-col p-6"}>
      <Rain />
      <div className="flex  items-end justify-between mt-auto">
        <div className="text-xl whitespace-pre-line">
          <FontAwesomeIcon className="text-6xl mb-4" icon={faFileArchive} />
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
