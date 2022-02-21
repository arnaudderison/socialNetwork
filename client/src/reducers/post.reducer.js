
import { DELETE_COMMENT, EDIT_POST, GET_POSTS, LIKE_POST, UNLIKE_POST } from "../actions/post.action"

const initialState = {}

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return action.payload
        case LIKE_POST:
            return state.map((post) => {
                if (post._id === action.payload.idPost) {
                    return {
                        ...post,
                        likers: [action.payload.idLiker, ...post.likers]
                    }
                }
                return post
            })

        case UNLIKE_POST:
            return state.map((post) => {
                if (post._id === action.payload.idPost) {
                    return {
                        ...post,
                        likers: post.likers.filter((like) => like !== action.payload.idUnLiker)
                    }
                }
                return post
            })
        case EDIT_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        message: action.payload.message
                    }
                }
                return ;
            })
        case DELETE_COMMENT:
            return state.map((post) =>{
                if(post._id === action.payload.postId){
                    return {
                        ...post,
                        comments: post.comments.filter((comment) => comment._id !== action.payload.commentId)
                    }
                }
            })

        default:
            return state
    }
}