import React,{Component} from 'react';
import  {connect} from 'react-redux'

class FriendChatingNav extends Component{
    render() {


        var {selectedFriendChatting} = this.props;

        return (
                <div className="chat-header clearfix">
                    <img
                        src={selectedFriendChatting.avatarUrl}
                        alt="avatar"
                        className="friend-avatar"
                    />
                    <div className="chat-about">
                        <div className="chat-with">Chat with  {selectedFriendChatting.displayName}</div>
                        <div className="chat-num-messages">already 1 902 messages</div>
                    </div>
                    <i className="fa fa-star" />
                </div>
        );
    }
}


const mapStateToProps = (state)=>{
    return{
        selectedFriendChatting: state.selectedFriendChatting,
    }
};
export default connect(mapStateToProps,null)(FriendChatingNav);

