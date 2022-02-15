import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UidContext } from './AppContext'

function Navbar() {
    const uid = useContext(UidContext);
    return (
        <div className='nav-container'>
            <div className='logo'>
                <Link to='/' replace>
                    Derison.A <sup><img src='./images/tm-image.svg' alt='TM' width="20em" /></sup>
                </Link>
            </div>

            {uid ? (
                <ul>
                    <li>
                        <Link to="/" replace>
                            Bienvenue 'prenom'
                        </Link>
                    </li>
                </ul>
            ): (
                <>rien</>
                )}
        </div>
    )
}

export default Navbar
