import * as Types from './../constants/ActionTypes';

export const selectedFrientChating = (selectedFriend)=>{
  return{
      type: Types.SELECTED_FRIEND_CHATING,
      selectedFriendChatting: selectedFriend,
  };
};

export const enteredTextAred = () =>{
  return{
      type: Types.SENDING_MESSAGE,
  }
};