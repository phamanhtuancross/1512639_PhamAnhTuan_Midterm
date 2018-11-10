import * as Types from '../constants/ActionTypes';

const initialSatte = false;
const friendStarReducer = (state = initialSatte, action)=>{
    switch (action.type) {
        case Types.CHANGE_FRIEND_STAR_STATE:{
            state = !state;
            return {...state};
        }
        default:
            return state;
    }

    return state;
};

export default friendStarReducer;