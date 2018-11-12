import React,{Component} from 'react';
import  {connect} from 'react-redux';
import  './../App.css';
import {getFirebase} from "react-redux-firebase";
import {onChangeFriendtarState} from './../actions/friendChatingAction'

class FriendChatingNav extends Component{


    constructor(props) {
        super(props);
        this.state = {
            isFriendStar: false,
        }
    }


    onClickStartButton = ()=>{
        const {selectedFriendChatting} = this.props;
        console.log('selected friend :'); console.log(selectedFriendChatting);

        getFirebase().ref("startState").child(getFirebase().auth().currentUser.uid).child(selectedFriendChatting.key).update({
            isFriendStar: !selectedFriendChatting.isFriendStar,
        });

        this.props.onChangeStarState();
    };

    render() {

        const {selectedFriendChatting} = this.props;

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
                    <i className={selectedFriendChatting.isFriendStar?"fa fa-star yellow-star": "fa fa-star"}  onClick={this.onClickStartButton}/>
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
            dispatch(onChangeFriendtarState());
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(FriendChatingNav);

