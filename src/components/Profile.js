import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

class Profile extends Component {
  render() {
    return (
      <div className="profile">
        <h1>Users Name</h1>
        <div className="favorites">
          <h2>Favorites</h2>
        </div>
        <div className="Posts">
          <h2>Posts</h2>
          <Link class="toNewLink" to={'/new'}><button class='navButton' id='toNewButton'>ADD NEW</button></Link>
        </div>
      </div>
    );
  }
}

export default Profile;
