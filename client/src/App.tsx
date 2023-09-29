import React from 'react';
import Button from '@mui/material/Button';
import './App.css';
import Router from './Router';
import { ServicesProvider } from './services/ServicesContext';

function App() {
  return (
    <div className="App">
      <ServicesProvider>
        <Router />
      </ServicesProvider>
    </div>
  );
}

export default App;
