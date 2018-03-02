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
      <Container>
        <h1 className='headerTitle'>Austin Street Art</h1>
        <h2 className='headerSub'>A site dedicated to the incredible street art of Austin</h2>
        <Row>
          <Col><Link className="col-" to={'/art'}><button className='navButton' id='artButton'>Art</button></Link></Col>
          <Col><Link className="toAboutLink" to={'/'}><button to={'/'}className='navButton' id='aboutButton'>About</button></Link></Col>
          {this.state.user ?
            <div>
              <Col><button onClick={this.logout}>Logout</button></Col>
              <Col><Link className="toAboutLink" to={'/profile'}><button className='navButton' id='aboutButton'>Profile</button></Link></Col>
            </div>
          :
            <Col><button onClick={this.login}>Log In</button></Col>
          }
      </Row>
      </Container>
    )
  }
}

export default Header
