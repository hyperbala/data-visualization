'use client'
import React from 'react';
import { Bar } from 'react-chartjs-2';

const Year = ({ data }) => {
  const intensityData = {};
  const countByYear = {}; 

  data.forEach(item => {
    const start_year = item.start_year;
    if (start_year) {
      if (!intensityData[start_year]) {
        intensityData[start_year] = { small: 0, large: 0 };
        countByYear[start_year] = 0;
      }
      if (item.intensity < 50) { 
        intensityData[start_year].small += item.intensity || 0;
      } else {
        intensityData[start_year].large += item.intensity || 0;
      }
      countByYear[start_year]++;
    }
  });

  const labels = Object.keys(intensityData);
  const averageSmallIntensity = labels.map(year => intensityData[year].small / countByYear[year]);
  const averageLargeIntensity = labels.map(year => intensityData[year].large / countByYear[year]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Intensity',
        data: averageSmallIntensity,
        backgroundColor: 'rgba(75, 192, 192, 0.6)', 
        borderColor: 'rgba(75, 192, 192, 1)', 
        borderWidth: 1,

        yAxisID: 'y-small',
      },
      {
        label: 'Intensity',
        data: averageLargeIntensity,
        backgroundColor: 'rgba(255, 99, 132, 0.6)', 
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        yAxisID: 'y-large',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
      },
    },
    scales: {
      x: {
        grid: {
          display: false, 
        },
        ticks: {
          maxRotation: 0,

        },
      },
      'y-small': {
        beginAtZero: true, 
        grid: {
          display: false, 
        },
        position: 'left',
        ticks: {
          callback: (value) => Number(value.toFixed(0)), 
          stepSize: 5, 
        },
      },
      'y-large': {
        beginAtZero: true, 
        grid: {
          display: true,
        },
        position: 'right',
        ticks: {
          callback: (value) => Number(value.toFixed(0)), 
          stepSize: 20, 
        },
      },
    },
  };

  return (
    <div  className='w-full xl:h-[285px]'>
      <div className='w-full flex flex-col justify-end h-full'>
          <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Year;
