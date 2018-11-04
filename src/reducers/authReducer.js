import * as Types from '../constants/ActionTypes';
import {getFirebase} from 'react-redux-firebase'
import {logout} from "../actions/action";
const initialSatte = {};
const authReducer = (state = initialSatte, action)=>{
    switch (action.type) {
        case Types.LOGIN_CHAT_APP:
            console.log('login success');
            return {...state};
        case Types.LOGIN_ERROR:
            return {...state,
            authError: 'Login failed'};
        case Types.LOG_OUT_CHAT_APP:
                const firebase = getFirebase();
                firebase.auth().signOut();
            return{...state};
        default:
            return state;
    }

    return state;
};

export default authReducer;