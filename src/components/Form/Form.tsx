import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import AutorenewIcon from '@mui/icons-material/Autorenew';
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
    setAp1, setAp2, handleSubmit,
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '2rem',
        margin: '10px auto 0',
        maxWidth: '500px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: isMobile ? 'column' : 'row',
          marginTop: '10px',
          alignItems: 'center',
        }}
      >
        {airports.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
            }}
          >
            {item.id === 1
              && (
              <Button
                sx={{
                  width: '12%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                }}
                endIcon={(
                  <AutorenewIcon
                    sx={{
                      width: '35px',
                      height: '100%',
                    }}
                  />
                )}
              />
              )}
            <Autocomplete
              disablePortal
              isOptionEqualToValue={(option, value) => option.name === value.name}
              onKeyUp={(e: any) => handleSearch(e.target.value)}
              onBlur={(e: any) => handleSetAirport(e.target.value, item.id)}
              onChange={(e: any) => handleSetAirport(e.target.value, item.id)}
              options={searchList.map((airport: any) => airport.name)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={item.name}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {params.InputProps.endAdornment}
                      </Box>
                    ),
                  }}
                />
              )}
            />
          </Box>
        ))}
      </Box>
      <Button
        variant="outlined"
        // disabled={!ap1 && !ap2}
        onClick={() => handleSubmit()}
        size="large"
        endIcon={<SendIcon />}
      >
        Search
      </Button>
    </Box>
  );
}
