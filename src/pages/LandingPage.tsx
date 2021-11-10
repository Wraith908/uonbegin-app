import React, {Component} from 'react';
import Body from '../components/Body';

class LandingPage extends Component {
  render() {
    return(
      <div>
        <Body />
        <footer id = "footer">
        <h3>Questions? Concerns?</h3>
            <h4>Contact us via email, using our student numbers followed by "@uon.edu.au" <br /><i>OR</i><br />Get in touch with AskUON at: https://askuon.newcastle.edu.au/, or phone 0249215000</h4>
            <h3>Jacob Neilands: C3303694 | Aaron McCool: C3279449 | Ronit Ronit: C3319077 | Aun Ali: C3216616</h3>
            <p>&copy; UONBegin 2021. All Rights Reserved.</p>
        </footer>
      </div>
    );
  }
}

export default LandingPage;
