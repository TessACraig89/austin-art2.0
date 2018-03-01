import React, { Component } from 'react';
import '../App.css';
import firebase from '../config/firebase.js';

class Art extends Component {
  constructor() {
      super();
      this.state = {
        currentPosts: '',
        locationAddress: '',
        posts: []
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
      title: this.state.currentPost,
      location: this.state.locationAddress
    }
    postsRef.push(post);
    this.setState({
      currentPost: '',
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
          user: posts[post].location
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
              <h1>Art</h1>
            </div>
        </header>
        <div className='container'>
          <section className='add-post'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="locationAddress" placeholder="Location" onChange={this.handleChange} value={this.state.locationAddress} />
                <input type="text" name="currentPost" placeholder="Post" onChange={this.handleChange} value={this.state.currentPost} />
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
                      <p>Location:{post.location}
                      //add a button to our UI with an onClick that calls our removepost method and passes it the post's ke
                      <button onClick={() => this.removePost(post.id)}>Remove Post</button>
                      </p>
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
