import React, {Component} from 'react';

class BasicInfoBlock extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.title: String}</h1>
        <p>{this.props.content}</p>
      </div>
    );
  }
}

export default BasicInfoBlock;
