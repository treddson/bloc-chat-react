import React, { Component } from 'react';


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            username: '',
            newMessage: '',
            value: '',
            activeRoom: ''
        }
        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) })
        });
    }

    createMessage(messages) {
        this.messagesRef.push({
            username: this.props.user ? this.props.user.displayName : 'Guest',
            content: this.state.value,
            // sentAt: firebase.database.ServerValue.TIMESTAMP
            roomId: this.props.activeRoom.key

        });
    }


  render() {
    return (
        <div>
          {/* some code here */}
        </div>
    );
  }
}

export default MessageList;
