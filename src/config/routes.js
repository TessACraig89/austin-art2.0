import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from '../components/About';
import Art from '../containers/Art';
import Login from '../containers/Login';
import New from '../containers/New';
import Profile from '../containers/Profile';
import Test from '../containers/Test';

export default (
  <Switch>
    <Route exact path='/' component={ About }/>
    <Route path='/art' component={ Art }/>
    <Route exact path='/login' component={ Login }/>
    <Route path='/new' component={ New }/>
    <Route exact path='/profile' component={ Profile }/>
    <Route exact path='/test' component={ Test }/>
  </Switch>
)
