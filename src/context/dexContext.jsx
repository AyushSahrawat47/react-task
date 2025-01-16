import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const DexContext = createContext();

export const useDex = () => {
  return useContext(DexContext);
};

export const DexProvider = ({ children }) => {
  const [dexesData, setDexesData] = useState([]);
  const [dex, setDex] = useState("xswap");

  const fetchDexes = async () => {
    try {
      const response = await axios.get('https://api.geckoterminal.com/api/v2/networks/xdc/dexes');
      // console.log(response.data.data);
      setDexesData(response.data.data);
    } catch (err) {
      console.log({ message: err.message });
    }
  };

  useEffect(() => {
    fetchDexes();
  }, []);

  return (
    <DexContext.Provider value={{ dexesData, dex, setDex }}>
      {children}
    </DexContext.Provider>
  );
};

