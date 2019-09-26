import {SET_USER_FETCHING, RECEIVE_USER, UserActionTypes}
 from '../actions/user'
export function userReducer(
    state = {},
    action: UserActionTypes){
        switch(action.type) {
            case SET_USER_FETCHING:
                return  {
                    ...state,
                    isFetching: action.payload
                }
            case RECEIVE_USER:
                return {
                    ...state,
                    isFetching: false,
                    user: action.payload
                }
            default:
                return state
        }
    }