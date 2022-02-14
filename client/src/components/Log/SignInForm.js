import React, { useState } from 'react';
import axios from 'axios';

function Connexion() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin (e){
        e.preventDefault();
        const errors = document.querySelector('.errors');
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: {
                email:email,
                password:password
            }
        }).then((res)=>{
            if(res.data.errors){
                if(res.data.errors.email){
                    errors.innerText = res.data.errors.email
                }else if(res.data.errors.password){
                    errors.innerText = res.data.errors.password
                }
            }else{
                window.location.href = '/'
            }
        }).catch((err)=>{console.log('erreur:' + err)})
    }
    return (
        <div className='card-register'>
            <div className='container-register card-box'>
                <div className='title-card'>
                    <h1>Login</h1>
                </div>
                <div className='header-card'>
                    <h3>Connecte toi a la version beta de mon reseau social !</h3>
                    <p>Tous mes amis sont invité a contribuer à la création de notre album ou simplement le regarder !</p>
                </div>

                <div className='body-form'>
                    <form action="" onSubmit={handleLogin}>
                        <input type="email" required name="email" id='email' className='mail' placeholder='Adresse mail' onChange={(e)=> {setEmail(e.target.value)}} value={email}/>

                        <input type="password" required name="password" id='password' placeholder='Mot de passe' onChange={(e)=> {setPassword(e.target.value)}} value={password}/>

                        <input type="submit" value="Se connceter" className='btn' />
                    </form>
                    <span className='errors'></span>
                </div>
            </div>
        </div>
    )
}

export default Connexion
