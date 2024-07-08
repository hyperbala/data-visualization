'use client'

import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Intensity = ({ data }) => {
  const pestleData = {};
  data.forEach(item => {
    const pestle = item.pestle;
    if (!pestleData[pestle]) {
      pestleData[pestle] = {
        relevanceSum: 0,
        likelihoodSum: 0,
        count: 0,
      };
    }
    pestleData[pestle].relevanceSum += item.relevance || 0;
    pestleData[pestle].likelihoodSum += parseInt(item.likelihood) || 0;
    pestleData[pestle].count++;
  });

  // Calculate average relevance and intensity for each pestle category
  const labels = Object.keys(pestleData).map(pestle => pestle.substring(0, 3) + '.');
  const relevanceData = Object.keys(pestleData).map(pestle => (pestleData[pestle].relevanceSum / pestleData[pestle].count));
  const intensityData = Object.keys(pestleData).map(pestle => (pestleData[pestle].likelihoodSum / pestleData[pestle].count));

  // Prepare data for radar chart
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Relevance',
        data: relevanceData,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointRadius: 0,
      },
      {
        label: 'Likelihood',
        data: intensityData,
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointRadius: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        ticks: {
          display: false, 
        },
        suggestedMin: 0,
        suggestedMax: 0,
      },
    },
  };

  return (
    <div className='border dark:border-gray-700 border-gray-300 dark:text-white text-black flex flex-col p-6 gap-10 w-full'>
      <span>
        <p className='font-medium text-lg'>Pestle</p>
        <p className='text-gray-500 font-thin text-md'>Likelihood vs Relevance</p>
      </span>
      <div className="xl:h-[270px] xl:w-[250px] xl:block flex justify-center h-full w-full">
        <Radar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Intensity;
