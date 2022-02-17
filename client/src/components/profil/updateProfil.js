import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateBio } from '../../actions/user.actions';
import { isEmpty } from '../utils';
import FollowHandler from './followHandler';
import UploadPdp from './uploadimg';

function UpdateProfil() {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);
    const userData = useSelector((state) => state.userReducer)
    const usersData = useSelector((state) => state.usersReducer)
    const dispatch = useDispatch();

    function handleUpdate() {
        setUpdateForm(!updateForm)
        dispatch(updateBio(userData._id, bio));
    }
    function followingHandle() {
        if (followersPopup) setFollowersPopup(!followersPopup)
        setFollowingPopup(!followingPopup);
    }
    function followersHandle() {
        if (followingPopup) setFollowingPopup(!followingPopup);
        setFollowersPopup(!followersPopup);
    }
    return (
        <div className='container-profil card-container'>

            <div className='box-profil'>
                <div className='update-container'>
                    <img src={userData.picture} alt="" className='pdp' />
                    <UploadPdp />
                    
                </div>

                <div className='title-profil'>
                    <h1>{userData.pseudo}</h1>
                </div>

            </div>

            <div className='bio-box'>
                <div className='bio-update'>
                    <div className='bio'>
                        {updateForm === false && (
                            <>
                                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio ? userData.bio : `Salut, je suis ${userData.pseudo}`}</p>
                            </>
                        )}

                        {updateForm && (
                            <div className='bio-mod'>
                                <textarea type="text" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)} id="bio"></textarea>
                                <button type='submit' onClick={handleUpdate} className='bio-btn'>Valider la modification</button>
                            </div>
                        )}
                    </div>

                    <img src='./images/pdp_modif.svg' alt='Modifie' width="13" onClick={() => setUpdateForm(!updateForm)} />
                </div>

                <div className='follow-box'>
                    <div className='follow'>
                        <h5>{userData.followers ? userData.followers.length : '0'}</h5>
                        <p onClick={followersHandle}>Follower</p>
                    </div>
                    <div className='following'>
                        <h5>{userData.following ? userData.following.length : '0'}</h5>
                        <p onClick={followingHandle}>Following</p>
                    </div>
                </div>
            </div>
            {followingPopup && !isEmpty(userData.following) && (
                <div className='popup-profil-container'>
                    <div className='modal'>
                        <h3>Abonnements</h3>
                        <span className='cross' onClick={followingHandle}>&#10005;</span>
                    </div>
                    <ul>
                        {usersData.map((user) => {
                            for (let i = 0; i < userData.following.length; i++) {
                                if (user._id === userData.following[i]) {
                                    return (
                                        <li key={user._id}>
                                            <div className='userInfo'>
                                                <img src={user.picture} alt="user.pic" />
                                                <h4>{user.pseudo}</h4>
                                            </div>
                                            <div className='follow-handler'><FollowHandler idToFollow={user._id} /></div>
                                        </li>
                                    )
                                }
                            }
                        })}
                    </ul>
                </div>
            )}
            {followersPopup && !isEmpty(userData.followers) && (
                <div className='popup-profil-container'>
                    <div className='modal'>
                        <h3>Abonnés</h3>
                        <span className='cross' onClick={followersHandle}>&#10005;</span>
                    </div>
                    <ul>
                        {usersData.map((user) => {
                            for (let i = 0; i < userData.followers.length; i++) {
                                if (user._id === userData.followers[i]) {
                                    return (
                                        <li key={user._id}>
                                            <div className='userInfo'>
                                                <img src={user.picture} alt="user.pic" />
                                                <h4>{user.pseudo}</h4>
                                            </div>
                                            <div className='follow-handler'><FollowHandler idToFollow={user._id} /></div>
                                        </li>
                                    )
                                }
                            }
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default UpdateProfil
