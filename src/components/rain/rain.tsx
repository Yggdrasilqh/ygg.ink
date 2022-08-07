import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { RainDrops } from "./rain-drops";

export interface RainProps {}

export const Rain: FunctionComponent<RainProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let canvas = canvasRef.current!;

    let rainDrops = new RainDrops(canvas);

    rainDrops.run();
  }, []);

  return (
    <canvas
      style={{
        position: "fixed",
        top: 0,
        zIndex: -1,
      }}
      ref={canvasRef}
    ></canvas>
  );
};
