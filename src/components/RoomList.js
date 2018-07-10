
import React, { Component } from 'react';


class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomName: ''
            
        }
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createRoom = this.createRoom.bind(this);
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
        });
    }

    createRoom(newRoomName) {
        this.roomsRef.push({
            name: newRoomName
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
           <ul className="room-list">
            { this.state.rooms.map( (room, index)  =>
            <li onClick={() => this.props.setActiveRoom(room)} key={ index }> { room.name }</li>
        )}
           </ul>
        <form onSubmit={ (e) => this.handleSubmit(e) }>
            <label>
            <textarea value={this.state.newRoomName} onChange={this.handleChange} />
            </label>
            <input className="btn btn-light btn-sm" type="submit" value="New Room" />
        </form>
      </div>
    );
  }
}

export default RoomList;
