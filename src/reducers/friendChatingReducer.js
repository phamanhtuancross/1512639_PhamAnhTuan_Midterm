import * as Types from '../constants/ActionTypes';


const initialState = {};
const friendChatingReducer = (state = initialState, action)=>{
    switch (action.type) {
        case Types.SELECTED_FRIEND_CHATING:
            state = action.selectedFriendChatting;
            console.log(state);
            return{...state};
        default:
            return state;
    }

    return state;
};

export default friendChatingReducer;