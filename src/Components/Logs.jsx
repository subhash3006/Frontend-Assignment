import React, { useState, useEffect, useRef } from 'react';
import { MimicLogs } from '../Components/api-mimic';

const Logs = () => {
  const queryParams = new URLSearchParams(location.search);
  const [logs, setLogs] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 50 });
  const [customTimeRange, setCustomTimeRange] = useState(null);
  const logContainerRef = useRef(null);

  useEffect(() => {
    const fetchLogs = async () => {
      let startTime = null;
      let endTime = Date.now();

      if (customTimeRange) {
        startTime = customTimeRange.start;
        endTime = customTimeRange.end;
      } else {
        const lastNMinutes = queryParams.get('lastNMinutes');
        const lastNHours = queryParams.get('lastNHours');
        
        if (lastNMinutes) {
          startTime = endTime - lastNMinutes * 60 * 1000;
        } else if (lastNHours) {
          startTime = endTime - lastNHours * 60 * 60 * 1000;
        } else {
          startTime = endTime - 60 * 60 * 6 * 1000; // Default: 6 hours ago
        }
      }

      const fetchedLogs = await MimicLogs.fetchPreviousLogs({
        startTs: startTime,
        endTs: endTime,
        limit: pagination.limit,
        page: pagination.page,
      });
      setLogs(fetchedLogs);
    };

    fetchLogs();
  }, [customTimeRange, pagination, queryParams]);

  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (customTimeRange) {
      searchParams.set('start', customTimeRange.start);
      searchParams.set('end', customTimeRange.end);
    } else {
      queryParams.delete('start');
      queryParams.delete('end');
    }
  }, [customTimeRange, queryParams]);

  const handleScroll = () => {
    if (
      logContainerRef.current.scrollTop === 0 &&
      pagination.page > 1 &&
      !customTimeRange
    ) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        page: prevPagination.page + 1,
      }));
    }
  };

  const handleCustomTimeRangeChange = (start, end) => {
    setCustomTimeRange({ start, end });
    setPagination({ page: 1, limit: 50 });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const time = date.toLocaleTimeString('default', { hour12: false });
    const milliseconds = date.getMilliseconds();
    return `${month} ${day} ${time}.${milliseconds}`;
  };

  return (
    <div className='mt-[70px]'>
      <div className="px-2 py-1.5 bg-gray-500 text-white inline-block rounded-md ml-[620px] mb-1">Previous Logs</div>
      {customTimeRange && (
        <DateRangePicker onChange={handleCustomTimeRangeChange} />
      )}
      <div
        ref={logContainerRef}
        className="max-h-500px overflow-y-auto"
        onScroll={handleScroll}
      >
        {logs.map((log, index) => (
          <div key={index} className="log-container bg-black text-white font-light">
            <span className="text-sky-300 items-center">{formatDate(log.timestamp)}</span> :-
            <div className="log-details ml-[148px] -mt-6">
              <span>{log.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Logs;
