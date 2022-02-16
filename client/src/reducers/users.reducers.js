import { GET_USERS } from "../actions/users.actions";

const intinialState = {};

export default function usersReducer(state = intinialState, action){
    switch(action.type){
        case GET_USERS:
            return action.payload;
        default:
            return state;

    }
}