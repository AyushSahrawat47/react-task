import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const DexContext = createContext();

export const useDex = () => {
  return useContext(DexContext);
};

export const DexProvider = ({ children }) => {
  const [dexes, setDexes] = useState([]);

  const fetchDexes = async () => {
    try {
      const response = await axios.get('https://api.geckoterminal.com/api/v2/networks/xdc/dexes');
      console.log(response.data.data);
      setDexes(response.data.data);
    } catch (err) {
      console.log({ message: err.message });
    }
  };

  useEffect(() => {
    fetchDexes();
  }, []);

  return (
    <DexContext.Provider value={{ dexes }}>
      {children}
    </DexContext.Provider>
  );
};

