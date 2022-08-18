import React, {
  createContext, useContext, useEffect, useState, useMemo,
} from 'react';
import { getDistanceFromLatLonInNMiles } from '../hooks';
import { airportsReq } from '../services';

interface iAp {
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

interface iValue {
  ap1: iAp | null
  ap2: iAp | null
  searchedAirports : iAp[]
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

  const value: iValue = useMemo(() => ({
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

export function useApp() {
  return useContext(AppContext);
}
