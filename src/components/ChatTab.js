import React,{Component} from 'react';
import  {connect} from 'react-redux'
import FriendChatingNav from "./FriendChatingNav";
import MessageItem from "./MessageItem";
import {compose} from 'redux';
import ListMessage from "./ListMessage";
import TypingText from "./TypingText";

class ChatTab extends Component{
    render() {

        return (
            <div className="chat">
                <FriendChatingNav/>
                <ListMessage/>
                <TypingText

                />
            </div>
        );
    }
}


var mapSateToProps = (state) =>{
    return{
        selectedFriendChatting: state.selectedFriendChatting,
    };
};
var mapDispatchToProps =(dispatch)=>{
    return{

    }
};
export default connect(mapSateToProps,mapDispatchToProps)(ChatTab);

