import { useContext, useEffect, useState } from "react";

import PropTypes from "prop-types";
import MODE from "../miscellaneous/utils";
import { Canvas, PatternBrush, PencilBrush, getEnv, Rect } from "fabric";

import { settingContext } from "../context/Provider";

const SettingsPanel = ({ canvas }) => {
  const [selectedObject, setSelectedObject] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [diameter, setDiameter] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        handleSelectedObject(e.selected[0]);
      });

      canvas.on("selection:updated", (e) => {
        handleSelectedObject(e.selected[0]);
      });
      canvas.on("selection:cleared", () => {
        setSelectedObject(null);
        clearSettings();
      });
      canvas.on("object:modified", (e) => {
        handleSelectedObject(e.target);
      });
      canvas.on("object:scaling", (e) => {
        handleSelectedObject(e.target);
      });
    }
  }, [canvas]);

  const handleSelectedObject = (object) => {
    if (!object) return;
    setSelectedObject(object);
    if (object.type === "rect") {
      setWidth(Math.round(object.width * object.scaleX));
      setHeight(Math.round(object.height * object.scaleY));
      setColor(object.fill);
    } else if (object.type === "circle") {
      setDiameter(Math.round(object.radius * 2 * object.scaleX));
      setColor(object.fill);
      setWidth("");
      setHeight("");
    }
  };

  const clearSettings = () => {
    setWidth("");
    setHeight("");
    setColor("");
    setDiameter("");
  };

  const handleWidthChange = (e) => {
    console.log(e.target.value);
  };
  const handleHeightChange = (e) => {
    console.log(e.target.value);
  };
  const handleColorChange = (e) => {
    console.log(e.target.value);
  };
  const handleBrushStrokeChange = (e) => {
    console.log(e.target.value);
  };

  // --------------------------------- drawing feature -------------------

  if (canvas) {
    // const $ = (id) => document.getElementById(id);
    canvas.freeDrawingBrush = new PencilBrush(canvas);
    canvas.freeDrawingBrush.color = "red";
    canvas.freeDrawingBrush.width = 5;

    canvas.isDrawingMode = true;
    console.log("canvas: ", canvas);

    // canvas.freeDrawingBrush.width = 5;

    canvas.on("mouse:down", function (options) {
      console.log("mouse move down:", options.absolutePointer);
      // canvas.isDrawingMode = true;
    });

    canvas.on("mouse:up", function (options) {
      console.log("mouse move up: ", options.pointer);
      canvas.isDrawingMode = false;
    });
    let clipPath;
    canvas.on("path:created", (e) => {
      clipPath = e.path;
      console.log("clipPath: ", clipPath);
    });
  } else {
    console.log("canvas not found");
    throw new Error("canvas not found");
  }

  // canvas.add(pencilBrush)

  // -------------------------------------end of drawing feature -------------

  return (
    <div className="flex flex-col bg-stone-700 p-3 rounded-lg mr-3">
      <h3 className="my-3">settings</h3>
      <label htmlFor="width">Width</label>
      <input
        type="range"
        defaultValue={width}
        name="width"
        placeholder="width"
        onChange={handleWidthChange}
      />
      <label htmlFor="height">Height</label>
      <input
        type="range"
        defaultValue={height}
        name="height"
        placeholder="Height"
        onChange={handleHeightChange}
      />
      <label htmlFor="color">Color</label>
      <input
        id="drawing-color"
        type="color"
        defaultValue="red"
        name="color"
        placeholder="Color"
        onChange={handleColorChange}
      />
      <div className="flex flex-col p-3">
        <h3>Brushes</h3>
        <select
          id="mode"
          name="brush"
          className="p-3 rounded-lg"
          // onChange={handleMode}
        >
          {MODE &&
            MODE.map((item) => {
              return (
                <option
                  id="drawing-mode-options"
                  key={item.id}
                  name={item.mode}
                  value={item.mode}
                >
                  {item.mode}
                </option>
              );
            })}
        </select>
        <input
          id="drawing-width"
          type="range"
          defaultValue={10}
          name="range"
          placeholder="Range"
          onChange={handleBrushStrokeChange}
        />

        {/* <button onClick={handleMaskImage}>mask the image</button> */}
        {/* <button onClick={handleClear} id="clear-canvas">
          clear canvas
        </button> */}
      </div>
    </div>
  );
};

SettingsPanel.propTypes = {
  canvas: PropTypes.shape({
    on: PropTypes.func.isRequired,
  }).isRequired,
};

SettingsPanel.propTypes = {
  canvas: PropTypes.instanceOf(Canvas).isRequired, // Ensure canvas is of type fabric.Canvas
};

export default SettingsPanel;
