'use client'
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/nav/Sidebar';
import Navbar from '../components/nav/Navbar';
import Likelyhood from '../components/charts/Likelihood';
import Intensity from '../components/charts/Intensity';
import Region from '../components/charts/Region';
import Relevance from '../components/charts/Relevance';
import Year from '../components/charts/Year';
import Sector from '../components/charts/Sector';
import { CiCalendar } from 'react-icons/ci';
import { BsFileBarGraph } from 'react-icons/bs';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [relevanceData, setRelevanceData] = useState([]);
  const [intensityData, setIntensityData] = useState([]);
  const [selectedButton, setSelectedButton] = useState('button1');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (filters = {}) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`https://api.render.com/deploy/srv-cq5u90tds78s73d8qlkg?key=p4q-FuBMWMY/data?${query}`);
      const result = await response.json();
      setData(result);
      setFilteredData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchFilteredData = async (filters = {}, component) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`https://api.render.com/deploy/srv-cq5u90tds78s73d8qlkg?key=p4q-FuBMWMY/data?${query}`);
      const result = await response.json();
      if (component === 'relevance') {
        setRelevanceData(result);
      } else if (component === 'intensity') {
        setIntensityData(result);
      } else {
        setFilteredData(result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilterChange = (filters) => {
    if (filters.year) {
      fetchFilteredData({ year: filters.year }, 'relevance');
    }
    if (filters.pestel) {
      fetchFilteredData({ pestel: filters.pestel }, 'intensity');
    }
    fetchFilteredData(filters);
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 bg-white dark:bg-slate-900 text-black dark:text-white overflow-y-auto">
        <Navbar onFilterChange={handleFilterChange} />
        <div className="flex flex-col xl:grid grid-rows-3 grid-flow-col gap-4 mt-9 mx-4 lg:mx-9">
          <div className="row-span-3 flex flex-col gap-4">
            < Likelyhood data={intensityData.length > 0 ? intensityData : filteredData} />
            <Intensity data={filteredData} />
          </div>
          <div className="grid col-span-2 grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <Region data={filteredData} />
            </div>
            <div className="col-span-1">
              <Relevance data={relevanceData.length > 0 ? relevanceData : filteredData} />
            </div>
          </div>
          <div className="row-span-2 col-span-2 w-full">
            <div className="flex flex-col gap-4 items-center w-full h-full">
              <div className="border dark:border-gray-700 w-full border-gray-300 dark:text-white text-black flex flex-col p-6">
                <div className="flex justify-between mb-4">
                  <div>
                    {selectedButton === 'button1' ? (
                      <p className="font-medium text-xl">Year vs Intensity</p>
                    ) : (
                      <p className="font-medium text-xl">Sector</p>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      className={`p-4 rounded-lg focus:outline-none transition-colors duration-200 hover:shadow-md border-2 ${
                        selectedButton === 'button1' ? 'border-blue-500' : 'border-gray-300'
                      }`}
                      onClick={() => handleButtonClick('button1')}
                    >
                      <CiCalendar size={25} />
                    </button>
                    <button
                      className={`p-4 border-2 rounded-lg focus:outline-none transition-colors duration-200 hover:shadow-md ${
                        selectedButton === 'button2' ? 'border-blue-500' : 'border-gray-300'
                      }`}
                      onClick={() => handleButtonClick('button2')}
                    >
                      <BsFileBarGraph size={25} />
                    </button>
                  </div>
                </div>
                {selectedButton === 'button1' ? <Year data={filteredData} /> : <Sector data={filteredData} />}
              </div>
              <div className="flex w-full justify-end pb-3 xl:pb-0 mt-8 gap-4">
                <p className="hover:text-blue-900 hover:underline hover:cursor-pointer dark:hover:text-sky-800">
                  Documentation
                </p>
                <p className="hover:text-blue-900 hover:underline hover:cursor-pointer dark:hover:text-sky-800">
                  Learn
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
