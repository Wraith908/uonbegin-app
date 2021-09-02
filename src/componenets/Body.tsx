import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Body extends Component {
  render() {
    return (
      <div>
        <header className = "navbar">
          <nav>
            <Link to = "/" className = "nav-link"></Link>
            <Link to = "/directory" className = "nav-link"></Link>
            <Link to = "/week-one-survival-pack" className = "nav-link"></Link>
            <Link to = "/university-expectations" className = "nav-link"></Link>
            <Link to = "/faqs-and-testimonials" className = "nav-link"></Link>
          </nav>
        </header>
        <Switch>
            <Route exact path = "/">
              //<UniversityServices />
            </Route>
            <Route path = "/directory">
              //<StaffDirectory />
            </Route>
            <Route path = "/week-one-survival-pack">
              //<WeekOneSurvivalPack />
            </Route>
            <Route path = "/university-expectations">
              //<UniversityExpectations />
            </Route>
            <Route path = "/faqs-and-testimonials">
              //<FAQsAndTestimonials />
            </Route>
          </Switch>
      </div>
    );
  }
}

export default Nav;
