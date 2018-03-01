import React, { Component } from 'react';
import ImageUploader from 'react-firebase-image-uploader';
import { connect } from 'react-firebase-storage-connector';
import firebase, { auth, provider } from '../config/firebase.js';
import 'firebase/database';


class Test extends Component {
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
      };
      this.handleUploadStart = this.handleUploadStart.bind(this);
      this.handleProgress = this.handleProgress.bind(this);
      this.handleUploadError = this.handleUploadError.bind(this);
      this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
      // this.handleOnChange = this.handleOnChange.bind(this);
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

  // handleOnChange(e) {
  //   this.setState({imageURL:e.target.imageURLs[0]})
  // };

//   componentDidMount() {
//     const storageRef = firebase.storage().ref('images');
//     storageRef.on('value', (snapshot) => {
//     let images = snapshot.val();
//     let newState = [];
//     for(let image in images) {
//       newState.push({
//         image: images[image].image
//       })
//     }
//     this.setState({
//       images: newState
//     })
//   })
// }

// const imagesRef =
// firebase.storage().ref('images').child(filename);
// imageRef.on('value', (snapshot) => {
//   let image = snapshot.val();
//   let newState = [];
// }

  render() {
        return (


            <div>
            <header className="App-header">
              <h1 className="App-title">ˈnōˌmad</h1>
            </header>

                <form>
                    <label>Image:</label>
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
                        // onChange={this.handleOnChange}
                    />
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>


        );
    }
}

export default Test;
