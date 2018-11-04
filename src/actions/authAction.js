
import * as Types from './../constants/ActionTypes';
export const signIn = () =>{
    return(dispatch, getSate,{getFirebase})=>{
        const firebase = getFirebase();
        firebase.auth().signInWithPopup(firebase.auth().GoogleAuthProvider())
            .then(()=>{
                dispatch({type: Types.LOGIN_CHAT_APP})
            })
            .catch((err)=>{
                dispatch({type: Types.LOGIN_ERROR});
            });


    };
};

export const signOut = () =>{
    return{
        type: Types.LOG_OUT_CHAT_APP,
    }
};