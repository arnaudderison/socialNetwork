import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/home';
import Profil from '../pages/profil';
function route() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/profil' element={<Profil />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    )
}

export default route
