import React,{Component} from 'react';
import {connect} from 'react-redux';
import {signOut} from  './../actions/authAction';


class SignOut  extends Component{
    render(){

        return(
            <div>
                <button
                    type="button"
                    onClick={() => {
                        this.props.signOut();
                    }}>
                    logout
                </button>
            </div>
        );
    }
}



var mapDispatchToProps = (dispatch) =>{
    return{
        signOut: () =>dispatch(signOut()),
    }
};
export default connect(null,mapDispatchToProps)(SignOut);