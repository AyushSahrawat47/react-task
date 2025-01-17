import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDex } from "../context/dexContext";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MarketOverview = () => {
  const [data, setData] = useState(null);
  const [totalVolume, setTotalVolume] = useState(null);
  const [totalValueLocked, setTotalValueLocked] = useState(5000);
  const [activeUsers, setActiveUsers] = useState(null);
  const [totalTransactions, setTotalTransactions] = useState(null);
  const { dexesData, dex, setDex } = useDex();
  const [ohlcvData, setOhlcvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.geckoterminal.com/api/v2/networks/xdc/dexes/${dex}/pools`);
        const result = await response.json();
        const volume24H = result.data.reduce((sum, entry) => {
          const volume = parseFloat(entry.attributes.volume_usd.h24);
          const totalSum = sum + (isNaN(volume) ? 0 : volume);
          return totalSum;
        }, 0); // Initialize sum to 0
        setTotalVolume(volume24H);
        const active = result.data.reduce((total, pool) => {
          const buyers = pool.attributes.transactions.h24.buyers || 0;
          const sellers = pool.attributes.transactions.h24.sellers || 0;
          return total + buyers + sellers;
        }, 0);
        setActiveUsers(active);
        const totalTransactionValue = result.data.reduce((total, pool) => {
          const buys = pool.attributes.transactions.h24.buys;
          const sells = pool.attributes.transactions.h24.sells;
          return total + buys + sells;
        }, 0);
        setTotalTransactions(totalTransactionValue);

        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dex]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.geckoterminal.com/api/v2/networks/xdc/pools/0xe5c0d0bc5866bc3638f2374d59b697e4fd48ea94/ohlcv/day");
        const result = await response.json();
        setOhlcvData(result.data.attributes.ohlcv_list);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDexChange = (event) => {
    setDex(event.target.value);
  };

  // Prepare Chart.js Data
  const chartData = {
    labels: ohlcvData.map((entry) => new Date(entry[0] * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" })), // Format timestamps as 'MMM DD'
    datasets: [
      {
        label: "Open",
        data: ohlcvData.map((entry) => entry[1]),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4, // Smooth curves
      },
      {
        label: "High",
        data: ohlcvData.map((entry) => entry[2]),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Low",
        data: ohlcvData.map((entry) => entry[3]),
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Close",
        data: ohlcvData.map((entry) => entry[4]),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333", // Adjust legend color
        },
      },
      title: {
        display: true,
        text: "OHLCV Chart",
        color: "#333",
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#333",
        },
        grid: {
          color: "rgba(200, 200, 200, 0.3)", // Subtle grid color
        },
      },
      y: {
        ticks: {
          color: "#333",
        },
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
        },
      },
    },
  };

  return (
    <div className="bg-gray-900 text-white m-6 rounded-xl shadow-md pt-8">
      {/* Header */}
      <div className="flex justify-between items-center mx-6 mb-4">
        <h2 className="text-2xl font-bold">Market Overview</h2>
        <div className="relative">
          <label htmlFor="dex-select">Select DEX: </label>
          <select
            id="dex-select"
            className="bg-gray-800 text-white p-2 rounded-md"
            value={dex}
            onChange={handleDexChange}
          >
            {dexesData.map((dexItem) => (
              <option key={dexItem.id} value={dexItem.id}>
                {dexItem.attributes.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="flex justify-between items-centr p-3 rounded-xl bg-white">
        {data ? (
          <div className="gap-4 flex flex-col w-1/3 p-3">
            <div className=" p-4 rounded-lg border border-[#e9ecef] border-l-[3px] border-l-blue-600">
              <p className="text-sm text-gray-500">Total Volume (24H)</p>
              <h3 className="text-2xl  text-blue-500">$ {totalVolume.toFixed(2)}</h3>
            </div>
            <div className=" p-4 rounded-lg border border-[#e9ecef] border-l-[3px] border-l-blue-600">
              <p className="text-sm text-gray-500">Total Value Locked (24H)</p>
              <h3 className="text-2xl  text-blue-500">{totalValueLocked}</h3>
            </div>
            <div className=" p-4 rounded-lg border border-[#e9ecef] border-l-[3px] border-l-blue-600">
              <p className="text-sm text-gray-500">Active Users (24H)</p>
              <h3 className="text-2xl  text-blue-500">{activeUsers}</h3>
            </div>
            <div className=" p-4 rounded-lg border border-[#e9ecef] border-l-[3px] border-l-blue-600">
              <p className="text-sm text-gray-500">Total Transactions (24H)</p>
              <h3 className="text-2xl  text-blue-500">{totalTransactions}</h3>
            </div>
          </div>
        ) : (
          <p>Loading data...</p>
        )}

        {/* Placeholder for Chart */}
        <div className=" text-white m-6 rounded-xl  p-6">
          {loading ? (
            <p className="text-center text-gray-300">Loading data...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="p-4 rounded-xl bg-white text-gray-900">
              <div className="h-96 " style={{width:"50rem"}}>
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
