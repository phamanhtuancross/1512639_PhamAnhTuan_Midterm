import * as Types from '../constants/ActionTypes'
var initialStae = false;
var myReducer = (state=initialStae, action)=>{
    switch (action.type) {
        case Types.LOGIN_CHAT_APP:
            state = true;
            return state;

        case Types.LOG_OUT_CHAT_APP:
            state = false;
            return state;
        default:
            return state;
    }
};

export default myReducer;