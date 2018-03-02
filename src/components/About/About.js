import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import Header from '../Header/Header';

class About extends Component {
  render() {
    return (
      <div className="about">
          <img className="aboutCollage" src={require("../../static/images/skyline.png")}></img>
        <div className='aboutTextContainer'>
          <h1 className="title">About</h1>
          <p className="aboutP">Austin Street Art is lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <a href="">About The Developer</a>
      </div>
      </div>
    );
  }
}

export default About;
