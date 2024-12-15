import { createContext, useRef, useState } from "react";

// Create a context
const SettingContext = createContext(null);

// Define the ContextProvider component
const ContextProvider = ({ children }) => {
  const [imageIconClicked, setImageIconClicked] = useState(false);
  const [brushStrokeWidth, setBrushStrokeWidth] = useState(3);

  return (
    <SettingContext.Provider
      value={{
        imageIconClicked,
        setImageIconClicked,
        brushStrokeWidth,
        setBrushStrokeWidth,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

// Export the ContextProvider as default
export { SettingContext, ContextProvider };
