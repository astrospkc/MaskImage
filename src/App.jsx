import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import FabricStyle from "./components/FabricStyle";

import { ContextProvider } from "./context/ContextProvider";
import MainPage from "./components/MainPage";

function App() {
  return (
    <>
      {/* <div className=" flex bg-black justify-center items-center m-auto"> */}

      <Router>
        <ContextProvider>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/canvas" element={<FabricStyle />} />
          </Routes>
        </ContextProvider>
      </Router>

      {/* </div> */}
    </>
  );
}

export default App;
