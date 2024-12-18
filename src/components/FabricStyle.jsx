import { Canvas, Circle, FabricText, Line, Rect } from "fabric";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { BsFillSquareFill } from "react-icons/bs";
import SettingsPanel from "./SettingsPanel";
import { BsCircleFill } from "react-icons/bs";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { BsSlashSquare } from "react-icons/bs";
import Menu from "./Menu";
import { BiRectangle } from "react-icons/bi";
// import { settingContext } from "../context/ContextProvider";

export default function FabricStyle() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      const initcanvas = new Canvas(canvasRef.current, {
        width: window.innerWidth - window.innerWidth / 3,
        height: window.innerHeight - window.innerHeight / 3,
        isDrawingMode: true,
      });
      initcanvas.backgroundColor = "grey";

      initcanvas.renderAll();
      setCanvas(initcanvas);
      return () => {
        initcanvas.dispose();
      };
    }
  }, []);

  const addRectangle = () => {
    console.log("handle rect button");
    if (canvas) {
      let rectangle = new Rect({
        width: 200,
        height: 100,
        rotatingPointOffset: 80,
      });

      // let circle = new Circle({
      //   left: 1000,
      //   top: 50,
      //   fill: "red",

      //   radius: 50,
      // });
      // rectangle.clipPath = circle;

      canvas.add(rectangle);
    }
  };

  const addCircle = () => {
    console.log("handle circle button");
    if (canvas) {
      let circle = new Circle({
        left: 50,
        top: 50,
        fill: "red",

        radius: 50,
      });
      canvas.add(circle);
    }
  };

  const addLine = () => {
    console.log("handle circle button");
    if (canvas) {
      let line = new Line([150, 10, 220, 150], {
        stroke: "green",
        absolutePositioned: true,
      });
      canvas.add(line);
    }
  };

  const handleShowSettings = () => {
    console.log("show settings");
    setShowSettings(!showSettings);
  };

  return (
    <>
      <div className="flex w-full justify-center items-center h-full">
        <div></div>
        <div className=" fixed left-0 p-2 justify-start items-center rounded-xl shadow-lg shadow-black mx-3 ">
          <h1 className="text-lg">Shapes</h1>
          <div className="flex flex-col  gap-4 justify-center items-center mt-3">
            <BsFillSquareFill
              className="hover:cursor-pointer "
              onClick={addRectangle}
            />
            <BsCircleFill
              className="hover:cursor-pointer"
              onClick={addCircle}
            />
            <BsSlashSquare className="hover:cursor-pointer" onClick={addLine} />
            {/* <button onClick={handleClipPath}>Clip path</button> */}
          </div>
        </div>{" "}
        <div className=" flex bottom-[1%] fixed justify-center items-center ">
          <Menu canvas={canvas} />
        </div>
        <canvas className="my-4" ref={canvasRef} id="canvas" />
        <div className="right-0 fixed  justify-end items-center top-1/4 mx-3 shadow-lg shadow-black">
          {!showSettings ? (
            <div
              onClick={handleShowSettings}
              className="flex flex-row bg-stone-500 w-fit p-1 rounded-lg items-center"
            >
              <BsArrowLeftSquareFill className="text-xl mx-3 hover:cursor-pointer  text-white" />
              <span>click to start drawing</span>
            </div>
          ) : (
            <div>
              <div
                className="flex flex-row bg-stone-500 w-fit p-1 rounded-lg items-center"
                onClick={handleShowSettings}
              >
                <BsArrowRightSquareFill className="text-xl mx-3 hover:cursor-pointer  text-black" />
                <span>close settings</span>
              </div>
              <SettingsPanel canvas={canvas} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
