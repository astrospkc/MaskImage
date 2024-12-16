import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import FabricStyle from "./components/FabricStyle";

import { ContextProvider } from "./context/ContextProvider";
import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar";
import EditedPhotos from "./components/EditedPhotos";

function App() {
  return (
    <>
      {/* <div className=" flex bg-black justify-center items-center m-auto"> */}

      <Router>
        <Navbar />
        <ContextProvider>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/canvas" element={<FabricStyle />} />
            <Route path="/photos" element={<EditedPhotos />} />
          </Routes>
        </ContextProvider>
      </Router>

      {/* </div> */}
    </>
  );
}

export default App;
