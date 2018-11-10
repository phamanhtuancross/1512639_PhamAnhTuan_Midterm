import React,{Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import './../App.css'
import  {firebaseConnect,getFirebase} from  'react-redux-firebase';
import GoogleButton from 'react-google-button';
class Signin  extends Component{


    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    const uid = user.uid;

                    var lastOnlineRef = this.props.firebase.database().ref('users/' + uid + '/lastOnline');
                    var myConnectionsRef = this.props.firebase.database().ref('users/' + uid + '/connection');
                    var connectedRef = this.props.firebase.database().ref('.info/connected');

                    connectedRef.on('value', function (snap) {
                        if (snap.val() === true) {
                            myConnectionsRef.set(true);
                            lastOnlineRef.onDisconnect().set(getFirebase().database.ServerValue.TIMESTAMP);
                            myConnectionsRef.onDisconnect().set(false);
                        }
                    });
                }
                //this.setState({isSignedIn: !!user})
            }
        );
    }

    render(){
        return(
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-centered mt-100">
                            <div className="panel panel-default custom">
                                <div className="panel-heading">
                                    <h3 className="panel-title">ĐĂNG NHẬP</h3>
                                </div>
                                <div className="panel-body">
                                    <form>

                                        <div className="form-group">
                                            <input type="text" className="form-control" name="" id=""
                                                   placeholder="Enter user..."/><br/>
                                            <input type="text" className="form-control" name="" id=""
                                                   placeholder="Enter passowrd..."/>
                                        </div>



                                        <button type="submit" className="btn btn-danger btn-login-size col-centered">Đăng </button>
                                    </form>

                                    <GoogleButton
                                        className="col-centered mt-50"
                                        onClick={() => {
                                            this.props.firebase.login({
                                                provider: "google",
                                                type: "popup",
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapSateToProps = (state)=>{
    return{
        auth: state.firebase.auth,
    };
};

export default compose(firebaseConnect(),
    connect(mapSateToProps,null))(Signin);