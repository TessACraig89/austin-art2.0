import React, { Component } from 'react';
import '../App.css';
import firebase, { auth, provider } from '../config/firebase.js';
import {Link} from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const postsRef = firebase.database().ref('posts');
    const post = {
      // grab user's name or email from the state, and package it into user object so we pass to our Firebase database and render
      user: this.state.user.displayName || this.state.user.email
    }
  }
  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }
  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        // once logged in get user from result and store in variable user
        const user = result.user;
        this.setState({
          user
        });
      });
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
    if (user) {
      this.setState({ user });
    }
  });
    const postsRef = firebase.database().ref('posts');
    postsRef.on('value', (snapshot) => {
      let posts = snapshot.val();
      let newState = [];
      for (let post in posts) {
        newState.push({
          id: post,
          title: posts[post].title,
          image: posts[post].image,
          location: posts[post].location
        });
      }
      this.setState({
        posts: newState
      });
    });
  }
  render() {
  return (
    <div className='app'>
      <header>
        <div className="wrapper">
          <h1>Fun Food Friends</h1>
          {this.state.user ?
            <div>
            <h2>{this.state.user.displayName}</h2>
            <button onClick={this.logout}>Logout</button>
            </div>
          :
            <button onClick={this.login}>Log In</button>
          }
        </div>
      </header>
      {this.state.user ?
    <div>
      <div className='user-profile'>
        <img src={this.state.user.photoURL} />
      </div>
    </div>
    :
    <div className='wrapper'>
    </div>
  }
    </div>
  );
}
}
export default Login;
