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

  const mousePositionRef = useRef<{ x: number; y: number }>();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      mousePositionRef.current = { x: e.x, y: e.y };
      setPosition({ x: e.x, y: e.y });
    });
  }, []);

  useEffect(() => {
    let canvas = canvasRef.current!;

    let rainDrops = new RainDrops(canvas, (x, y) => {
      const position = mousePositionRef.current;

      if (!position) {
        return false;
      }

      if (Math.abs(position.x - x) < 30 && Math.abs(position.y - y) < 30) {
        return true;
      }

      return false;
    });

    rainDrops.run();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        zIndex: -1,
      }}
    >
      {/* <div
        id="123"
        style={{
          background: "red",
          top: 0,
          left: 0,
          transform: `translate(${position.x - 15}px, ${position.y - 15}px)`,
          width: 30,
          height: 30,
          borderRadius: "50%",
        }}
      ></div> */}
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
