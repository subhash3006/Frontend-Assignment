import React, { useState } from 'react';
import Metrics from '../Components/Metrics';
import Logs from '../Components/Logs';
import Metrics1 from '../Assets/Sidepane/metrics.png';
import Metrics2 from '../Assets/Sidepane/metrics-gray.png';
import Log1 from '../Assets/Sidepane/list-active.png';
import Log2 from '../Assets/Sidepane/list.png';
import cube from '../Assets/Sidepane/cube.jpg';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Last 5 minutes');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const options = [
    'Last 5 minutes',
    'Last 15 minutes',
    'Last 30 minutes',
    'Last 1 hour',
    'Last 3 hours',
    'Last 6 hours',
  ];

  return (
    <div className="fixed -top-8 right-0 mt-12 mr-2">
      <div className="">
       <button
         className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-gray-800  bg-white border border-gray-600 rounded-md hover:bg-gray-200 focus:outline-none"
          onClick={toggleDropdown}
         >
          {selectedOption}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {options.map((option) => (
                <button
                  key={option}
                  className={`block px-4 py-2 text-sm ${
                    selectedOption === option ? 'bg-gray-500 text-gray-900' : 'text-gray-700'
                  } hover:bg-gray-300 hover:text-gray-100 w-full text-left`}
                  onClick={() => selectOption(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const Navbar = () => {
  const [isActiveMetrics, setIsActiveMetrics] = useState(true);

  const handleMetricsClick = () => {
    setIsActiveMetrics(true);
  };

  const handleLogsClick = () => {
    setIsActiveMetrics(false);
  };

  return (
    <>
      <div className="w-full h-[65px] fixed bg-white flex justify-between items-center px-6 py-1 top-0 text-black border-b-2">
        <div className="flex items-center gap-x-8">
          <h1 className="text-[36px] font-bold flex gap-x-3">
            <img src={cube} className="h-[30px] mt-[18px]" alt="logo" />
            truefoundry
          </h1>
          <div
            className={`flex items-center gap-x-2 py-2 ${
              isActiveMetrics ? 'border-b-2 border-purple-600' : ''
            }`}
          >
            <div className="">
              {isActiveMetrics ? (
                <img src={Metrics1} className="h-4" alt="active metrics icon" />
              ) : (
                <img src={Metrics2} className="h-4" alt="inactive metrics icon" />
              )}
            </div>
            <button
              className="text-1xl font-semibold"
              onClick={handleMetricsClick}
            >
              Metrics
            </button>
          </div>
          <div
            className={`flex items-center gap-x-2 py-2 ${
              !isActiveMetrics ? 'border-b-2 border-purple-600' : ''
            }`}
          >
            <div className="mt-[2px]">
              {!isActiveMetrics ? (
                <img src={Log1} className="h-3" alt="active logs icon" />
              ) : (
                <img src={Log2} className="h-3" alt="inactive logs icon" />
              )}
            </div>
            <button className="text-1xl font-semibold" onClick={handleLogsClick}>
              Logs
            </button>
          </div>
        </div>
      </div>
      
      <DropdownMenu />

      <div>
        {isActiveMetrics ? <Metrics /> : <Logs />}
      </div>
    </>
  );
};

export default Navbar;
