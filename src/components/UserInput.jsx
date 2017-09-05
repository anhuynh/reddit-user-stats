import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserInput extends Component {
  constructor (props) {
    super(props);

    this.state = {
      username: '',
      invalidUser: false
    };
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && this.state.username) this.handleSubmit();
  }

  handleChange = (e) => {
    this.setState({username: e.target.value});
  }

  handleSubmit = () => {
    if (/[^a-zA-Z0-9_-]/.test(this.state.username)) {
      this.setState({invalidUser: true});
      return;
    }

    this.setState({invalidUser: false});
    this.props.onSubmit(this.state.username);
  }

  render () {
    return (
      <div>
        <div>
          <input type='text' placeholder='Username' value={this.state.username}
            onKeyPress={this.handleKeyPress} onChange={this.handleChange} />
          <button onClick={this.handleSubmit} disabled={!this.state.username}>Search</button>
        </div>
        {this.state.invalidUser &&
          <span>Invalid username</span>
        }
      </div>
    );
  }
}

UserInput.propTypes = {
  onSubmit: PropTypes.func
};

export default UserInput;
