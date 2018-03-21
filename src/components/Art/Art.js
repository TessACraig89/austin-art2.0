import React, { Component } from 'react';
import './Art.css';
import firebase, { auth, provider } from '../../config/firebase.js';
import {Link} from 'react-router-dom';
import Header from '../Header/Header';

class Art extends Component {
  constructor() {
      super();
      this.state = {
        titleName: '',
        imageURL: '',
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
              <h1 className="artTitle">Art</h1>
        <div className='container'>
            <div className="posts">
                <section className='display-post'>
                    <div className="wrapper">
                        <ul>
                            {this.state.posts.map((post) => {
                                return (
                                    <li key={post.id}>
                                        <h2 className="postTitle">{post.title}</h2>
                                        <p className="postImg">src={post.image}</p>
                                        <p className="postLocation">Location : {post.location}</p>
                                        <button className="artBtn"> &hearts;</button>
                                        {/*}{this.state.favoriteStatus = true?
                                        <div>
                                        <button onClick={this.unfavorite}>Unfavorite</button>
                                        </div>
                                      :
                                        <button onClick={this.favorite}>Favorite</button>
                                      }*/}
                                  </li>
                                )
                            })}
                        </ul>
                    </div>
                </section>
                <section id="artPostSec2" className='display-post'>
                    <div className="wrapper">
                        <ul>
                            {this.state.posts.map((post) => {
                                return (
                                    <li key={post.id}>
                                        <h3 className="postTitle">{post.title}</h3>
                                        <p className="postImg">{post.image}</p>
                                        <p className="postLocation">Location : {post.location}</p>
                                        <button className="artBtn"> &hearts;</button>
                                        {/*}{this.state.favoriteStatus = true?
                                        <div>
                                        <button onClick={this.unfavorite}>Unfavorite</button>
                                        </div>
                                      :
                                        <button onClick={this.favorite}>Favorite</button>
                                      }*/}
                                  </li>
                                )
                            })}
                        </ul>
                    </div>
                </section>
            </div>
      </div>
    </div>
  );
  }
}
export default Art;
