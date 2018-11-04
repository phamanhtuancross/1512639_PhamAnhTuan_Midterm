import React,{Component} from 'react';
import FriendItem from "./FriendItem";
import {firebaseConnect,getFirebase} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';

class ListFriend extends Component {

    render() {


        var {users} = this.props;
        var usersElem = [];


        if (typeof users !== 'undefined' && users !== null){
            var authUid = this.props.firebase.auth().currentUser.uid;

            console.log(authUid);
            var userKeys = Object.keys(users);
            for(var index = 0; index < userKeys.length; index++){
                if(userKeys[index] !== authUid) {
                    var user = users[userKeys[index]];
                    user.key = userKeys[index];
                    usersElem.push(
                        <FriendItem
                            key={userKeys[index]}
                            userData={user}
                        />
                    );
                }
            }
        }

        return (
            <div className="people-list" id="people-list">
                <div className="search">
                    <input type="text" placeholder="search" />
                    <i className="fas fa-search" />
                </div>
                <ul className="list">
                    {usersElem}

                </ul>
            </div>

        );
    }
}

var mapStateToProps = (state) =>{
  return{
      users: state.firebase.data.users,
  };
};
export default compose(firebaseConnect([
    'users',
]),connect(mapStateToProps,null))(ListFriend);

