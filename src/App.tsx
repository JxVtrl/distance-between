import React from 'react';
import { Map } from './components';
import { AppProvider } from './context';

function App() {
  return (
    <AppProvider>
      <Map />
    </AppProvider>
  );
}

export default App;
