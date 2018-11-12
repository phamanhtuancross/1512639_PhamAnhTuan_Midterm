import React,{Component} from 'react';
import  {connect} from 'react-redux'
import {generateID} from '../constants/RandomID';

import {getFirebase} from "react-redux-firebase";

class TypingText extends Component{

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            selectedImage: null,
            imageURl: null,
            messageToSend: ''
        }
    }


    isValidURL(str) {
        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if(!regex .test(str)) {
            return false;
        } else {
            return true;
        }
    }
    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;

        if(this.isValidURL(value)){
            this.setState({
                imageURl: value,
            });
        }

            this.setState({
                [name]: value,
            });
    };


    onSendingMessage= (databaseURL,friendDatabaseURL) =>{

        // getFirebase().database().ref(databaseURL).set({
        //         message : 'abc',
        //     });

        var {content,imageURl} = this.state;
        var self = this;

        if(this.state.selectedImage != null){
            const {selectedImage} = this.state;

            var storageRef = getFirebase().storage().ref('message').child('images').child(selectedImage.name);

            storageRef.put(selectedImage).then(function(snapshot){
                storageRef.getDownloadURL().then(url =>{
                    getFirebase().database().ref('/persistenceValue/total')
                        .once('value').then(function(snapshot) {
                        console.log('snapshot'); console.log(snapshot.val());
                        var total = snapshot.val();
                        getFirebase().database().ref('/persistenceValue').update({
                            total: total + 1,
                        });

                        getFirebase().database().ref(databaseURL+'/' + generateID() + '/message').set({
                            index: total + 1,
                            content:content,
                            time: getCurrentTime(),
                            type: 'auth',
                            imageURl: url,

                        });

                        getFirebase().database().ref(friendDatabaseURL+'/' + generateID() + '/message').set({
                            index: total + 1,
                            content:content,
                            time: getCurrentTime(),
                            type: 'friend',
                            imageURl: url,
                        });


                    });

                    self.setState({
                        content: '',
                        selectedImage: null,
                    });
                });


            })
        }
        else{
            getFirebase().database().ref('/persistenceValue/total')
                .once('value').then(function(snapshot) {
                console.log('snapshot'); console.log(snapshot.val());
                var total = snapshot.val();
                getFirebase().database().ref('/persistenceValue').update({
                    total: total + 1,
                });

                getFirebase().database().ref(databaseURL+'/' + generateID() + '/message').set({
                    index: total + 1,
                    content:content,
                    time: getCurrentTime(),
                    type: 'auth',
                    imageURl: imageURl,

                });

                getFirebase().database().ref(friendDatabaseURL+'/' + generateID() + '/message').set({
                    index: total + 1,
                    content:content,
                    time: getCurrentTime(),
                    type: 'friend',
                    imageURl: imageURl,
                });


                self.setState({
                    content: '',
                    selectedImage: null,
                });

            });
        }


    };


    onUploadImageClickHandler = () =>{
        this.refs.fileUploader.click();
    };

    onImageUploadChange = (event) =>{
        var file = event.target.files[0];
        this.setState({
            selectedImage: file,
        });
        console.log("file info: ");
        console.log(file);
    };

    onSendingImage = ()=>{
        alert('sending');

    };
    render() {
        var {selectedFriendChatting} = this.props;
        var listMessagesFirebaseURL = '';
        var listMessagesFirebaseURLForFriend= '';
        var totalMessage = 0;


        if(selectedFriendChatting.key) {
            listMessagesFirebaseURL          = 'users/' + getFirebase().auth().currentUser.uid + '/ListMessages/' + selectedFriendChatting.key;
            listMessagesFirebaseURLForFriend = 'users/' + selectedFriendChatting.key + '/ListMessages/' + getFirebase().auth().currentUser.uid ;

            console.log('url testing');
            console.log(listMessagesFirebaseURL);

        }

        const {selectedImage} = this.state;
        var imgElm = selectedImage? <img src={URL.createObjectURL(selectedImage) } className="image-upload" alt="imageMessage"/>: '';





        return (
            <div className="chat-message clearfix">
                <textarea
                    name="content"
                    id="message-to-send"
                    placeholder="Type your message"
                    rows={3}
                    onChange={this.onChange}
                    value={this.state.content}
                />
                {imgElm}<br/>
                <i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
                <input
                    type="file"
                    id="file"
                    ref="fileUploader"
                    style={{display: "none"}}
                    onChange={this.onImageUploadChange}/>
                <i className="fa fa-file-image-o" onClick={this.onUploadImageClickHandler}/>
                <button onClick={() =>this.onSendingMessage(listMessagesFirebaseURL,listMessagesFirebaseURLForFriend)}>Send</button>
                {/*<button onClick={this.onSendingImage}>Send</button>*/}

            </div>
        );
    }
}

var mapDispatchToProps =(dispatch)=>{
    return{
        onEnteredTextBox : () =>{
            dispatch();
        }
    }
};

const getCurrentTime = ()=>{
    return (new Date()).toLocaleString();
};
const mapStateToProps = (state)=>{
    return{
        selectedFriendChatting: state.selectedFriendChatting,
        firebase: state.firebase,

    }
};
export default connect(mapStateToProps,mapDispatchToProps)(TypingText);

