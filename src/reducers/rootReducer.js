import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase';
import * as Config from './../constants/config'
import isSigned from './SignInReducer'
import authRudcer from './authReducer';
import selectedFriendChatting from './friendChatingReducer'
import sendingMessage from './sendMessageReducer';

// Initialize firebase instance

// Initialize other services on firebase instance
// firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add reactReduxFirebase enhancer when making store creator


firebase.initializeApp(Config.config);
export const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, Config.rrfConfig), // firebase instance as first argument
    // reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
export const rootReducer = combineReducers({
    firebase: firebaseReducer,
    authReducer: authRudcer,
    isSigned: isSigned,
    selectedFriendChatting: selectedFriendChatting,
    sendingMessage : sendingMessage,

    // firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
