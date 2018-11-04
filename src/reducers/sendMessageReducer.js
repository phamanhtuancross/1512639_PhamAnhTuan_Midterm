import * as Types from './../constants/ActionTypes';

var initialMessage = false;
const sendingMessage = (state = initialMessage, action) =>{
    switch (action.type) {
        case Types.SENDING_MESSAGE:
            state = !state;
            return {...state};

            default:
            return {...state};
    }

    return state;
};

export default sendingMessage;
