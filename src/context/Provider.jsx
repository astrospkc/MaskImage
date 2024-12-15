import { createContext, useRef, useState } from "react";

// Create a context
export const settingContext = createContext(null);

// Define the ContextProvider component
const ContextProvider = ({ children }) => {
  const [imageIconClicked, setImageIconClicked] = useState(false);

  const canvasRef = useRef(null);

  return (
    <settingContext.Provider
      value={{
        imageIconClicked,
        setImageIconClicked,

        canvasRef,
      }}
    >
      {children}
    </settingContext.Provider>
  );
};

// Export the ContextProvider as default
export default ContextProvider;
