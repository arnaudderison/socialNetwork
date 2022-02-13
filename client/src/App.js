import React from 'react';
import Home from './components/home.js'
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/test' component={<Home/>}/>
        
      </Routes>
    </div>
  )
}

export default App

