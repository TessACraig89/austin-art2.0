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
    const postsRef = firebase.database().ref('posts');
    const post = {
      title: this.state.titleName,
      image: this.state.imageURL,
      location: this.state.locationAddress,
      user: this.state.user.displayName || this.state.user.email
    }
    postsRef.push(post);
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
          <input type='text' className="input-lg" name='titleName' placeholder={post.title} onChange={this.handleUpdateChange}
          value={this.state.titleName}
          />
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
