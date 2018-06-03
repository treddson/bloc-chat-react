import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA_7VZru5wYLmL3k5lC-FVzD2MmVaaP-B8",
  authDomain: "bloc-chat-react-3a40c.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-3a40c.firebaseio.com",
  projectId: "bloc-chat-react-3a40c",
  storageBucket: "bloc-chat-react-3a40c.appspot.com",
  messagingSenderId: "518580362062"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Available Rooms</h1>
        <RoomList 
            firebase= { firebase } />
      </div>
    );
  }
}

export default App;
