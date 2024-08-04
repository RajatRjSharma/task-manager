import React from "react";
import logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { setForm } from "../slices/taskSlice";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header>
      <nav className=" border-gray-200 px-4 lg:px-6 py-2.5 bg-gray-800 fixed w-full z-10">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center">
            <img
              src={logo}
              className="mr-3 h-6 sm:h-9"
              alt="task_manager_logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              Task Manager
            </span>
          </div>
          <div className="flex items-center lg:order-2">
            <button
              className=" text-white focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-gray-400"
              onClick={() => {
                dispatch(setForm({ active: true, content: {}, isEdit: false }));
              }}
            >
              Add Task
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
