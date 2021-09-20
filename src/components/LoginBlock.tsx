import React, {Component, SyntheticEvent} from 'react';
import axios from 'axios';

class LoginBlock extends Component {
  email = "";
  password = "";
  submit = (e: SyntheticEvent) => {
    e.preventDefault();

    var loginSuccess = false;

    axios.post('http://localhost:8000/api/login', {
      email: this.email,
      password: this.password
    }).then(res => {
      console.log(res);
    });

    if (loginSuccess) {

    } else {

    }
  }
  render() {
    return (
      <div>
        <form onSubmit = {this.submit}>
          <h1>Login</h1>
          <label>Email</label><br />
          <input type = "text" id = "email" placeholder = "e.g@com.au" required
           onChange = {e => this.email = e.target.value} /><br /><br />
          <label>Password</label><br />
          <input  type = "password" id = "password" required
           onChange = {e => this.password = e.target.value} /><br /><br />
          <button type = "submit">Sign in</button>
        </form>
      </div>
    );
  }
}

export default LoginBlock;
