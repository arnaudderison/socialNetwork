import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateBio } from '../../actions/user.actions';
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

    function handleUpdate(){
        dispatch(updateBio(userData._id, bio));
        setUpdateForm(false)
    }
    function followingHandle(){
        setFollowingPopup(!followingPopup);
    }
    function followersHandle(){
        setFollowersPopup(!followersPopup);
    }
    return (
        <div className='container-profil'>
            <div className='card-box'>
                <div className='title-card'>
                    <h1>{userData.pseudo}</h1>
                </div>
                <div className='update-container'>
                    <img src={userData.picture} alt="" />
                </div>
                <UploadPdp />
            </div>
            <div className='card-box'>
                <div className='bio-update'>
                    <h3>Bio</h3>
                    {updateForm === false && (
                        <>
                            <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                            <button onClick={() => setUpdateForm(!updateForm)}>Modifier bio</button>
                        </>
                    )}

                    {updateForm && (
                        <>
                            <textarea type="text" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                            <button onClick={handleUpdate}>Valider la modification</button>
                        </>
                    )}
                </div>

                <h5 onClick={followingHandle}>Abonnement : {userData.following ? userData.following.length : '0'}</h5>
                
                <h5 onClick={followersHandle}>Abonnés : {userData.followers ? userData.followers.length : '0'}</h5>
            </div>
            {followingPopup && (
                <div className='popup-profil-container'>
                    <div className='modal'>
                        <h3>Abonnements</h3>
                        <span className='cross' onClick={followingHandle}>&#10005;</span>
                    </div>
                    <ul>
                        {usersData.map((user) =>{
                            for(let i =0;i<userData.following.length; i++){
                                if(user._id === userData.following[i]){
                                    return(
                                        <li key={user._id}>
                                            <img src={user.picture} alt="user.pic"/>
                                            <h4>{user.pseudo}</h4>
                                            <div className='follow-handler'><FollowHandler idToFollow={user._id}/></div>
                                        </li>
                                    )
                                }
                            }
                        })}
                    </ul>
                </div>
            )}
            {followersPopup && (
                <div className='popup-profil-container'>
                    <div className='modal'>
                        <h3>Abonnés</h3>
                        <span className='cross' onClick={followersHandle}>&#10005;</span>
                    </div>
                    <ul>
                        {usersData.map((user) =>{
                            for(let i =0;i<userData.followers.length; i++){
                                if(user._id === userData.followers[i]){
                                    return(
                                        <li key={user._id}>
                                            <img src={user.picture} alt="user.pic"/>
                                            <h4>{user.pseudo}</h4>
                                            <div className='follow-handler'><FollowHandler idToFollow={user._id}/></div>
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
