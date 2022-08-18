import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useApp } from '../../context';
import { airportsReq } from '../../services';
import { airports } from '../../data';
import { useDevice } from '../../hooks';
import { iAp } from '../../context/AppContext'

type isearchList = {
  items: iAp[];
}

export function Form() {
  const [ap1Value, setAp1Value] = useState<iAp | null>(null);
  const [ap2Value, setAp2Value] = useState<iAp | null>(null);

  const { device: { isMobile } } = useDevice();
  const {
    setAp1, setAp2, handleSubmit,
  } = useApp();

  const [searchList, setSearchList] = useState<isearchList[]>([]);

  useEffect(() => {
    setAp1(ap1Value);
  }, [ap1Value]);

  useEffect(() => {
    setAp2(ap2Value);
  }, [ap2Value]);

  async function handleSearch(txt: string) {
    if (txt.length > 2) {
      setSearchList(await airportsReq({ nameTxt: txt }));
    } else {
      setSearchList([]);
    }
  }

  function handleChange(value: string, id: number) {
    const ap = searchList.find((item: any) => item.name === value);
    if (ap) {
      if (id === 0) {
        setAp1Value(ap);
      } else if (id === 1) {
        setAp2Value(ap);
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
        borderRadius: '1rem',
        zIndex: 1,
        padding: '15px 10px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '2rem',
          borderRadius: '1rem',
          zIndex: 1,
          padding: '15px 10px',
          justifyContent: 'flex-start',
          _hover: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {airports.map((item) => (
          <Autocomplete
            key={item.id}
            disablePortal
            isOptionEqualToValue={(option, value) => option.name === value.name}
            onChange={(e: any) => handleChange(e.target.innerHTML, item.id)}
            onKeyUp={(e: any) => handleSearch(e.target.value)}
            options={searchList.map((airport: any) => airport.name)}
            sx={{
              width: '200px',
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
    </Box>
  );
}
