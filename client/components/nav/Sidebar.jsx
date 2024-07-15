import Image from 'next/image';
import React from 'react';
import { SiAnalogue } from "react-icons/si";

import { AiOutlineControl } from "react-icons/ai";
import { CiHome,CiFilter,CiSettings } from "react-icons/ci";
import { IoAnalyticsSharp } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="h-screen xl:block hidden sticky top-0 border-r dark:border-gray-700 border-gray-300 bg-white dark:bg-slate-900 text-black dark:text-white p-4 w-1/5">
      <h1 className="text-2xl font-bold mb-4 pt-2 px-3 flex items-center gap-2">
          <SiAnalogue size={25}/>

        DashBoard</h1>
      <ul className="space-y-2 flex  flex-col mt-10">
        <li>
          <a href="#" className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md px-2 py-3 flex gap-3 items-center"><CiHome size={25}/>
          Home</a>
        </li>
        <li>
          <a href="#" className="flex gap-3 px-2 py-3 rounded-md bg-sky-400 dark:bg-sky-800 items-center"><IoAnalyticsSharp size={25} /> Analytics</a>
        </li>
        <li>
          <a href="#" className="flex gap-3 px-2 py-3 rounded-md items-center hover:bg-gray-300 dark:hover:bg-gray-600"><AiOutlineControl size={25}/>
          Access Control</a>
        </li>
        <li>
          <a href="#" className="flex gap-3 px-2 py-3 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 items-center"><CiSettings size={25} /> Settings</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
