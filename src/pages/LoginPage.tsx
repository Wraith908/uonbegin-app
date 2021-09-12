import React, {Component} from 'react';

class LoginPage extends Component {
  render() {
    return (
      <div>
        <form>
          <h1>Login</h1>
          <label>Username</label>
          <input />
          <label>Password</label>
          <input />
          <button>Sign in</button>
        </form>
      </div>
    );
  }
}

export default LoginPage;
