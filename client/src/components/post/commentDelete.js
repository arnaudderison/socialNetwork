import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteComment } from '../../actions/post.action'
import { UidContext } from '../AppContext'




function CommenteGestion({ post, comment }) {
    const [isConnect, setIsConnect] = useState(false)
    const uid = useContext(UidContext)

    const dispatch = useDispatch();

    const  deleteCommentPost = (commentID) =>{
        dispatch(deleteComment(post._id, commentID))
    }

    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.commenterId) {
                setIsConnect(true)
            }
        }

        checkAuthor();

    }, [uid, comment.commenterId])
    return (
        <div className='Comment-Delete'>
            {
                isConnect &&
                (
                    <span className='cross' onClick={() => deleteCommentPost(comment._id)}>
                        &#10005;
                    </span>
                )
            }
        </div>

    )
}

export default CommenteGestion
