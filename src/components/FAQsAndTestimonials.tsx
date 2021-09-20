import React, {Component} from 'react';
import BasicInfoBlock from './subcomponents/BasicInfoBlock';

class FAQsAndTestimonials extends Component {
  information = "";
  render() {
    return(
      <div>
        <h1>FAQsAndTestimonials</h1>
        <BasicInfoBlock>
          Does this work?
          How about this?
        </BasicInfoBlock>
      </div>
    );
  }
}

export default FAQsAndTestimonials;
