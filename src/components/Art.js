import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

class Art extends Component {
  // constructor() {
  //     super();
  //     this.state = {
  //       currentItem: '',
  //       username: '',
  //       items: []
  //     }
  render() {
    return (
      <div className="art">
        <h1>Art</h1>
        <div className="artColLeft">
          <section className='display-item'>
              <form onSubmit={this.handleSubmit}>
                //onChange event handlers to our inputs, as well as providing them with a value derived from our state (this is called a "controlled input"), like this:
                <input type="text" name="title" placeholder="Title of Street Art" onChange={this.handleChange} value={this.state.username} />
                <input type="text" name="currentPost" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
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
    );
  }
}

export default Art;
