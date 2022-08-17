import React, {
  createContext, useContext, useEffect, useState, useRef, useMemo,
} from 'react';

const AppContext = createContext({});

export function AppProvider({ children }: any) {
  const [airports, setAirports] = useState([]);

  const value = useMemo(() => ({
    airports,
    setAirports,
  }), []);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>

  );
}

export function useApp() {
  return useContext(AppContext);
}
