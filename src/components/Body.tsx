import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import StaffDirectory from './StaffDirectory';
import InfoContainer from './InfoContainer';
import Login from './Login';
import Chatbot from './webbot/chat-bot';
import NoMatch from './NoMatch';
import { User } from '../models/user';

const Body = () => {
  const [user, setUser] = useState(new User());

  const logout = () => {
    axios.post('logout').then(response => response);
    setUser(new User());
  }

  return (
    <div>
      <Router>
        <header className = "navbar">
          <nav>
            <img src = "logo.png" className = "logo" />
            <Link to = "/" className = "nav-link1">University Services</Link>
            <Link to = "/directory" className = "nav-link2">Staff Directory</Link>
            <Link to = "/week-one-survival-pack" className = "nav-link3">Week 1 Survival Pack</Link>
            <Link to = "/university-expectations" className = "nav-link4">What to expect at University</Link>
            <Link to = "/faqs-and-testimonials" className = "nav-link5">FAQs and Testimonials</Link>
            <Link to = "/chatbot" className = "nav-link6">Chatbot</Link>
            {user.id === 0 ?
              <Link to = "/login" className = "login-link">Login</Link> :
              <Link to = "/" onClick = {logout} className = "login-link">Logout</Link>
            }
          </nav>
        </header>
        <Switch>
            <Route exact path = "/">
              <InfoContainer title = "University Services" section_id = {1} user = {user} />
              <InfoContainer title = "Important Places" section_id = {5} user = {user} />
            </Route>
            <Route path = "/directory">
              <StaffDirectory user = {user} />
            </Route>
            <Route path = "/week-one-survival-pack">
              <InfoContainer title = "Week One Survival Pack" section_id = {2} user = {user} />
            </Route>
            <Route path = "/university-expectations">
              <InfoContainer title = "University Expectations" section_id = {3} user = {user} />
            </Route>
            <Route path = "/faqs-and-testimonials">
              <InfoContainer title = "Frequently Asked Questions" section_id = {4} user = {user} />
              <InfoContainer title = "Student Testimonials" section_id = {6} user = {user} />
            </Route>
            <Route path = "/login">
              <Login user = {user} setUser = {setUser}/>
            </Route>
            <Route path = "/chatbot">
              <Chatbot />
            </Route>
            <Route path = "*">
              <NoMatch />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default Body;
