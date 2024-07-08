'use client'
import { useState, useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";
import { CiDark } from "react-icons/ci";
import { GoSun } from "react-icons/go";

import Profile from './Profile';
import SidebarShort from './SidebarShort';
import Form from '../filter/Form';

const Navbar = ({ onFilterChange }) => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div>
      <div className='hidden lg:block sticky top-0 pt-3 backdrop-filter backdrop-blur-lg bg-opacity-100'>
        {/* Desktop */}
        <div className=' mx-9 mt-3 bg-white dark:bg-slate-900 text-black dark:text-white items-center border dark:border-gray-700 border-neutral-300 py-2 px-3 rounded-md'>
          <div className='md:flex'>
            <form action="" className='flex w-full items-center gap-2'>
              <IoIosSearch size={20} />
              <input type="text" placeholder='Search' className='w-3/4 outline-none bg-white dark:bg-slate-900 text-black dark:text-white' />
            </form>
            <div className='flex gap-4 items-center'>
              <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <GoSun /> : <CiDark size={20} />}
              </button>
              <Form handleFilterChange={onFilterChange} />
              <Profile />
            </div>
          </div>
        </div>

      </div>
      {/* Mobile */}
      <div className='lg:hidden flex justify-between px-9 pt-5 items-center'>
        <div className='flex items-center gap-4'>
          <SidebarShort/>
          <IoIosSearch size={20} />
        </div>

        <div className='flex gap-4 items-center'>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <GoSun /> : <CiDark size={20} />}
          </button>
          <Form handleFilterChange={onFilterChange} />
          <Profile />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
