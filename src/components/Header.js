import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

class Header extends Component{
  render(){
    return (
      <div className="header">
        <h1 class='headerTitle'>Austin Street Art</h1>
        <h2 class='headerSub'>A site dedicated to the incredible street art of Austin</h2>
        <nav class='nav'>
          <Link class="toArtLink" to={'/art'}><button class='navButton' id='artButton'>Art</button></Link>
          <Link class="toAboutLink" to={'/'}><button class='navButton' id='aboutButton'>About</button></Link>
          <Link class="toLoginLink" to={'/login'}><button class='navButton'
         id='loginButton'>Login</button></Link>
      </nav>
      </div>
    )
  }
}

export default Header
