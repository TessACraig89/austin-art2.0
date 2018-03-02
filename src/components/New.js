import React, { Component } from 'react';
import '../App.css';
import firebase, { auth, provider } from '../config/firebase.js';
import {Link} from 'react-router-dom';
import Test from './Test';

class New extends Component {
  constructor() {
      super();
      this.state = {
        currentPosts: '',
        titleName: '',
        imageValue: '',
        locationAddress: '',
        posts: []
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
      title: this.state.titleName,
      image: this.state.imageValue,
      location: this.state.locationAddress
    }
    postsRef.push(post);
    this.setState({
      titleName: '',
      imageValue: '',
      locationAddress: ''
    });
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
  removePost(postId) {
    const postRef = firebase.database().ref(`/posts/${postId}`);
    postRef.remove();
  }
  render() {
    return (
      <div className='new'>
        <header>
            <div className="wrapper">
              {this.state.user ?
                <h2>{this.state.user.displayName}</h2>
                :
                <h2>{null}</h2>
              }
            </div>
        </header>
        <div className='container'>
          <section className='add-post'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="titleName" placeholder="Title" onChange={this.handleChange} value={this.state.currentPost} />
                <input type="text" name="locationAddress" placeholder="Location" onChange={this.handleChange} value={this.state.locationAddress} />
                <input type="text" name="imageValue" placeholder="Image URL" onChange={this.handleChange} value={this.state.imageValue} />
                <button>Add Post</button>
              </form>
        </section>
        <section className='display-post'>
            <div className="wrapper">
              <ul>
                {this.state.posts.map((post) => {
                  return (
                    <li key={post.id}>
                      <h3>{post.title}</h3>
                      <p>{post.image}
                      </p>
                      <p>Location:{post.location}
                      </p>
                      <button onClick={() => this.removePost(post.id)}>Remove</button>
                    </li>
                  )
                })}
              </ul>
            </div>
        </section>
      </div>
    </div>
  );
  }
}
export default New;
