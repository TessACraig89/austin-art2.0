import React, { Component } from 'react';
import '../../App.css';
import ImageUploader from 'react-firebase-image-uploader';
import { connect } from 'react-firebase-storage-connector';
import firebase, { auth, provider } from '../../config/firebase.js';
import 'firebase/database';


class Image extends Component {
  constructor(props){
    super(props);
      if (!firebase.apps.length) {
      this.app = firebase.initializeApp(firebase);
    }
    this.state = {
        image: [],
        isUploading: false,
        progress: 0,
        imageURL: '',
        imageValue: '',
      };
      this.handleUploadStart = this.handleUploadStart.bind(this);
      this.handleProgress = this.handleProgress.bind(this);
      this.handleUploadError = this.handleUploadError.bind(this);
      this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUploadStart() {
      this.setState({isUploading: true, progress: 0});
  }
  handleProgress(progress) {
      this.setState({progress});
  }
  handleUploadError(error) {
      this.setState({isUploading: false});
      console.error(error);
  }
  handleUploadSuccess = (filename) => {
      this.setState({image: filename, progress: 100, isUploading: false});
      firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({
        imageURL: url
      })
      );
  };
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const postsRef = firebase.database().ref('posts');
    const post = {
      image: this.state.imageValue
    }
    postsRef.push(post);
    this.setState({
      imageValue: ''
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
          image: posts[post].image,
        });
      }
      this.setState({
        posts: newState
      });
    });
  }
  render() {
      return (
          <div>
              <form onSubmit={this.handleSubmit} onChange={this.handleChange} value={this.state.imageValue}>
                  {this.state.isUploading &&
                      <p>Progress: {this.state.progress}</p>
                  }
                  {this.state.imageURL &&
                      <img src={this.state.imageURL} />
                  }
                  <ImageUploader
                      name="image"
                      storageRef={firebase.storage().ref('images')}
                      onUploadStart={this.handleUploadStart}
                      onUploadError={this.handleUploadError}
                      onUploadSuccess={this.handleUploadSuccess}
                      onProgress={this.handleProgress}
                  />
              </form>
          </div>
      );
  }
}

export default Image;
