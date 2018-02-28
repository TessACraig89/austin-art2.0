// import React, { Component } from 'react';
// import firebase from './config/firebase';
// import './App.css';
// import { Switch, Route } from 'react-router-dom';
// import { Button } from 'reactstrap';
//
// import About from './components/About';
// import Header from './components/Header';
// import Art from './components/Art';
// import Login from './components/Login';
// import New from './components/New';
// import Profile from './components/Profile';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//           <Header/>
//           <Switch>
//             <Route exact path='/' component={ About }/>
//             <Route exact path='/art' component={ Art }/>
//             <Route exact path='/login' component={ Login }/>
//             <Route exact path='/new' component={ New }/>
//             <Route exact path='/profile' component={ Profile }/>
//           </Switch>
//       </div>
//     );
//   }
// }
// export default App;
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './config/firebase.js';

class App extends Component {
  // constructor is the hook for our app and setting a default value for our input's state
  constructor() {
    super();
    // conect inputs to component's state, so react can keep track of them
      // reate a variable called items inside of default state. This will eventually hold all of the potluck items that are currently being tracked inside of our Firebase databas
    this.state = {
      currentItem: '',
      username: '',
      items: []
    }
    // Since we're using ES6 classes and need access to this in our handleChange method, we'll also need to bind it back in our constructor() component
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // catch-all handleChange method that receives the event from our inputs, and updates that input's corresponding piece of state,  using brackets to dynamically determine key name in an object literal, check out the MDN docs on computed properties
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  // add the handleSubmit method to your component
    // e.preventDefault() - we need to prevent the default behavior of the form, which if we don't will cause the page to refresh when you hit the submit button.
    // const itemsRef = firebase.database().ref('items'); - we need to carve out a space in our Firebase database where we'd like to store all of the items that people are bringing to the potluck. We do this by calling the ref method and passing in the destination we'd like them to be stored (items).
    // const item = { /* .. */ } here we grab the item the user typed in (as well as their username) from the state, and package it into an object so we ship it off to our Firebase database.
    // itemsRef.push(item) similar to the Array.push method, this sends a copy of our object so that it can be stored in Firebase.
    //this.setState({ currentItem: '', username: '' }); is just so that we can clear out the inputs so that an additional item can be added.
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.username
    }
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      username: ''
    });
  }
  componentDidMount() {
    const itemsRef = firebase.database().ref('items');
     //grab items from our database, but also to update us when new values get added to our database. It accomplishes this using the value custom event listener.
      /*snapshot, provides you with a bird's eye overview of the items ref inside of your database. From here, you can easily grab a list of all of the properties inside of that items ref, using the .val() method, value automatically fires on two occassions:
         - Any time a new item is added or removed from our items reference inside of our database
         - The first time the event listener is attached
        useful for initially grabbing a list of all of the items inside of our database, and then subsequently tracking when new items get added and removed.*/
        // attach this event listener inside of our componentDidMount, so that we start tracking our Potluck items as soon as our component loads on to the page
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      /*we instantiate a new array and populate it with the results that come back from our value listener*/
      /*Firebase's value event is firing when you push the new item into your database, and sending back a new snapshot with a list of all of the items currently in your database, which ultimate updates your component through a setState which triggers a re-render and displays the new item on the page*/
      let newState = [];
      /*for…in over each key, and push the result into an object inside our newState array*/
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        });
      }
      /*once all the keys are iterated over (and therefore all items are grabbed from our database), we update the state with this list of items from our database.*/
      this.setState({
        items: newState
      });
    });
  }
  //removeItem. This method will need to be passed that unique key which serves as the identifier for each one of the items inside of our Firebase database.
    // look up a specific item by its key, call firebase.database()'s remove method, which strips it from the page.
  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/items/${itemId}`);
    itemRef.remove();
  }
  render() {
    return (
      <div className='app'>
        <header>
            <div className="wrapper">
              <h1>Fun Food Friends</h1>

            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
                //attach a submit event listener for our form, and have it call a handleSubmit method
                <form onSubmit={this.handleSubmit}>
                  //onChange event handlers to our inputs, as well as providing them with a value derived from our state (this is called a "controlled input"), like this:
                  <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                  <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                  <button>Add Item</button>
                </form>
          </section>
          <section className='display-item'>
              <div className="wrapper">
                // now that we have a list of all of our items being grabbed from Firebase and stored inside of our state. We just map over it and print the results on to the page
                //Firebase's value event is firing when you push the new item into your database, and sending back a new snapshot with a list of all of the items currently in your database, which ultimate updates your component through a setState which triggers a re-render and displays the new item on the page
                <ul>
                  {this.state.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>brought by: {item.user}
                        //add a button to our UI with an onClick that calls our removeItem method and passes it the item's ke
                        <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                        </p>
                      </li>
                    )
                  })}
                </ul>
              </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;
