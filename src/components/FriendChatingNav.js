import React,{Component} from 'react';
import  {connect} from 'react-redux';
import  './../App.css';
import {getFirebase} from "react-redux-firebase";

class FriendChatingNav extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isStartFriend :  false,
        }
    }

    onClickStartButton = ()=>{
        this.setState({
            isStartFriend: !this.state.isStartFriend,
        });
    };

    render() {

        const {selectedFriendChatting} = this.props;
        const {isStartFriend} = this.state;

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
                    <i className={isStartFriend?"fa fa-star yellow-star": "fa fa-star"}  onClick={this.onClickStartButton}/>
                </div>
        );
    }
}


const mapStateToProps = (state)=>{
    return{
        selectedFriendChatting: state.selectedFriendChatting,
    }
};

const mapDispatchToProps = (dispatch) =>{
    return{
        onChangeStarState : () =>{
            dispatch();
        }
    }
};
export default connect(mapStateToProps,null)(FriendChatingNav);

