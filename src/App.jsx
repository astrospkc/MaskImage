import "./App.css";
import FabricStyle from "./components/FabricStyle";
import { ContextProvider } from "./context/ContextProvider";

function App() {
  return (
    <>
      {/* <div className=" flex bg-black justify-center items-center m-auto"> */}
      <ContextProvider>
        <FabricStyle />
      </ContextProvider>

      {/* </div> */}
    </>
  );
}

export default App;
