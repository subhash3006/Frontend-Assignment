import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { MimicMetrics } from '../Components/api-mimic';
import LineGraph from './LineGraph';
import AreaGraph from './AreaGraph';
import { Chart, Filler } from 'chart.js';

Chart.register(Filler);
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Metrics = () => {
  const [metricsData, setMetricsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await MimicMetrics.fetchMetrics({ startTs: Date.now() - 2700000, endTs: Date.now() });
        setMetricsData(data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };
    fetchData();

    // Cleanup function (optional)
    return () => {
      // Cleanup code if needed
    };
  }, []);

  return (
    <div className="border-2 border-sky-200 rounded-md m-3 overflow-hidden mt-[72px]">
      <div className="border-b-2 border-sky-200 h-12 font-bold text-3xl p-1">Metrics</div>
      <div className=" grid grid-cols-2 gap-2 p-1 bg-sky-50  ">
        {metricsData.slice(0, 3).map((graph, index) => (
          <div key={index} className="border-2 border-sky-200 rounded-md bg-white ">
            <LineGraph data={graph.graphLines} name={graph.name} />
          </div>
        ))}
        {metricsData.slice(3, 4).map((graph, index) => (
          <div key={index} className="border-2 border-sky-200 rounded-md bg-white ">
            <AreaGraph data={graph.graphLines} name={graph.name}/>
          </div>
        ))}
      </div>
    </div>
   
  );
};

export default Metrics;
