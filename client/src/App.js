import React, { useEffect, useState } from 'react'
import Routes from './components/routes';
import { BrowserRouter } from 'react-router-dom';
import { UidContext } from './components/AppContext';
import axios from 'axios';

function App() {
  const  [uid, setUid] = useState(null);

  useEffect(()=>{
    const tokenControl = async ()=>{
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true
      })
      .then((res)=> setUid(res.data))
      .catch(()=>console.log('No Token'))
    }
    tokenControl()
  }, [uid])

  return (
    <UidContext.Provider value={uid}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </UidContext.Provider>
  )
}



export default App

