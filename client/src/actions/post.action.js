import axios from 'axios';

export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POSTS";
export const UNLIKE_POST = "UNLIKE_POSTS";

export const getPost = () => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/post/`,
        })
            .then((res) => dispatch({ type: GET_POSTS, payload: res.data }))
            .catch((err) => console.log(err))
    }
}
export const likePost = (idPost, idLiker) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + idPost,
            data: { id: idLiker }
        })
            .then(dispatch({ type: LIKE_POST, payload: { idPost, idLiker } }))
            .catch((err) => console.log(err))
    }
}
export const unLikePost = (idPost, idUnLiker) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + idPost,
            data: { id: idUnLiker }
        })
            .then(dispatch({ type: UNLIKE_POST, payload: { idPost, idUnLiker } }))
            .catch((err) => console.log(err))
    }
}