import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './About.css';
import Header from '../Header/Header';

class About extends Component {
  render() {
    return (
      <div className="about">
          <img className="aboutCollage" src={require("../../static/images/skyline.png")}></img>
        <div className='aboutText'>
          <h1 className="title">About</h1>
          <p className="aboutP">Austin Street Art is for sharing images and locations of the many wonderful graffiti stencils, posters, stickers, and installations in the Austin area. Users can browse art, favorite the pieces they enjoy the most, and create posts. My motivation for developing Austin Street Art was that I want the ability to save and share the amazing art I have seen all over Austin. As someone who has lived in Austin for over 16 years I have had some of my favorite street art be covered up and demolished, but with Austin Street Art we can continue to view and appreciate these pieces regardless of our city’s changes.</p>
          <a href="tesscraig.com"><button className="developer">About The Developer</button></a>
      </div>
      </div>
    );
  }
}

export default About;
