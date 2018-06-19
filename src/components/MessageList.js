
import React, { Component } from 'react';


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            message: {
                username: '',
                content: '',
                roomId: '',
                sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
            },
            newMessage: ''
        }
        this.messagesRef = this.props.firebase.database().ref('messages');
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createMessage = this.createMessage.bind(this);
   
    }

    createMessage() {
        this.messagesRef.push({
            content: this.state.newMessage,
            roomId: this.props.activeRoom.key,
            username: !this.props.user ? 'Guest' : this.props.username.displayName,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
        });
        this.setState({ newMessage: ''});
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            console.log(message)
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) })
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.newMessage !== '') {
        this.createMessage(this.state.newMessage);
        this.setState({newMessage: ''});
        }
    }

    handleChange(e) {
        this.setState({ newMessage: e.target.value });
    }



    render() {
        return (
            <div>
            
            </div>
        )
    }
}

export default MessageList;
