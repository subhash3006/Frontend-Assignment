import React from 'react';
import { Line } from 'react-chartjs-2';

const LineGraph = ({ data,name }) => {
  // Extracting data from the props
  const [Limits, Requested, Used] = data;

  // Mapping the data to the format required by Chart.js
  const chartData = {
    labels: Limits.values.map(entry => {
      const date = new Date(entry.timestamp);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }),
    datasets: [
      {
        label: 'Limits',
        data: Limits.values.map(entry => (entry.value)),
        borderColor: 'rgba(0, 128, 0, 1)',
        backgroundColor: 'rgba(0, 128, 0, 1)',
      },
      {
        label: 'Requested',
        data: Requested.values.map(entry => entry.value),
        borderColor: 'rgba(0, 0, 128, 1)',
        backgroundColor: 'rgba(0, 0, 128, 1)',
      },
      {
        label: 'Used',
        data: Used.values.map(entry => entry.value),
        borderColor: 'rgba(145, 0, 0, 1)',
        backgroundColor: 'rgba(145, 0, 0, 1)',
      },
    ],
  };

  // Chart options
    const chartOptions = {
    scales: {
      xAxes: [
        {
          type: 'time',
          time: {
            unit: 'hour', 
          },
        },
      ],
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
            weight: '600',
          },
        },
      },
    },
  };

  return (
    <>
      <div className="font-bold ml-2 text-2xl text-gray-600">{name}</div>
      <Line data={chartData} options={chartOptions} />
    </>
  );
};

export default LineGraph;
