import React, {Component} from 'react';
import '../App.css';
import firebase, { auth, provider } from '../config/firebase.js';
import {Link} from 'react-router-dom';

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
        <nav className='nav'>
          <Link className="toArtLink" to={'/art'}><button className='navButton' id='artButton'>Art</button></Link>
          <Link className="toAboutLink" to={'/'}><button className='navButton' id='aboutButton'>About</button></Link>
          {this.state.user ?
            <div>
              <button onClick={this.logout}>Logout</button>
              <Link className="toAboutLink" to={'/profile'}><button className='navButton' id='aboutButton'>{this.state.user.displayName} Profile</button></Link>
            </div>
          :
            <button onClick={this.login}>Log In</button>
          }
      </nav>
      </div>
    )
  }
}

export default Header
