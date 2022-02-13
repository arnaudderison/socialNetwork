import React from 'react';
import './style/style.scss';
import Routes from './components/routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}



export default App

