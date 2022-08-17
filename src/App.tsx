import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Home } from './pages';
import { AppProvider } from './context';

function App() {
  return (
    <ChakraProvider>
      <AppProvider>
        <Home />
      </AppProvider>
    </ChakraProvider>
  );
}

export default App;
