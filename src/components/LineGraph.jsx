import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useGetGraphDataQuery } from "../Features/covidSlice/CovidSlice"

const LineGraph= () => {
  const { data, error, isLoading } = useGetGraphDataQuery('');

  let caseData = [];
  let recoveredData = [];
  let deathData = [];

  if (data) {
    caseData = Object.entries(data?.cases).map(([date, count]) => ({
      date,
      cases: count,
    }));

    recoveredData = Object.entries(data?.recovered).map(([date, count]) => ({
      date,
      recovered: count,
    }));

    deathData = Object.entries(data?.deaths).map(([date, count]) => ({
      date,
      deaths: count,
    }));
  }

  // const combinedData = [...caseData, ...recoveredData, ...deathData]

  const combinedData = caseData.map(({ date, cases }) => ({
    date,
    cases,
    recovered: recoveredData.find((entry) => entry.date === date)?.recovered || 0,
    deaths: deathData.find((entry) => entry.date === date)?.deaths || 0,
  }));
 
  const [chartWidth, setChartWidth] = useState(window.innerWidth - 100);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth - 100);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  return (
    <div className={`flex justify-center w-full ${data? 'border-2 p-4 bg-white border-black': ''} `}>
       {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-10 w-10"></div>
        </div>
      ) : data ? (
        <LineChart className='bg-white ' height={400} width={chartWidth} data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis fontSize={10} dataKey="date" />
          <YAxis fontSize={10} />
          <Tooltip />
          <Legend />
          <Line type="monotone" strokeWidth={1} dataKey="cases" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" strokeWidth={1} dataKey="recovered" stroke="#82ca9d" activeDot={{ r: 8 }} />
          <Line type="monotone" strokeWidth={1} dataKey="deaths" stroke="#ff0000" activeDot={{ r: 8 }} />
        </LineChart>
      ) : 'Something went worng. Please Try again later'
      }
    </div>
  );
}

export default LineGraph;
