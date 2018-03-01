import React, { Component } from 'react';
import '../App.css';
import firebase, { auth, provider } from '../config/firebase.js';
import {Link} from 'react-router-dom';
import {Modal} from 'react-bootstrap';


class Profile extends Component {
  constructor() {
      super();
      this.state = {
        currentPosts: '',
        titleName: '',
        imageURL: '',
        locationAddress: '',
        posts: [],
        user: null
      }
      this.handleChange = this.handleChange.bind(this);
      // this.handleUpdateChange = this.handleUpdateChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      // this.updateThings = this.updateThings.bind(this);
      // this.handleShow = this.handleShow.bind(this);
      // this.handleClose = this.handleClose.bind(this);
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
        <header>
            <div className="wrapper">
              <h1>Username</h1>
              <Link className="toProfileFromNewLink" to={'/new'}><button className='navButton' id='toProfileFromNewButton'>Go To Profile</button></Link>
              <h2>Posts</h2>
            </div>
        </header>
        <div className='container'>
        <section className='display-post'>
            <div className="wrapper">
              <ul>
                {this.state.posts.map((post) => {
                  return (
                    <li key={post.id}>
                      <h3>{post.title}</h3>
                      <p>Image URL:{post.image}
                      </p>
                      <p>Location:{post.location}
                      </p>
                      <button onClick={() => this.removePost(post.id)}>Remove Post</button>
                    <div className="modal-container">
                      <button type="button" className="btn btn-success btn-lg" onClick={ ()=> this.handleShow(post.id)}>Edit!</button>
                      <Modal show={this.state.showModal === post.id} onHide={this.handleClose} bsSize="large">
                        <Modal.Header>
                          <Modal.Title>Edit Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <form onSubmit={this.handleSubmit}>
                            <label className="label10">Title:</label>
                            <input type='text' className="input-lg" name='title' placeholder={post.title} onChange={this.handleUpdateChange}
                            value={this.state.titleName}
                            />
                            <br/>
                            <br/>
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
export default Profile;
