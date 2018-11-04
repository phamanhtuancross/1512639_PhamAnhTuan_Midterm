import React, {Component} from 'react';

class MessageItem extends Component {
    render() {

        var {message} = this.props;
        console.log('message'); console.log(message);
        return (<div>
                <li className="clearfix">
                    <div className={message.type !== 'auth'?   'message-data' : 'message-data align-right'}>
                        <span className="message-data-time">{message.time}</span> &nbsp; &nbsp;
                        <span className="message-data-name">{message.senderName}</span> <i className="fa fa-circle me"/>
                    </div>
                    <div className={message.type !=='auth'? 'message my-message' : 'message other-message float-right'}>
                        {message.content}
                    </div>
                </li>
            </div>
        );
    }
}

export default MessageItem;