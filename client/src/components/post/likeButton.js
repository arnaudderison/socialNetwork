import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { UidContext } from '../AppContext';
import { likePost, unLikePost } from '../../actions/post.action';
import Popup from 'reactjs-popup';

function Like({ post }) {
    const [isLiked, setIsLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    function handleLike(){
        dispatch(likePost(post._id, uid))
        setIsLiked(true)
    }
    function handleUnLike(){
       dispatch(unLikePost(post._id, uid))
        setIsLiked(false)
    }

    useEffect(()=>{
       if(post.likers.includes(uid)) setIsLiked(true)
       else setIsLiked(false)
    }, [uid,post.likers,isLiked])

    return (
        <div className='like-icon'>
            {
                uid === null &&
                <Popup trigger={<img src='./images/like.svg' alt=''/>} position={['bottom center', 'bottom right', 'bottom left']} closeOnDocumentClick> 
                    <div className='popup-like'>Connectez vous pour aimer un post !</div>
                </Popup>
            }
            {
                uid && isLiked === false &&(
                    <img src='./images/like.svg' alt='' onClick={handleLike}/>
                )
            }
            {
                uid && isLiked && (
                    
                    <img src='./images/liked.svg' alt='' onClick={handleUnLike}/>
                )
            }
            {
                <span>{post.likers.length}</span>
            }
        </div>
    )
}

export default Like
