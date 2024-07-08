'use client'
import Link from 'next/link';
import { FaBars } from "react-icons/fa";
import { AiOutlineControl } from "react-icons/ai";
import { CiHome,CiFilter,CiSettings } from "react-icons/ci";
import { IoAnalyticsSharp } from "react-icons/io5";

import React, { useState } from 'react';

const Navbar = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="dark:text-white text-black py-2 rounded-md focus:outline-none"
      >
        <FaBars size={20} />
      </button>
      {isOpen && (
        <div className=" absolute mt-2 w-48 bg-white dark:bg-gray-950 rounded-md shadow-lg">
          <ul className="py-2">
            <li>
              <a href="#" className="hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md px-2 py-3 flex gap-3 items-center"><CiHome size={25} />
                Home</a>
            </li>
            <li>
              <a href="#" className="flex gap-3 px-2 py-3 rounded-md bg-sky-400 dark:bg-sky-800 items-center"><IoAnalyticsSharp size={25} /> Analytics</a>
            </li>
            <li>
              <a href="#" className="flex gap-3 px-2 py-3 rounded-md items-center hover:bg-gray-300 dark:hover:bg-gray-600"><AiOutlineControl size={25} />
                Access Control</a>
            </li>
            <li>
              <a href="#" className="flex gap-3 px-2 py-3 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 items-center"><CiSettings size={25} /> Settings</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
