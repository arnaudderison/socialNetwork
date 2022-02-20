import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, getPost } from '../../actions/post.action'
import FollowHandler from '../../components/profil/followHandler'
import { isEmpty } from '../utils'

function Comment({ post }) {
    const [text, setText] = useState("")
    const userData = useSelector((state) => state.userReducer)
    const usersData = useSelector((state) => state.usersReducer)
    const dispatch = useDispatch();

    function handleComment(e){
        e.preventDefault();
        dispatch(addComment(post._id, userData._id, userData.pseudo, text))
        .then(() => dispatch(getPost()))
        .then(() => setText(''))

    }
    return (
        <div className='comment-conatiner'>
            {post.comments.map((comment) => {
                return (
                    <div className={`commentaire ${comment.commenterId === userData._id ? 'client' : 'all'}`} key={comment._id}>
                        <div className='leftComment'>
                            
                            <img
                                src={
                                    usersData[0] &&
                                    usersData.map((user) => {
                                        if (user._id === comment.commenterId ) return user.picture;
                                        else return null;
                                    }).join('')
                                }
                                alt=""
                            />
                        </div>
                        <div className='rightComment'>
                            <div className='commentHeader'>
                                <div className='titre'>
                                    <p>{comment.commenterPseudo}</p>

                                    <span>
                                        {
                                            !isEmpty(usersData[0]) && usersData.map((user) => {
                                                if (user._id === comment.commenterId) {
                                                    if (user.isCertified) {
                                                        return (<img src='./images/verified.svg' alt='' width='13' key={comment._id} />)
                                                    }
                                                }
                                            })
                                        }
                                    </span>
                                </div>
                                <span className='follow'>
                                    {
                                        comment.commenterId !== userData._id &&
                                        <FollowHandler idToFollow={comment.commenterId} />
                                    }
                                </span>
                            </div>
                            <div className='commentText'>
                                <p>{comment.text}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
            { userData._id && (
                <form onSubmit={handleComment} className='form-comment'>
                    <input type='text' name='text' onChange={(e)=> setText(e.target.value)} value={text} placeholder="Votre commentaire..."/>
                    <input type='submit' value='Envoyer' className='btn-add'/>
                </form>
            )}
        </div>
    )
}

export default Comment
