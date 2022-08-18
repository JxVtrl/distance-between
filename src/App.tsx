import React from 'react';
import { Home } from './pages';
import { AppProvider } from './context';

function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}

export default App;
