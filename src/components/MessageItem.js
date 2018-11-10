import React, {Component} from 'react';
import './../App.css'
class MessageItem extends Component {
    render() {

        var {message} = this.props;
        var messageImage  = message.imageURl && message.imageURl !==''? <img src={message.imageURl} className="message image-message" alt="imageMessage"/> : '';
        //var imageMessage = message.imageURl && message.imageURl !== ''? {message.imageURl} : "";
        console.log('message'); console.log(message);
        return (<div>
                <li className="clearfix">
                    <div className={message.type !== 'auth'?   'message-data' : 'message-data align-right'}>
                        <span className="message-data-time">{message.time}</span> &nbsp; &nbsp;
                        <span className="message-data-name">{message.senderName}</span> <i className="fa fa-circle me"/>
                    </div>
                    <div className={message.type !=='auth'? 'message my-message' : 'message other-message float-right'}>
                        {message.content}
                        {messageImage}
                    </div>
                </li>
            </div>
        );
    }
}

export default MessageItem;