import React, { useState } from 'react';
import SignInForm from './SignInForm';
import axios from 'axios';

function Register() {
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifiePassword, setVerifiePassword] = useState("");
    const errors = document.querySelector('.errors')

    function handleRegister(e) {
        e.preventDefault();

        if (password !== verifiePassword) errors.innerHTML = 'Vos mot de passe de ne correspondent pas.'
        else {
            axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                data: {
                    pseudo,
                    email,
                    password
                }
            })
                .then((res) => {
                    if (res.data.errors) {
                        if (res.data.errors.password) errors.innerHTML = res.data.errors.password;
                        if (res.data.errors.email) errors.innerHTML = res.data.errors.email;
                        if (res.data.errors.pseudo) errors.innerHTML = res.data.errors.pseudo;
                    } else {
                        setFormSubmit(true)
                    }
                })
                .catch((err) => console.log(err))
        }
    }
    return (
        <>
            {formSubmit ? (
                <>
                    <SignInForm />
                    <span className='success'>Votre compte a bien été créé. Veuillez Vous connecter</span>
                </>
            ) : (

                <div className='card-register'>
                    <div className='container-register card-box'>
                        <div className='title-card'>
                            <h1>Register</h1>
                        </div>
                        <div className='header-card'>
                            <h3>Rejoins la version beta de mon reseau social !</h3>
                            <p>Tous mes amis sont invité a contribuer à la création de notre album ou simplement le regarder !</p>
                        </div>

                        <div className='body-form'>
                            <form action="" onSubmit={handleRegister}>
                                <input type="text" name="pseudo" id='pseudo' placeholder='Pseudo' onChange={(e) => setPseudo(e.target.value)} value={pseudo} />

                                <input type="email" name="email" id='email' className='mail' placeholder='Adresse mail' onChange={(e) => setEmail(e.target.value)} value={email} />

                                <input type="password" name="password" id='password' placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)} value={password} />

                                <input type="password" name="Rpassword" id='Rpassword' placeholder='Mot de passe' onChange={(e) => setVerifiePassword(e.target.value)} value={verifiePassword} />

                                <input type="submit" value="S'inscrire" className='btn' />

                                <span className='errors'></span>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Register
