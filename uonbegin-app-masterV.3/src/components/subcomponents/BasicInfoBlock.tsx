import React, {Component} from 'react';

class BasicInfoBlock extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default BasicInfoBlock;
