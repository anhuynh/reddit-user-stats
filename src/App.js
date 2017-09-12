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
      loading: false,
      ...DEFAULT_STATE
    };
  }

  fetchData = (username) => {
    // reset data
    this.setState({
      username,
      loading: true,
      ...DEFAULT_STATE
    });
    document.title = `Reddit User Stats`;

    this.fetchAbout(username);
    this.fetchHistory(username, 'comments');
    this.fetchHistory(username, 'submitted');
  }

  fetchAbout = (username) => {
    axios.get(`https://www.reddit.com/user/${username}/about/.json`)
      .then(res => {
        this.setState({ about: res.data.data });
        document.title = `/u/${res.data.data.name} - Reddit User Stats`;
      }).catch(err => {
        if (err.response.status === 404) {
          this.setState({
            notFound: true,
            loading: false
          });
        } else {
          this.setState({
            otherError: {
              error: err.response.data.error,
              message: err.response.data.message
            },
            loading: false
          });
        }
      });
  }

  fetchHistory = (username, type, after = '') => { // fetch all comments and submissions
    axios.get(`https://www.reddit.com/user/${username}/${type}.json?limit=100&after=${after}`)
      .then(res => {
        let data = res.data.data.children;
        let allDataFetched = true;

        this.setState({
          [type]: this.state[type].concat(data)
        });

        if (data.length === 100) { // reddit api limits single listings to 100 items
          this.fetchHistory(username, type, data[99].data.name); // recursively fetch more items
          allDataFetched = false;
        }

        if (allDataFetched) {
          this.setState({
            fetched: { ...this.state.fetched, [type]: true }
          });

          if (this.state.fetched.comments && this.state.fetched.submitted) this.setState({ loading: false });
        }
      }).catch(err => {
        if (err.response.status !== 404) {
          this.setState({
            otherError: {
              error: err.response.data.error,
              message: err.response.data.message
            },
            loading: false
          });
        }
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
        {this.state.loading &&
          <div className='spinner'>
            <div className='double-bounce1' />
            <div className='double-bounce2' />
          </div>
        }
        {this.state.notFound &&
          <span className='error'>{`/u/${this.state.username} not found.`}</span>
        }
        {this.state.otherError &&
          <span className='error'>{`${this.state.otherError.error}: ${this.state.otherError.message}`}</span>
        }
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
  notFound: false,
  otherError: undefined
};

export default App;
