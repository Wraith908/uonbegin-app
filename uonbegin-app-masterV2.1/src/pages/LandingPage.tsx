import React, {Component} from 'react';
import Body from '../components/Body';

class LandingPage extends Component {
  render() {
    return(
      <div>
        <Body />
        <footer id = "footer">
            <p>Jacob Neilands: C3303694 | Aaron McCool: C3279449 | Ronit Ronit: C3319077 | Aun Ali: C3216616</p>
            <p>&copy; UONBegin 2021. All Rights Reserved.</p>
        </footer>
      </div>
    );
  }
}

export default LandingPage;
