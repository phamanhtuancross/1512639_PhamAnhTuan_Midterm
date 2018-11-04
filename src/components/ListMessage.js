import React, {Component} from 'react';
import MessageItem from "./MessageItem";
import {compose} from 'redux';
import {firebaseConnect,getFirebase} from 'react-redux-firebase';
import {connect} from 'react-redux';


var listMessagesFirebaseURL = '';


class ListMessage extends Component {


    render() {

        var {selectedFriendChatting,auth} = this.props;

        var listMessagesItems = [];
        if(selectedFriendChatting.key) {
            listMessagesFirebaseURL = 'users/' + getFirebase().auth().currentUser.uid +'/ListMessages/'+ selectedFriendChatting.key;
            console.log('url testing');
            console.log(listMessagesFirebaseURL);

            var firebase = getFirebase();
            var ref = firebase.database().ref(listMessagesFirebaseURL).limitToLast(100);
            ref.on('value', function(snapshot) {

                if(typeof snapshot !== undefined) {

                    var listMessages = [];
                    snapshot.forEach(function (childSnapshot) {
                        // var childKey = childSnapshot.key;
                        var childData = childSnapshot.val();


                        var message = childData.message;
                        if(typeof  message !== "undefined") {
                            console.log('message');
                            console.log(message);
                            if (message.type === 'auth') {
                                message.senderName = getFirebase().auth().currentUser.displayName;
                            }
                            else {
                                message.senderName = selectedFriendChatting.displayName;
                            }

                            listMessages.unshift(message);
                        }
                    });
                }
                    // ...);
                listMessages = listMessages.sort((firstObj,secondsObj)=>{
                    return firstObj.index - secondsObj.index;
                });
                listMessagesItems = listMessages.map((message,index) =>{
                    return <MessageItem
                        key={index}
                        message={message}
                    />
                });
            });
        }

        return (
            <div className="chat-history">
            <ul>


                {listMessagesItems}
                {/*<li>*/}
                    {/*<div className="message-data">*/}
                        {/*<span className="message-data-name"><i className="fa fa-circle online" /> Vincent</span>*/}
                        {/*<span className="message-data-time">10:31 AM, Today</span>*/}
                    {/*</div>*/}
                    {/*<i className="fa fa-circle online" />*/}
                    {/*<i className="fa fa-circle online" style={{color: '#AED2A6'}} />*/}
                    {/*<i className="fa fa-circle online" style={{color: '#DAE9DA'}} />*/}
                {/*</li>*/}
            </ul>
        </div>
        );
    }
}


var mapSateToProps = (state)=>{
    return{
        selectedFriendChatting: state.selectedFriendChatting,
        auth : state.firebase.auth,
        sendingMessage: state.sendingMessage,
    }
};

export default
    connect(mapSateToProps,null)(ListMessage);