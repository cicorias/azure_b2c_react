// @flow
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'found';
import type {User} from './redux/auth/types';

type Props = {
  logout: () => void,
  user: User,
};

export default class App extends Component {
  props: Props;

  render() {
    return (
      <div className="App">
        <header className="nav">
          <Link to="/">Home</Link>
          <Link to="/story">Story</Link>
          <div className="logout">
            <span>
              Welcome {this.props.user.name}
            </span>
            <button onClick={this.props.logout}>
              Log out
            </button>
          </div>
        </header>
        <div>
          {this.props.children}
        </div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
