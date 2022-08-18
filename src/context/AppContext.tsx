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
  const [center, setCenter] = useState({
    lat: 48.84996,
    lng: 2.32540,
  });

  useEffect(() => {
    console.log(ap1);
    if (ap1.location.lat) {
      setCenter({
        lat: Number(ap1.location.lat),
        lng: Number(ap1.location.lon),
      });
    }
  }, [ap1]);
  // useEffect(() => {
  //   console.log(ap2);
  // }, [ap2]);

  function handleSubmit() {
    console.log(
      getDistanceFromLatLonInNMiles(
        Number(ap1.location.lat),
        Number(ap1.location.lon),
        Number(ap2.location.lat),
        Number(ap2.location.lon),
      ),
    );
  }

  const value: iValue = useMemo(() => ({
    ap1,
    ap2,
    setAp1,
    setAp2,
    searchedAirports,
    setSearchedAirports,
    setCenter,
    center,
    handleSubmit,
  }), [
    ap1,
    ap2,
    setAp1,
    setAp2,
    searchedAirports,
    setSearchedAirports,
    center,
    handleSubmit,
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
