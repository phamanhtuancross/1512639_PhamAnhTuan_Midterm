import React, {Component} from 'react';

import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase';
import {connect} from 'react-redux';
import {compose} from 'redux';
import SignOut from "./components/SignOut";
import Signin from "./components/Signin";
import  * as action from './actions/action';
import HomePage from "./components/HomePage";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSigned: true,
        };
    }


    render() {

        var {auth} = this.props;
        console.log(auth);
        var buttonElm = auth.isEmpty? <Signin/> : <SignOut/>;
        var homePageElm= auth.isEmpty? '': <HomePage/>;
        console.log(buttonElm);
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        {homePageElm}
                    </div>
                </div>
                {buttonElm}
            </div>
        );
    }
}


const mapStateToProps = (state) =>{
    return{
        auth: state.firebase.auth,
    };
};


export default connect(mapStateToProps,null)(App);
