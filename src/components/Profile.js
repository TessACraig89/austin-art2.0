import React, { Component } from 'react';
import '../App.css';
import firebase, { auth, provider } from '../config/firebase.js';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';


class Profile extends Component {
  constructor() {
      super();
      this.state = {
        showModal: false,
        titleName: '',
        imageURL: '',
        locationAddress: '',
        posts: [],
        user: null
      }
      // bind methods to constructor
      this.handleChange = this.handleChange.bind(this);
      this.handleUpdateChange = this.handleUpdateChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.removePost = this.removePost.bind(this);
      this.updateThings = this.updateThings.bind(this);
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
  }
  /////////Modal open/close //////////////////////////////////////////////////////
  handleClose() {
    this.setState({ showModal: false });
  }
  handleShow(id) {
    this.setState({
      showModal: id,
    });
  }
  // catch-all handleChange method calls, updates that input's corresponding piece of state,  using brackets to dynamically determine key name in an object literal
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleUpdateChange(a){
    this.setState({
      [a.target.name]: a.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    // create 'posts' space in Firebase database where all posts are stored, by calling the ref method and passing in the destination we'd like them to be stored posts
    const postsRef = firebase.database().ref('posts');
    // grab the post the user typed in from the state, and package it into an object so we pass to our Firebase database
    const post = {
      title: this.state.titleName,
      image: this.state.imageURL,
      location: this.state.locationAddress,
      user: this.state.user.displayName || this.state.user.email
    }
    // sends a copy of post object so that it can be stored in Firebase
    postsRef.push(post);
    // clear out the inputs
    this.setState({
      titleName: '',
      imageURL: '',
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
    // snapshot provides a bird's eye overview of the posts ref inside database. grab a list of all of the properties inside of posts ref, using the .val() method
    postsRef.on('value', (snapshot) => {
      let posts = snapshot.val();
      let newState = [];
      // Firebase's value event fires when new post is pushed into database, sending back a new snapshot with a list of all of the posts currently in database
      for (let post in posts) {
        newState.push({
          id: post,
          title: posts[post].title,
          image: posts[post].image,
          location: posts[post].location
        });
      }
      // once all the keys are iterated over (and therefore all items are grabbed from our database), we update the state with this list of items from our database, updates component through a setState which triggers a re-render and displays the new post on the page
      this.setState({
        posts: newState
      });
    });
  }
  // look up specific post by its key, call firebase.database()'s remove method, which deletes it from the page
  removePost(postId) {
    const postRef = firebase.database().ref(`/posts/${postId}`);
    postRef.remove();
  }
  updateThings(post) {
    const postRef = firebase.database().ref(`/posts/${post.id}`);
    let updates = {
      title: this.state.titleName,
      image: this.state.imageURL,
      location: this.state.locationAddress
    };
    postRef.update(updates);
    this.handleClose();
    this.setState({
      titleName: '',
      imageURL: '',
      locationAddress: ''
    });
  }
  render() {
    return (
      <div className='profile'>
          <div className='container'>
              {this.state.user ?
                <h2>{this.state.user.displayName}</h2>
                :
                <h2>{null}</h2>
              }
              <Link className="toAboutLink" to={'/new'}><button>ADD </button></Link>
              <h2>Posts</h2>

        <section className='display-post'>
            <div className="wrapper">
              <ul>
                {/* once I have a list of all posts being grabbed from Firebase and stored inside state, map over it and print the results on to the page */}
                {this.state.posts.map((post) => {
                  return (
                    <div>
                    <h3 key={post.id}></h3>
                      <h3>{post.title}</h3>
              <div className="deleteBut">
                  <div className="modal-container">
                      <button type="button" className="btn btn-success btn-lg" onClick={ ()=> this.handleShow(post.id)}>Edit</button>
                      <Modal show={this.state.showModal === post.id} onHide={this.handleClose} bsSize="large">
                        <Modal.Header>
                            <Modal.Title>Edit Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={this.handleSubmit}>
                                <label className="label10">Title:</label>
                                    <input type='text' className="input-lg" name='titleName' placeholder={post.title} onChange={this.handleUpdateChange} value={this.state.titleName}/>
                                <br/>
                                <br/>
                                <label className="label9">Location:</label>
                                    <textarea className="editthis input-lg" type='text' placeholder={post.location} name='locationAddress' id='locationAddress'  onChange={this.handleUpdateChange}  value={this.state.locationAddress}/>
                                <label className="label9">Image:</label>
                                    <textarea className="editthis input-lg" type='text' placeholder={post.imageURL} name='imageURL' id='imageURL'  onChange={this.handleUpdateChange}  value={this.state.imageURL}/>
                                <br/>
                                <br/>
                                <button type="button" className="btn btn-primary btn-lg" onClick={() => this.updateThings(post)}>Save changes</button>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="button" className="btn btn-info btn-lg" data-dismiss="modal" onClick={this.handleClose}>Close</button>
                        </Modal.Footer>
                    </Modal>
                  </div>
                  <button onClick={() => this.removePost(post.id)}>Remove</button>
              </div>
            </div>
                )
              })}
              </ul>
          </div>
        </section>
      </div>
    </div>
    )
  }
}
export default Profile;
