import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import UniversityServices from './UniversityServices';
import StaffDirectory from './StaffDirectory';
import WeekOneSurvivalPack from './WeekOneSurvivalPack';
import UniversityExpectations from './UniversityExpectations';
import FAQsAndTestimonials from './FAQsAndTestimonials';
import NoMatch from './NoMatch';
import axios from 'axios';

class Body extends Component {
  render() {
    var editorLoggedIn = false;

    axios.get('httpL//localhost:8000/api/user')
    return (
      <div>
        <Router>
          <header className = "navbar">
            <nav>
              <Link to = "/" className = "nav-link1">University Services</Link>
              <Link to = "/directory" className = "nav-link2">Staff Directory</Link>
              <Link to = "/week-one-survival-pack" className = "nav-link3">Week 1 Survival Pack</Link>
              <Link to = "/university-expectations" className = "nav-link4">What to expect at University</Link>
              <Link to = "/faqs-and-testimonials" className = "nav-link5">FAQs and Testimonials</Link>
              {editorLoggedIn ?
                <Link to = "/logout" className = "logout-link">Logout</Link> :
                <Link to = "/login" className = "login-link">Login</Link>
              }
            </nav>
          </header>
          <Switch>
              <Route exact path = "/">
                <UniversityServices />
              </Route>
              <Route path = "/directory">
                <StaffDirectory />
              </Route>
              <Route path = "/week-one-survival-pack">
                <WeekOneSurvivalPack />
              </Route>
              <Route path = "/university-expectations">
                <UniversityExpectations />
              </Route>
              <Route path = "/faqs-and-testimonials">
                <FAQsAndTestimonials />
              </Route>
              <Route path = "*">
                <NoMatch />
              </Route>
            </Switch>
        </Router>
      </div>
    );
  }
}

export default Body;
