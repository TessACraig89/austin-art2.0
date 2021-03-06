import React, { Component } from 'react';
import './New.css';
import firebase, { auth, provider } from '../../config/firebase.js';
import {Link} from 'react-router-dom';
import Image from '../Image/Image';

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
                <div className='user-profile'>
                  <img className="userImg" src={this.state.user.photoURL} />
                  <h2 className="username">{this.state.user.displayName}</h2>
                </div>
                :
                <h2>{null}</h2>
              }
            </div>
        </header>
        <div className='container-fluid full width'>
<div className="row">
  <div className="col-6">
        <h3 className="newPageTitle">New Post</h3>
      <div className="line">
</div>
          <section className='add-post'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" className="titleName" name="titleName" placeholder="Title" onChange={this.handleChange} value={this.state.currentPost} />
                <input type="text" className="locationAddress"name="locationAddress" placeholder="Location" onChange={this.handleChange} value={this.state.locationAddress} />

              {/*<input type="text" name="imageValue" placeholder="Image URL" onChange={this.handleChange} value={this.state.imageValue} />*/}
                <ul class="instructions">
                  <h4 className="upload">Image Upload Instructions:</h4>
                  <br></br>
                  <li className="one"><span  className="num">1</span> Upload your image onto <a href="https://imgur.com/">Imgur</a></li>
                  <li className="two"><span className="num">2</span> Copy image Direct Link</li><li className="three"><span className="num">3</span> Paste Direct Link into Image URL input field</li>
                </ul>
                <input id="imageInput" type="text" name="imageValue" placeholder="Image URL" onChange={this.handleChange}  value={this.state.imageValue} />
                {/*<input class="col col-4 form-control my-1" style="margin: 5px;" placeholder="Kitty URL" type="text" name="url" />*/}
                {/*<Image/>*/}
                <button id="addPost" className="newBtns">Add Post</button>
              </form>
          <a href="/profile"><button class="newBtns" id="aboutButton">Cancel</button></a>
<p className="checkOut">Check out your new post on the <a href="/art">Art</a> page and your <a href="/profile">Profile</a> page!</p>
          </section>
<div className="line2"></div>
</div>
</div>


      </div>

    </div>
  );
  }
}
export default New;
