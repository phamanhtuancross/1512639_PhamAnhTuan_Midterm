import React,{Component} from 'react';
import  {connect} from 'react-redux'
import FriendChatingNav from "./FriendChatingNav";
import MessageItem from "./MessageItem";
import {compose} from 'redux';
import ListMessage from "./ListMessage";
import {generateID} from '../constants/RandomID';

import {getFirebase} from "react-redux-firebase";

class TypingText extends Component{

    constructor(props) {
        super(props);
        this.state = {
            content: '',
        }
    }


    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;

        this.setState({
            [name]: value,
        });
    };


    onSendingMessage= (databaseURL,friendDatabaseURL) =>{

        // getFirebase().database().ref(databaseURL).set({
        //         message : 'abc',
        //     });


        var {content} = this.state;
        getFirebase().database().ref('/persistenceValue/total')
            .once('value').then(function(snapshot) {
               console.log('snapshot'); console.log(snapshot.val());
               var total = snapshot.val();
            getFirebase().database().ref('/persistenceValue').update({
                total: total + 1,
            });

            getFirebase().database().ref(databaseURL+'/' + generateID() + '/message').set({
                index: total + 1,
                content:content,
                time: getCurrentTime(),
                type: 'auth',
            });

            getFirebase().database().ref(friendDatabaseURL+'/' + generateID() + '/message').set({
                index: total + 1,
                content:content,
                time: getCurrentTime(),
                type: 'friend',
            });

        });









        // totalMessage = totalMessage + 1;
        // var updates = {};
        // updates[databaseURL + '/total'] = totalMessage;
        //
        // getFirebase().database().ref().update(updates);
    };


    render() {
        var {selectedFriendChatting} = this.props;
        var listMessagesFirebaseURL = '';
        var listMessagesFirebaseURLForFriend= '';
        var totalMessage = 0;

        if(selectedFriendChatting.key) {
            listMessagesFirebaseURL          = 'users/' + getFirebase().auth().currentUser.uid + '/ListMessages/' + selectedFriendChatting.key;
            listMessagesFirebaseURLForFriend = 'users/' + selectedFriendChatting.key + '/ListMessages/' + getFirebase().auth().currentUser.uid ;

            console.log('url testing');
            console.log(listMessagesFirebaseURL);

        }

        return (
            <div className="chat-message clearfix">
                <textarea name="content" id="message-to-send" placeholder="Type your message" rows={3} defaultValue={""} onChange={this.onChange} />
                <i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
                <i className="fa fa-file-image-o" />
                <button onClick={() =>this.onSendingMessage(listMessagesFirebaseURL,listMessagesFirebaseURLForFriend)}>Send</button>
            </div>
        );
    }
}

var mapDispatchToProps =(dispatch)=>{
    return{
        onEnteredTextBox : () =>{
            dispatch();
        }
    }
};

const getCurrentTime = ()=>{
    return (new Date()).toLocaleString();
};
const mapStateToProps = (state)=>{
    return{
        selectedFriendChatting: state.selectedFriendChatting,

    }
};
export default connect(mapStateToProps,mapDispatchToProps)(TypingText);

