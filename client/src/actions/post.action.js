import axios from 'axios';

export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POSTS";
export const UNLIKE_POST = "UNLIKE_POSTS";
export const EDIT_POST = "EDIT_POST";

//commentaire
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "ADD_COMMENT";

export const getPost = (num) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/post/`,
        })
            .then((res) => {
                const array = res.data.slice(0, num)
                dispatch({ type: GET_POSTS, payload: array })
            }
            )
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
export const editPost = (postId, message) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/post/` + postId,
            data: { message }
        })
            .then((res) => dispatch({ type: EDIT_POST, payload: { postId, message } }))
            .catch((err) => console.log(err))
    }
}
export const addComment = (postId, commenterId, commenterPseudo, text) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/comment-post/` + postId,
            data: { commenterId, commenterPseudo, text }
        })
            .then((res) => dispatch({ type: ADD_COMMENT, payload: { postId } }))
            .catch((err) => console.log(err))
    }
}
export const deleteComment = (postId, commentId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/` + postId,
            data: { commentId }
        })
            .then((res) => dispatch({type: DELETE_COMMENT, payload: {postId, commentId}}))
            .catch((err) => console.log(err))
    }


}