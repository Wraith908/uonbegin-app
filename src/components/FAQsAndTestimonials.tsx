import React, {Component} from 'react';
import BasicInfoBlock from './subcomponents/BasicInfoBlock';

class FAQsAndTestimonials extends Component {
  information = "";
  render() {
    return(
      <div id="FAQsAndTestimonials">
        <h1>FAQs And Testimonials</h1>
        <BasicInfoBlock>
          Does this work?
          How about this?
        </BasicInfoBlock>
      </div>
    );
  }
}

export default FAQsAndTestimonials;
