import React, { useContext } from 'react'
import Log from '../components/Log/index'
import { UidContext } from '../components/AppContext';
import UpdateProfil from '../components/profil/updateProfil';


function Profil() {
    const uid = useContext(UidContext)
    return (
        <div className='profil-page'>
            {uid ? (
                <UpdateProfil/>
            ) : (


                <div className='log-container'>
                    <Log signin={false} signup={true} />
                </div>
            )}
        </div>
    )
}

export default Profil
