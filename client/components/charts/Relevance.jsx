'use client'
import React from 'react';
import { Bar } from 'react-chartjs-2';

const Relevance = ({ data }) => {
  const countryData = {};
  data.forEach(item => {
    const topic = item.topic;
    if (topic) {
      if (!countryData[topic]) {
        countryData[topic] = {
          relevanceSum: 0,
          count: 0,
        };
      }
      countryData[topic].relevanceSum += item.relevance || 0;
      countryData[topic].count++;
    }
  });

  const labels = Object.keys(countryData);
  const relevanceData = labels.map(topic => ({
    topic,
    relevance: countryData[topic].relevanceSum / countryData[topic].count,
  }));

  relevanceData.sort((a, b) => b.relevance - a.relevance);

  const topCountries = relevanceData.slice(0, 6);

  const chartData = {
    labels: topCountries.map(item => item.topic),
    datasets: [
      {
        label: 'Relevance',
        data: topCountries.map(item => item.relevance),
        backgroundColor: 'rgba(54, 162, 235, 0.6)', 
        borderColor: 'rgba(54, 162, 235, 1)', 
        borderWidth: 1,
        barThickness: 10, 
      },
    ],
  };

  const options = {
    indexAxis: 'y', 
    plugins: {
      legend: {
        display: false, 
      },
    },
    scales: {
      x: {
        beginAtZero: true, 
        grid: {
          display: false, 
        },
        ticks: {
          font: {
            size: 14, 
          },
        },
      },
      y: {
        categoryPercentage: 1.0,
        barPercentage: 1.0,

        beginAtZero: true, 
        grid: {
          display: false, 
        },
        ticks: {
          font: {
            size: 12, 
          },
          stepSize: 1, 
          padding: 2,
        },
      },
    },
  };

  return (
    <div className='border dark:border-gray-700 border-gray-300 dark:text-white text-black flex flex-col p-6'>
      <div className='flex flex-col'>
          <p className='font-medium text-xl'>Relevance</p>
          <p className=' text-gray-500 font-thin text-md'>Topic wise</p>
      </div>
      <div style={{ height: "150px", width: "300px" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Relevance;
