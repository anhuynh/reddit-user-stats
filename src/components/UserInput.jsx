import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../App.css';

class UserInput extends Component {
  constructor (props) {
    super(props);

    this.state = {
      username: '',
      error: ''
    };
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handleSubmit = () => {
    if (!this.state.username) {
      this.setState({ error: 'Oops! You forgot to enter a username.' });
      return;
    } else if (/[^a-zA-Z0-9_-]/.test(this.state.username)) {
      this.setState({ error: 'Oops! You typed in an invalid username.' });
      return;
    }

    this.setState({ error: '' });
    this.props.onSubmit(this.state.username);
  }

  render () {
    return (
      <div className='userInput'>
        <div>
          <div className='pre-input'>
            <span>/u/</span>
          </div>
          <input type='text' placeholder='Username' value={this.state.username}
            onKeyPress={this.handleKeyPress} onChange={this.handleChange} />
          <button onClick={this.handleSubmit}>Search</button>
        </div>
        {this.state.error &&
          <span className='error'>{this.state.error}</span>
        }
      </div>
    );
  }
}

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default UserInput;
