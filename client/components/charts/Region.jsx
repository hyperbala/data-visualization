'use client'

import React from 'react';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Region = ({ data }) => {
  const regionCounts = data.reduce((acc, entry) => {
    if (entry.region && entry.region.toLowerCase() !== "world") {
      acc[entry.region] = (acc[entry.region] || 0) + 1;
    }
    return acc;
  }, {});

  const length = Object.keys(regionCounts).length;
  const regionCountsArray = Object.entries(regionCounts);
  const topRegions = regionCountsArray.sort((a, b) => b[1] - a[1]).slice(0, 6);
  const labels = topRegions.map(entry => entry[0]);
  const dataCounts = topRegions.map(entry => entry[1]);

  const violetShades = [
    "#E0BBE4", "#D291BC", "#957DAD", "#685A9E", "#4B0082", "#330066"
  ];

  const chartData = {
    labels,
    datasets: [
      {
        data: dataCounts,
        backgroundColor: violetShades.slice(0, labels.length),
        borderColor: violetShades.slice(0, labels.length),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className='border dark:border-gray-700 border-gray-300 dark:text-white text-black flex p-6 gap-10'>
      <div className='flex flex-col gap-10'>
        <span className='flex flex-col gap-1'>
          <p className='font-medium text-xl'>Regions Reported</p>
          <p className=' text-gray-500 font-thin text-md'>Displaying Top 6 Regions</p>
        </span>
        <span>
          <p className='text-3xl font-semibold'>{length}</p>
          <p className='text-gray-500'>Regions</p>
        </span>
      </div>
      <div style={{ height: "200px", width: "150px" }}>
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Region;
