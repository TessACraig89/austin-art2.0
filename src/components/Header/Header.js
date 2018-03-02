import React, {Component} from 'react';
import './Header.css';
import firebase, { auth, provider } from '../../config/firebase.js';
import {Link} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

class Header extends Component{
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
  render(){
    return (
      <div className="header">
        <h1 className='headerTitle'>Austin Street Art</h1>
        <h2 className='headerSub'>A site dedicated to the incredible street art of Austin</h2>
        <div className="nav">
          <Link to={'/art'}><button className='navButton' id="toArtBtn">Art</button></Link>
          <Link to={'/'}><button to={'/'} className='navButton' id="toAboutBtn">About</button></Link>
          {this.state.user ?
            <div className="profileNav">
              <Link to={'/profile'}><button id="toProfileBtn" className='navButton'>Profile</button></Link>
              <button onClick={this.logout} className='navButton' id="logoutBtn">Logout</button>
            </div>
          :
            <button onClick={this.login} className='navButton' id="loginBtn">Log In</button>
          }
      </div>
      </div>
    )
  }
}

export default Header
