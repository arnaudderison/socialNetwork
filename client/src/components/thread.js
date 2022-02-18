import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../actions/post.action';
import { isEmpty } from '../components/utils'
import Card from './post/card';

function Thread() {
    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(7);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer)

    function loadMore(){
        if(window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight){
            setLoadPost(true)
            
        }
    }

    useEffect(() => {
        if (loadPost) {
            dispatch(getPost(count))
            setLoadPost(false)
            setCount(count + 7)
        }
        

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore)
    }, [dispatch, setLoadPost, loadPost, count])
    return (
        <div className='tread-container'>
            <ul>
                {!isEmpty(posts[0]) &&
                    posts.map((post)=>{
                        return (<Card post={post} key={post._id}/>)
                    })
                }
            </ul>
        </div>
    )
}

export default Thread
