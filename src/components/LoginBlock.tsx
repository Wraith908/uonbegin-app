import React, {Component, SyntheticEvent} from 'react';
import axios from 'axios';

class LoginPage extends Component {
  email = "";
  password = "";

  submit = (e: SyntheticEvent) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/login', {
      email: this.email,
      password: this.password
    });
  }
  render() {
    return (
      <div>
        <form>
          <h1>Login</h1>
          <label>Email</label>
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
