import React, { useState } from 'react'
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

function Log(props) {
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignInModal(false);
            setSignUpModal(true)
        } else if (e.target.id === "login") {
            setSignUpModal(false);
            setSignInModal(true);
        }
    }

    return (
        <div className='connection-form center'>
            <div className='card-container'>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
                <ul>
                    <li onClick={handleModals} id="register" className={`link ${signUpModal ? "hidden" : null}`}><p>Tu n'es pas encore de compte ?</p> Inscrit-toi </li>
                    <li onClick={handleModals} id="login" className={`link ${signInModal ? "hidden" : null}`}><p>Tu as déjà un compte ?</p> connecte-toi !</li>
                </ul>

            </div>
        </div>
    )
}

export default Log
