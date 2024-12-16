import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-row w-full top-0 justify-around bg-black p-3 shadow-lg shadow-gray-900">
      <h1 className="flex w-fit text-sm items-center shadow-sm shadow-emerald-700 rounded-full p-3">
        <Link to="/">PhotoCloak</Link>
      </h1>
      <div className="flex flex-row">
        <button>
          <Link to="/canvas">Demo</Link>
        </button>
        <button>
          <Link to="/photos">Get the edited photos</Link>
        </button>
        <button>
          <Link to="/signin">SignIn</Link>
        </button>
        <button>
          <Link to="/signup">SignUp</Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
