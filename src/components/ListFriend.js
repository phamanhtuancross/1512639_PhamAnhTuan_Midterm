import React,{Component} from 'react';
import FriendItem from "./FriendItem";
import {firebaseConnect,getFirebase,getVal} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';

class ListFriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInfo : '',
        }
    }

    onChangeSearchInfo = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;

        this.setState({
            [name]: value,
        });

    };
    render() {


        var {users,startState,isFriendStar} = this.props;
        var usersElem = [];

        var {searchInfo} = this.state;


        if (typeof users !== 'undefined' && users !== null){
            var authUid = this.props.firebase.auth().currentUser.uid;

            console.log(authUid);
            var userKeys = Object.keys(users);
            for(var index = 0; index < userKeys.length; index++){

                if(userKeys[index] !== authUid) {
                    var user = users[userKeys[index]];
                    user.key = userKeys[index];
                    if(startState!= null &&  typeof startState !== "undefined" && typeof startState[userKeys[index]] !== "undefined") {
                        user.isFriendStar = startState[userKeys[index]].isFriendStar;
                    }

                    if(searchInfo === '') {

                        usersElem.push(
                            user,
                        );
                    }
                    else{
                        if(! user.displayName.toLowerCase().indexOf(searchInfo.toLowerCase())){
                            usersElem.push(
                                user,
                            );
                        }
                    }
                }
            }

            usersElem.sort((a,b) =>{
                if(a.isFriendStar && !b.isFriendStar) return -1;
                return 1;
            });

            usersElem = usersElem.map((elm,index) =>{
                return (
                    <FriendItem
                key={elm.key}
                userData={elm}
                />
                );
            });
        }



        return (
            <div className="people-list" id="people-list">
                <div className="search">
                    <input type="text" placeholder="search" name="searchInfo" onChange={this.onChangeSearchInfo}/>
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
      isFriendStar: state.isFriendStar,
      users: state.firebase.data.users,
      startState: getVal(state.firebase.data,'startState/' + getFirebase().auth().currentUser.uid),
  };
};
export default compose(firebaseConnect((props) =>[
    'users',
    'startState/' + getFirebase().auth().currentUser.uid,
]),connect(mapStateToProps,null))(ListFriend);

