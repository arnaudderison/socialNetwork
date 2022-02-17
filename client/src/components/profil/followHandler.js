import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unFollowUser } from '../../actions/user.actions';
import { isEmpty } from '../utils';

function FollowHandler({ idToFollow }) {
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    function handleFollow() {
        dispatch(followUser(userData._id, idToFollow));
        setIsFollowed(true);
    }
    function handleUnFollow() {
        dispatch(unFollowUser(userData._id, idToFollow))
        setIsFollowed(false);
    }

    useEffect(() => {
        if (!isEmpty(userData.following)) {
            if (userData.following.includes(idToFollow)) {
                setIsFollowed(true);
            } else setIsFollowed(false);
        }
    }, [userData, idToFollow])
    return (
        <>
            {isFollowed && !isEmpty(userData) &&(
                <div onClick={handleUnFollow} className="btn-add">
                    <button>Abonné(e)</button>
                </div>
            )}

            {
                isFollowed === false && !isEmpty(userData) &&(
                    <div onClick={handleFollow} className="btn-add">
                        <button>S'abonner</button>
                    </div>
                )
            }

        </>
    )
}

export default FollowHandler
