import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useApp } from '../../context';
import { airportsReq } from '../../services';
import { airports } from '../../data';
import { useDevice } from '../../hooks';

type isearchList = {
  items: any[];
}

export function Form() {
  const { device: { isMobile } } = useDevice();
  const {
    setAp1, setAp2,
  } = useApp();

  const [searchList, setSearchList] = useState<isearchList[]>([]);

  async function handleSearch(txt: string) {
    if (txt.length > 2) {
      setSearchList(await airportsReq({ nameTxt: txt }));
    } else {
      setSearchList([]);
    }
  }

  async function handleSetAirport(txt: string, id: number) {
    if (txt) {
      const ap = searchList.find((item: any) => item.name === txt);
      if (ap) {
        if (id === 0) {
          setAp1(ap);
        } else if (id === 1) {
          setAp2(ap);
        }
      }
    }
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '2rem',
        borderRadius: '1rem',
        zIndex: 1,
        padding: '15px 10px',
      }}
    >
      {airports.map((item) => (
        <Autocomplete
          key={item.id}
          disablePortal
          isOptionEqualToValue={(option, value) => option.name === value.name}
          onKeyUp={(e: any) => handleSearch(e.target.value)}
          onBlur={(e: any) => handleSetAirport(e.target.value, item.id)}
          onChange={(e: any) => handleSetAirport(e.target.value, item.id)}
          options={searchList.map((airport: any) => airport.name)}
          sx={{
            maxWidth: '250px',
            width: '100%',
            height: '50px',
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={item.name}
              variant="outlined"
              fullWidth
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Box>
                    {params.InputProps.endAdornment}
                  </Box>
                ),
              }}
            />
          )}
        />
      ))}
    </Box>
  );
}
