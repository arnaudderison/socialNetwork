
import { GET_POSTS, LIKE_POST, UNLIKE_POST } from "../actions/post.action"

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
                        likers : post.likers.filter((like) => like !== action.payload.idUnLiker)
                    }
                }
                return post
            })
        default:
            return state
    }
}