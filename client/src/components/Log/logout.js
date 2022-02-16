import React from 'react'
import axios from 'axios'

function Logout() {

    function logout() {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true,
        })
            .then(() => window.location = '/')
            .catch((err) => console.log(err))
    }

    return (
        <li onClick={logout}>
            <img className='logout-img' src="./images/login.svg" alt='' width="20em" />
        </li>
    )
}

export default Logout
