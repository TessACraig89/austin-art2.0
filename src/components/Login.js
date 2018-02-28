import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

class Login extends Component {
  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        <Link class="toGoogleLink" to={'/login'}><button class='navButton' id='googleButton'>Click Here to Login with Google</button></Link>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor lacus luctus accumsan tortor. Sagittis orci a scelerisque purus semper eget. Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor.</p>
      </div>
    );
  }
}

export default Login;
