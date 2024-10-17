import React, { createContext, useContext, useState, useEffect } from 'react';
import { initWeaveDB } from '../utils/weaveDBUtils';

const WeaveDBContext = createContext();

export const WeaveDBProvider = ({ children }) => {
  const [weaveDB, setWeaveDB] = useState(null);

  useEffect(() => {
    const initializeWeaveDB = async () => {
      try {
        const db = await initWeaveDB();
        setWeaveDB(db);
      } catch (error) {
        console.error("Failed to initialize WeaveDB:", error);
      }
    };

    initializeWeaveDB();
  }, []);

  return (
    <WeaveDBContext.Provider value={{ weaveDB }}>
      {children}
    </WeaveDBContext.Provider>
  );
};

export const useWeaveDB = () => useContext(WeaveDBContext);
