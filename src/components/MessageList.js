
import React, { Component } from 'react';


class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            username: "",
            content: "",
            sentAt: "",
            roomId: ""
        }
        this.messagesRef = this.props.firebase.database().ref('messages');
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
   
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
        if(this.state.newRoomName !== '') {
            this.createRoom(this.state.newRoomName);
            this.setState({newRoomName: ''});
        }
    }

    handleChange(e) {
        this.setState({ newRoomName: e.target.value });
    }


  render() {
    return (
      <div>

      </div>
    );
  }
}

export default MessageList;
