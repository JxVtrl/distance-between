import React, {
  createContext, useContext, useState, useMemo,
} from 'react';

export interface iAp {
  icao: string
  iata: string
  name: string
  shortName: string
  municipalityName: string
  location: {
    lat: string
    lon: string
  }
  countryCode: string
}

export const AppContext = createContext({});

export function AppProvider({ children }: any) {
  const [searchedAirports, setSearchedAirports] = useState([]);
  const [ap1, setAp1] = useState<iAp>(
    {
      icao: '',
      iata: '',
      name: '',
      shortName: '',
      municipalityName: '',
      location: {
        lat: '',
        lon: '',
      },
      countryCode: '',
    },
  );
  const [ap2, setAp2] = useState<iAp>(
    {
      icao: '',
      iata: '',
      name: '',
      shortName: '',
      municipalityName: '',
      location: {
        lat: '',
        lon: '',
      },
      countryCode: '',
    },
  );

  const value = useMemo(() => ({
    ap1,
    ap2,
    setAp1,
    setAp2,
    searchedAirports,
    setSearchedAirports,
  }), [
    ap1,
    ap2,
    setAp1,
    setAp2,
    searchedAirports,
    setSearchedAirports,
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): any {
  return useContext(AppContext);
}
