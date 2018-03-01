import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

class Header extends Component{
  render(){
    return (
      <div className="header">
        <h1 className='headerTitle'>Austin Street Art</h1>
        <h2 className='headerSub'>A site dedicated to the incredible street art of Austin</h2>
        <nav className='nav'>
          <Link className="toArtLink" to={'/art'}><button className='navButton' id='artButton'>Art</button></Link>
          <Link className="toAboutLink" to={'/'}><button className='navButton' id='aboutButton'>About</button></Link>
          <Link className="toLoginLink" to={'/login'}><button className='navButton'
         id='loginButton'>Login</button></Link>
      </nav>
      </div>
    )
  }
}

export default Header
