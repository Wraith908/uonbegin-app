import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import UniversityServices from './UniversityServices';
import StaffDirectory from './StaffDirectory';
import WeekOneSurvivalPack from './WeekOneSurvivalPack';
import UniversityExpectations from './UniversityExpectations';
import FAQsAndTestimonials from './FAQsAndTestimonials';
import NoMatch from './NoMatch';

class Body extends Component {
  render() {
    return (
      <div>
        <Router>
          <header className = "navbar">
            <nav>
              <Link to = "/" className = "nav-link">University Services</Link>
              <Link to = "/directory" className = "nav-link">Staff Directory</Link>
              <Link to = "/week-one-survival-pack" className = "nav-link">Week 1 Survival Pack</Link>
              <Link to = "/university-expectations" className = "nav-link">What to expect at University</Link>
              <Link to = "/faqs-and-testimonials" className = "nav-link">FAQs and Testionials</Link>
              /*Might be a good idea to add a special login button around here somewhere*/
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
