import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../utils';
import FollowHandler from '../../components/profil/followHandler'
import LikeButton from './likeButton';
import { editPost } from '../../actions/post.action';

function Card({ post }) {
    const [isLoading, setIsLoading] = useState(true);

    const [messageInModification, setMessageInModification] = useState(false);
    const [newMessage, setnewMessage] = useState(null);

    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch();

    function handleMessageIsUser() {
        if(post.posterId === userData._id){
            setMessageInModification(true)
        }
    }
    function messageMofie(){
        if(isEmpty(newMessage)){
            dispatch(editPost(post._id, userData.message))
            setMessageInModification(false)
        }else{
            dispatch(editPost(post._id, newMessage))
            setMessageInModification(false)
        }
    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData])
    return (
        <li className='card-post' key={post._id}>
            {
                isLoading ? (
                    <i className='fas fa-spinner fa-spin'></i>
                ) : (
                    <>
                        <div className='card-post-left'>
                            <img src={
                                !isEmpty(usersData[0]) && usersData.map((user) => {
                                    if (user._id === post.posterId) {
                                        return user.picture
                                    }

                                }).join('')
                            } />
                        </div>
                        <div className='card-post-right'>
                            <div className='post-header'>
                                <div className='post-titre'>
                                    <div className='post-pseudo'>
                                        <h3>
                                            {
                                                !isEmpty(usersData[0]) && usersData.map((user) => {
                                                    if (user._id === post.posterId) {
                                                        return user.pseudo
                                                    }
                                                })
                                            }
                                        </h3>

                                        <span>
                                            {
                                                !isEmpty(usersData[0]) && usersData.map((user) => {
                                                    if (user._id === post.posterId) {
                                                        if (user.isCertified) {
                                                            return (<img src='./images/verified.svg' alt='' width='13' key={post._id} />)
                                                        }
                                                    }
                                                })
                                            }
                                        </span>
                                    </div>
                                    <span>
                                        {
                                            post.posterId !== userData._id &&
                                            <FollowHandler idToFollow={post.posterId} />
                                        }
                                    </span>

                                </div>
                                {
                                    !messageInModification && newMessage && (
                                        <p onClick={handleMessageIsUser}>{newMessage}</p>
                                    )
                                }
                                {
                                    !messageInModification && !newMessage &&(
                                        <p onClick={handleMessageIsUser}>{post.message}</p>
                                    )
                                }
                                {messageInModification && (
                                    <>
                                        <textarea
                                            defaultValue={post.message}
                                            onChange={(e) => setnewMessage(e.target.value)}
                                        />
                                        <input type="submit" value="Modifier" onClick={messageMofie}/>
                                    </>
                                )}

                            </div>

                            <div className='img'>
                                {post.picture && <img src={post.picture} alt="" className='post-image' />}
                                {post.video && (
                                    <iframe width="500" height="300" src={post.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>

                                    </iframe>
                                )}
                            </div>

                            <div className='post-card-footer'>
                                <div className='comment-icon'>
                                    <img src='./images/commentaire.svg' /><span>{post.comments.length}</span>
                                </div>

                                <LikeButton post={post} />
                                <div className='share-icon'>
                                    <img src='./images/share.svg' />
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </li>
    )
}

export default Card
