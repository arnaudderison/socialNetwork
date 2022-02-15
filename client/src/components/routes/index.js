import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../pages/home';
import Profil from '../../pages/profil';
import Navbar from '../../components/navbar';

function route() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/profil' element={<Profil />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    )
}

export default route
