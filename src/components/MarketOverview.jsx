import React, { useState, useEffect } from "react";

const MarketOverview = () => {
  const [data, setData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("xswap");
  const [totalVolume, setTotalVolume] = useState(null);
  const [totalValueLocked, setTotalValueLocked] = useState(5000);
  const [activeUsers, setActiveUsers] = useState(null);
  const [totalTransactions, setTotalTransactions] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.geckoterminal.com/api/v2/networks/xdc/dexes/${selectedOption}/pools`);
        const result = await response.json();
        const volume24H = result.data.reduce((sum, entry) => {
          const volume = parseFloat(entry.attributes.volume_usd.h24);
          const totalSum = sum + (isNaN(volume) ? 0 : volume);
          console.log('totalSum :', totalSum);
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
          console.log(pool);
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
  }, [selectedOption]); // Add selectedOption as a dependency



  return (
    <div className="bg-gray-900 text-white m-6 rounded-xl shadow-md pt-8">
      {/* Header */}
      <div className="flex justify-between items-center mx-6 mb-4">
        <h2 className="text-2xl font-bold">Market Overview</h2>
        <div className="relative">
          <select
            className="bg-gray-800 text-white p-2 rounded-md"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="xswap">XSwap</option>
            <option value="anotherOption">Another Option</option>
            {/* Add more options here */}
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
        <div className="mt-3 bg-gray-100 p-3 w-2/3 rounded-xl text-center h-72 flex justify-center items-center">
          <p className="text-sm text-gray-600">Chart visualization for TVL will appear here</p>
        </div>
      </div>

    </div>
  );
};

export default MarketOverview;
