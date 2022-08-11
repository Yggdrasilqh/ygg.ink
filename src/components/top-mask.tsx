import React, { FunctionComponent } from "react";

export interface TopMaskProps {}

export const TopMask: FunctionComponent<TopMaskProps> = () => {
  return (
    <div className="h-40 from-white to-transparent bg-gradient-to-b via-white sticky top-0 w-full z-10"></div>
  );
};
