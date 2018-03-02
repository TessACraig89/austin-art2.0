import React, { Component } from 'react';
import '../App.css';
import firebase, { auth, provider } from '../config/firebase.js';
import {Link} from 'react-router-dom';
import Header from './Header';

class Art extends Component {
  // set default value for input's state
  constructor() {
      super();
      // connect inputs to component's state, so react can keep track of them
        // titleName input
        // imageURL input
        // location input
        // create a variable posts inside of default state. This holds all of the posts that are currently being tracked inside of our Firebase database.
        //
      this.state = {
        titleName: '',
        imageURL: '',
        locationAddress: '',
        posts: [],
        user: null
      }
      // access this(constructor() component) in our handleChange method, bind handleChange method in constructor() component
      // access this(constructor() component) in our handleSubmit method, bind handleSubmit method in constructor() component
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  // catch-all handleChange method that receives the event from our inputs, and updates that input's corresponding piece of state,  using brackets to dynamically determine key name in an object literal, check out the MDN docs on computed properties
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
      image: this.state.imageURL,
      location: this.state.locationAddress
    }
    postsRef.push(post);
    this.setState({
      titleName: '',
      imageURL: '',
      locationAddress: ''
    });
  }
  componentDidMount() {
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
      <div className='art'>
        <header>
            <div className="wrapper">
              <h1>Username</h1>
              <Link class="toProfileFromNewLink" to={'/profile'}><button class='navButton' id='toProfileFromNewButton'>Go To Profile</button></Link>
              <h2>Art</h2>
            </div>
        </header>
        <div className='container'>
<h2>Posts</h2>
<section className='display-post'>
    <div className="wrapper">
      <ul>
        {this.state.posts.map((post) => {
          return (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.image}
              </p>
              <p>Location:{post.location}</p>
              {/*}{this.state.favoriteStatus = true?
                <div>
                <button onClick={this.unfavorite}>Unfavorite</button>
                </div>
              :
                <button onClick={this.favorite}>Favorite</button>
              }*/}
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
export default Art;
