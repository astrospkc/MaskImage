import React from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div>
      <h1 className="frijole-regular">PhotoCloak</h1>
      <p className="text-xl my-3">Get the demo to test what it does</p>
      <div className="gap-4">
        <button>
          <Link to="/signup">SignUp</Link>
        </button>
        <button>
          <Link to="/signin">Login</Link>
        </button>
        <button>
          <Link to="/canvas">Demo</Link>
        </button>
      </div>
    </div>
  );
};

export default MainPage;
