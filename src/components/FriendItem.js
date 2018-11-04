import React,{Component} from 'react';
import {selectedFrientChating} from './../actions/friendChatingAction'
import  {connect} from 'react-redux'

class FriendItem extends Component {


    onClickItem = (userData)=>{
        this.props.onSelectedFriendChating(userData);
    };
    render() {


        var{userData} = this.props;
        console.log(userData);
        return (
            <li className="clearfix" onClick={() =>this.onClickItem(userData)}>
                <img src={userData.avatarUrl} className="friend-avatar" alt="avatar" />
                <div className="about">
                    <div className="name">
                        {userData.displayName}
                    </div>
                    <div className="status">
                        <i className="fa fa-circle online" /> online
                    </div>
                </div>
            </li>
        );
    }
}

var mapDispatchToProps =(dispatch)=>{
    return{
        onSelectedFriendChating: (selectedFriend)=>{dispatch(selectedFrientChating(selectedFriend));}
    }
};
export default connect(null,mapDispatchToProps)(FriendItem);

