import React,{Component} from 'react';
import {selectedFrientChating} from './../actions/friendChatingAction'
import  {connect} from 'react-redux'
import {firebaseConnect} from  'react-redux-firebase'
import {compose} from 'redux'

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
                        <i className={userData.connection === true? 'fa fa-circle online': 'fa fa-circle offline' }  /> {userData.connection === true? 'online': calcLastTimeOnline(userData.lastOnline)}
                    </div>
                </div>
            </li>
        );
    }
}

var calcLastTimeOnline = (lastTimeOnline) => {
    var currentTicks = new Date().getTime();
    var timeDiff = Math.abs(currentTicks - lastTimeOnline);
    var seconds_from_T1_to_T2 = timeDiff / 1000;
    var seconds_Between_Dates = Math.abs(seconds_from_T1_to_T2);

    return convertSecondToTime(seconds_Between_Dates);



   // alert(currentTicks);
};

var convertSecondToTime = (inputSeconds) =>{


    if(isNaN(inputSeconds)){
        return 'offline';
    }
    var days = 0;
    var hour = 0;
    var minutes = 0;
    var seconds = 0;

    if(inputSeconds > 24* 60 * 60){
        days = Math.ceil(inputSeconds / (24 * 60 * 60));
        inputSeconds = inputSeconds % (24 * 60 * 60);
    }

    if(inputSeconds > 60* 60){
        hour = Math.ceil(inputSeconds/(60 * 60));
        inputSeconds = inputSeconds % (60 * 60);
    }

    if(inputSeconds > 60){
        minutes = Math.ceil(inputSeconds/60);
        seconds = Math.ceil(inputSeconds %60) ;
    }

    return 'online ' +(days > 0?  days + ' ngày ': '')  + (hour > 0?  hour + ' giờ ': '') + (minutes > 0? minutes + ' phút ' : '') + ( seconds+ ' giây trước');
};
var mapDispatchToProps =(dispatch)=>{
    return{
        onSelectedFriendChating: (selectedFriend)=>{dispatch(selectedFrientChating(selectedFriend));}
    }
};

export default compose(firebaseConnect(props =>[{
        path: 'startState'
    }]
), connect(null,mapDispatchToProps))(FriendItem);

