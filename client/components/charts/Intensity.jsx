import React from "react";
import { Chart } from "react-chartjs-2";

const Likelyhood = ({ data }) => {

  const regionCounts = {};
  data.forEach(item => {
    if (item.country in regionCounts && item.intensity > 0) {
      regionCounts[item.country] += item.intensity;
    } else if (item.country.length > 0) {
      regionCounts[item.country] = item.intensity;

    }
  });
  const chartData = {
    labels: Object.keys(regionCounts),
    datasets: [
      {
        label: "Intensity",
        data: Object.values(regionCounts),
        fill: false,
        borderColor: "rgba(79, 59, 169, 1)",
        pointRadius: 0
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <div className='border dark:border-gray-700 border-gray-300 dark:text-white text-black flex flex-col justify-end p-6'>
      <span className="flex flex-col gap-1">
        <p className='font-medium text-xl'>Intensity</p>
        <p className="text-gray-500 font-thin text-sm">(w.r.t Countries)</p>
      </span>
      <div  className="flex xl:flex-col xl:justify-end w-full justify-center h-full 2xl:h-[155px] xl:h-[180px] lg:h-[160px]">
        <Chart type='line' data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Likelyhood;
