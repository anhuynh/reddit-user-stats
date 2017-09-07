import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

import UserInput from './components/UserInput';
import Overview from './components/Overview';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      username: '',
      ...DEFAULT_STATE
    };
  }

  fetchData = (username) => {
    this.setState({ username, ...DEFAULT_STATE });
    document.title = `/u/${username} - Reddit User Stats`;

    this.fetchAbout(username);
    this.fetchHistory(username, 'comments');
    this.fetchHistory(username, 'submitted');
  }

  fetchAbout = (username) => {
    axios.get(`https://www.reddit.com/user/${username}/about/.json`)
      .then(res => {
        this.setState({about: res.data.data});
      }).catch(res => {
        this.setState({notFound: true});
      });
  }

  fetchHistory = (username, type, after = '') => { // fetch all comments and submissions
    axios.get(`https://www.reddit.com/user/${username}/${type}.json?limit=100&after=${after}`)
      .then(res => {
        let data = res.data.data.children;

        if (data.length === 0) {
          this.setState({
            fetched: { ...this.state.fetched, [type]: true }
          });
          return;
        }

        this.setState({
          [type]: this.state[type].concat(data)
        });

        if (data.length === 100) { // reddit api limits single listings to 100 items
          this.fetchHistory(username, type, data[99].data.name); // recursively fetch more items
        }

        this.setState({
          fetched: { ...this.state.fetched, [type]: true }
        });
      }).catch(res => {
        this.setState({notFound: true});
      });
  }

  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Reddit User Stats</h2>
          <UserInput onSubmit={this.fetchData} />
        </div>
        {this.state.fetched.comments && this.state.fetched.submitted &&
          <Overview about={this.state.about} comments={this.state.comments} submitted={this.state.submitted} />
        }
      </div>
    );
  }
}

const DEFAULT_STATE = {
  about: {},
  comments: [],
  submitted: [],
  fetched: {
    comments: false,
    submitted: false
  },
  notFound: false
};

export default App;
