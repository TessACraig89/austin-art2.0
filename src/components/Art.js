import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

class About extends Component {
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
              <div className="wrapper">
                <ul>
                  {this.state.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <h2>{item.title}</h2>
                        <p>Location: {item.location}
                          <button onClick={() => this.removeItem(item.id)}>Unfavorite</button>
                          <button onClick={() => this.addItem(item.id)}>Favorite</button>
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

export default About;
