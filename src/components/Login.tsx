import React, {SyntheticEvent, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {User} from '../models/user';
import axios from 'axios';

const Login = (props: { user: User, setUser?: (user: User | ((prevVar: User) => User)) => void }) => {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const {data} = await axios.post('login', {
        email,
        password
      });
      if (props.setUser !== undefined) {
        props.setUser(data);
      }
    } catch (error) {
      console.log(e);
    }
    if (props.user !== undefined && props.user.id !== 0) {
      //this means the login was successful
      setRedirect(true);
    } else {
      alert("Your login was unsuccessful, please try again");
    }
  }

  if (redirect) {
    return <Redirect to ={'/'}/>
  }
  return (
    <div>
      <form onSubmit = {submit}>
        <label>Email</label><br/>
        <input type = "email" placeholder = "example@example.com" required
          onChange = {e => setEmail(e.target.value)}/><br />
        <label>Password</label><br/>
        <input type = "password" required
          onChange = {e => setPassword(e.target.value)}/><br />
        <button type = "submit">Sign In</button>
      </form>
    </div>
  )
};

export default Login;
