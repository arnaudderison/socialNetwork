import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UidContext } from './AppContext'
import Logout from './Log/logout';

function Navbar() {
    const uid = useContext(UidContext);
    return (
        <div className='nav-container'>
            <div className='logo'>
                <nobr><Link to='/' replace className='logo-img'>
                    Derison.A <sup><img src='./images/tm-image.svg' alt='TM' width="20em" /></sup>
                </Link></nobr>
            </div>

            {uid ? (
                <ul>
                    <li>
                        <Link to="/profil" replace>
                            <nobr><p className='text-welkom'>[Nom_d'utilisateur]</p></nobr>
                        </Link>
                    </li>
                    <Logout/>
                </ul>
            ) : (
                <ul>
                    <li>
                        <Link to="/profil" replace>
                            <img className='login-img' src="./images/login.svg" alt='' width="25em" />
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default Navbar
