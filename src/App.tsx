import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './modules/layout/header';
import { AppRoutes } from './app-router';


function App() { 
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className='app-routes'>
          <AppRoutes />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;