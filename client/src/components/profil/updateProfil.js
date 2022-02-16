import React from 'react'
import { useSelector } from 'react-redux';

function UpdateProfil() {
    const userData = useSelector((state) => state.userReducer)
    return (
        <div className='container-profil'>
            <div className='card-box'>
                <div className='title-card'>
                    <h1>{userData.pseudo}</h1>
                </div>
                <div className='update-container'>
                    <img src={userData.picture}/>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfil
