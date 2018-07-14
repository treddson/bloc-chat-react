
// import React, { Component } from 'react';


// class MessageList extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             messages: [],
//             message: {
//                 username: '',
//                 content: '',
//                 roomId: '',
//                 sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
//             },
//             newMessage: ''
//         }
//         this.messagesRef = this.props.firebase.database().ref('messages');
//         this.handleChange = this.handleChange.bind(this);
//         this.createMessage = this.createMessage.bind(this);
   
//     }

//     createMessage(e) {
//         e.preventDefault();
//         // console.log(this.props.activeRoom.key + ' _...this is the active room');
//         this.messagesRef.push({
//             content: this.state.newMessage,
//             roomId: this.props.activeRoom.key,
//             username: !this.props.username ? 'Guest' : this.props.username.displayName,
//             sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
//         });
//         this.setState({ newMessage: ''});
//     }

//     componentDidMount() {
//         this.messagesRef.on('child_added', snapshot => {
//             const message = snapshot.val();
//             message.key = snapshot.key;
//             this.setState({ messages: this.state.messages.concat( message ) })
//         });
//     }

//     handleChange(e) {
//         this.setState({ newMessage: e.target.value });
//     }

//     render() {
//         // console.log(this.state.messages)
//         return (
//             <div className='message-list'> 
//                 <ul>
//                     { this.state.messages.map( (message, index) => {
//                         if (this.props.activeRoom === message.roomId) {
//                             return <li key={ index }> {message.username} says: {message.content} </li>
//                         }
//                     // console.log(this.props.activeRoom)
//                     // console.log(message.roomId)
//                     })}
//                 </ul>
//                 <form className="new-message" onSubmit={ (e) => this.createMessage(e) }>
//                     <input placeholder="your message" type="text" value={this.state.newMessage} onChange={ (e) => this.handleChange(e)} />
//                     <input className="btn btn-light btn-sm" type="submit" value="Send" />
//                 </form>
//             </div>
//         )
//     }
// }

// export default MessageList;
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
        this.createMessage = this.createMessage.bind(this);
   
    }

    createMessage(e) {
        e.preventDefault();
        console.log(this.props.activeRoom.key + ' ...this is the active room');
        this.messagesRef.push({
            content: this.state.newMessage,
            roomId: this.state.activeRoom.key,
            username: !this.props.username ? 'Guest' : this.props.username.displayName,
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

    handleChange(e) {
        this.setState({ newMessage: e.target.value });
    }

    render() {
        // console.log(this.state.messages)
        return (
            <div className='message-list'> 
                <ul>
                    { this.state.messages.map( (message, index) => {
                        if (this.props.activeRoom.key === message.roomId) {
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