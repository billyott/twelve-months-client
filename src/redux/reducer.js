import { combineReducers } from 'redux';

const  defaultState = {
    user: {},   
}

function userReducer(currentState=defaultState.user, action) {
    switch (action.type) {
        case "USER_LOGIN":
            return action.payload;
        case "CREATE_USER":
            return action.payload;
        case "UPDATE_USER":
            return action.payload;
        case "DELETED_USER":
            return action.payload;
        case "LOGOUT":
            return action.payload;
        default:
            return currentState;
    }
}

const rootReducer = combineReducers({
    user: userReducer
})


export default rootReducer;