
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

    createMessage(message) {
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
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) })
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.newMessage !== '') {
        this.createMessage;
        this.setState({newMessage: ''});
        }
    }

    handleChange(e) {
        this.setState({ newMessage: e.target.value });
    }



    render() {
        // console.log(this.state.messages)
        return (
            <div className='message-list'> 
                <ul>
                    { this.state.messages.map( (message, index) => {
                        if (this.props.activeRoom === message.roomId) {
                            return <li key={ index }> {message.username} says: {message.content} </li>
                        }
                    // console.log(this.props.activeRoom)
                    // console.log(message.roomId)
                    })}
                </ul>
                <form className="new-message" onSubmit={ (e) => this.createMessage(e) }>
                    <input type="text" value={this.state.newMessage} onChange={ (e) => this.handleChange(e)} />
                    <input type="submit" value="Send" />
                </form>
            </div>
        )
    }
}

export default MessageList;
