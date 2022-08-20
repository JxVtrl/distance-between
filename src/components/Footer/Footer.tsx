import React from 'react';
import { Box } from '@mui/material';

export function Footer() {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '2%',
        width: '100%',
        textAlign: 'center',
      }}
      data-testid="footer-id"
    >
      <h3>
        Created by: Vitral, João
        {' '}
        <a href="github.com/JxVtrl" target="_blank">@JxVtrl</a>
      </h3>
    </Box>
  );
}
