import React, { Component } from 'react';


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };
        this.userRef = this.props.firebase.database().ref('user');
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => { 
            this.props.setUser(user)
        });
    }

    signIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider )
    }

    signOut() {
        this.props.firebase.auth().signOut();
    }

render() {
    return (
        <div>
            <h2>Current User: {this.props.currentUser ? this.props.currentUser.displayName : 'Guest'}</h2>
            <button className="btn btn-light btn-sm" onClick={this.signIn}>Sign in</button>
            <button className="btn btn-light btn-sm" onClick={this.signOut}>Sign out</button>  
        </div>
    );
  }
}

export default User;

