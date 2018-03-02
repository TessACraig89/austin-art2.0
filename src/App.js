import React, { Component } from 'react';
import firebase from './config/firebase';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Button } from 'reactstrap';

import About from './components/About';
import Header from './components/Header';
import Art from './components/Art';
import New from './components/New';
import Profile from './components/Profile';
import Test from './components/Test';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header/>
          <Switch>
            <Route exact path='/' component={ About }/>
            <Route exact path='/art' component={ Art }/>
            <Route exact path='/new' component={ New }/>
            <Route exact path='/profile' component={ Profile }/>
            <Route exact path='/test' component={ Test }/>
          </Switch>
      </div>
    );
  }
}
export default App;
