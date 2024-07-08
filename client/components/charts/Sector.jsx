'use client'

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChartSecondaryAxis = ({ data }) => {
  const sectorCounts = data.reduce((acc, entry) => {
    if (entry.sector) {
      acc[entry.sector] = (acc[entry.sector] || 0) + 1;
    }
    return acc;
  }, {});

  const sectors = Object.keys(sectorCounts);
  const counts = Object.values(sectorCounts);

  const smallCounts = counts.map(count => (count < 50 ? count : 0));
  const largeCounts = counts.map(count => (count >= 50 ? count : 0));

  const chartData = {
    labels: sectors,
    datasets: [
      {
        label: 'Small Counts',
        data: smallCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        yAxisID: 'y-axis-small',
      },
      {
        label: 'Large Counts',
        data: largeCounts,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        yAxisID: 'y-axis-large',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false, 
        },
      },
      'y-axis-small': {
        type: 'linear',
        position: 'left',
        ticks: {
          beginAtZero: true,
          stepSize: 10, 
        },
        title: {
          display: false,
          text: 'Small Counts',
        },
      },
      'y-axis-large': {
        type: 'linear',
        position: 'right',
        grid: {
          display: false, 
        },
        ticks: {
          beginAtZero: true,
          stepSize: 200, 
        },
        title: {
          display: false,
          text: 'Large Counts',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
      },
    },
  };

  return (
    <div className='w-full xl:h-[285px]'>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChartSecondaryAxis;
