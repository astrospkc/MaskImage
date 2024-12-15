import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import MODE from "../miscellaneous/utils";

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
        type="color"
        defaultValue="red"
        name="color"
        placeholder="Color"
        onChange={handleColorChange}
      />
      <div className="flex flex-col p-3">
        <h3>Brushes</h3>
        <select name="brush" className="p-3 rounded-lg">
          {MODE &&
            MODE.map((item) => {
              return (
                <option key={item.id} value={10}>
                  {item.mode}
                </option>
              );
            })}
          <option value="">pattern</option>
          <option value="">normal</option>
          <option value="">dashed</option>
          <option value="">blur</option>
        </select>
        <input
          type="range"
          defaultValue={10}
          name="range"
          placeholder="Range"
          onChange={handleBrushStrokeChange}
        />
      </div>
    </div>
  );
};

SettingsPanel.propTypes = {
  canvas: PropTypes.shape({
    on: PropTypes.func.isRequired,
  }).isRequired,
};

export default SettingsPanel;
