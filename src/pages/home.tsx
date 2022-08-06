import React, { FunctionComponent } from "react";
import { Rain } from "../components";

export interface HomeProps {}

export const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className={"h-full flex-1 flex flex-col p-6"}>
      <Rain />
      <div className="flex  items-end justify-between mt-auto">
        <div className="text-xl whitespace-pre-line">
          {`
            Mind archive, for memfree. 
            Photo archive, for future. 
            Working notes, for library.
            
            And all about:`}
        </div>
        <h1 className="text-9xl">YGGDRASIL</h1>
      </div>
    </div>
  );
};

export default Home;
