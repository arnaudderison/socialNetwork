import React from 'react'

function register() {
    return (
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
                    <form action="" >
                        <input  type="text" name= "pseudo" id='pseudo' placeholder='Pseudo'/>

                        <input  type="email" name= "email" id='email' className='mail' placeholder='Adresse mail'/>

                        <input  type="password" name= "password" id='password' placeholder='Mot de passe'/>

                        <input  type="password" name= "Rpassword" id='Rpassword' placeholder='Mot de passe'/>

                        <input type="submit" value="S'inscrire" className='btn'/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default register
