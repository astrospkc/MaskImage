import { Canvas, FabricText } from "fabric";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

export default function FabricStyle() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initcanvas = new Canvas(canvasRef.current, {
        width: 500,
        height: 500,
      });
      initcanvas.backgroundColor = "white";
      initcanvas.renderAll();
      setCanvas(initcanvas);
      return () => {
        initcanvas.dispose();
      };
    }
  }, []);

  return (
    <>
      <div>
        <canvas ref={canvasRef} id="canvas" />
      </div>
    </>
  );
}
