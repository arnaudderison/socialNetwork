import React from 'react'
import Log from '../components/Log/index'

function profil() {
    return (
        <div className='profil-page'>
            <div className='log-container'>
                <Log signin={false} signup={true}/>
            </div>
        </div>
    )
}

export default profil
