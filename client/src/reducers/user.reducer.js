import { GET_USER } from "../actions/user.actions";

const intinialState = {};

export default function userReducer( state = intinialState, action){
    switch(action.type){
        case GET_USER:
            return action.payload
        default:
            return state;
    }
}