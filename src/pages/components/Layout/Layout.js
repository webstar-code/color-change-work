import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

const Layout = ({navData, children }) => {
  return (
    <div className="flex mx-auto p-5 relative">
      <div className="absolute top-5 left-5 bottom-5 h-full w-52 mt-7 lg:block hidden">
        <Sidebar />
      </div>
      <div className="flex-grow-1 lg:ml-64 py-2 w-full">
        <Navbar navData={navData}/>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
