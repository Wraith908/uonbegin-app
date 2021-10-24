import React from 'react';
import Autosuggest from 'react-autosuggest';
import './label.css';

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: 'Hi'
  },
  {
    name: 'Hello'
  },
  {
    name: 'I need help'
  },
  {
    name: 'Where can I find a map of the University for guiding myself from current location to my destination?'
  },
  {
    name: 'How do I enrol in a course and register for class activities?'
  },
  {
    name: 'How can I check majors and elective courses?'
  },
  {
    name: 'How can I consult with my program advisor? how to contact them?'
  },
  {
   name: 'I lost my student card? How can I get new card?' 
  },
  {
    name:'Where is the library?'
  },
  {
    name:'Is there any university doctor available for consulting my health?'
  },
  {
    name: 'I cannot afford my university fees? Is there any scholarship or university help available?'
  },
  {
    name: ' How do I apply for scholarships?'
  },
  {
    name: 'How do I apply for an Opal Concession card and Transport Entitlement Card?'
  },
  {
    name: 'What support services does the University offer for students?'
  },
  {
    name: 'My classes finish when it is dark, are there any extra safety precautions I can take when heading home?'
  },
  {
    name: 'How to arrange security shuttle pickup? '
  },
  {
    name: 'How do I find out what events are happening on campus?'
  },
  {
    name: 'How do I apply to waive my student visa application fee due to COVID-19?'
  },
  {
    name: 'University room'
  },
  {
    name: 'map'
  },
  {
    name: 'location'
  },
  {
    name: 'guide'
  },
  {
    name: 'enrol'
  },
  {
    name: 'enrolment'
  },
  {
    name: 'timetable'
  },
  {
    name: 'register'
  },
  {
    name: 'classes'
  },
  {
    name: 'major courses'
  },
  {
    name: 'elective courses'
  },
  {
    name: 'find major and elective courses'
  },
  {
    name: 'program advisor'
  },
  {
    name: 'program convenor'
  },
  {
    name: 'contact'
  },
  {
    name: 'meeting'
  },
  {
    name: 'lost'
  },
  {
    name: 'contact'
  },
  {
    name: 'card'
  },
  {
    name: 'new card'
  },
  {
    name: 'new'
  },
  {
    name: 'library'
  }
  ,
  {
    name: 'doctor'
  }
  ,
  {
    name: 'consultant'
  }
  ,
  {
    name: 'hospital'
  }
  ,
  {
    name: 'health'
  },
  {
    name: 'fees'
  },
  {
    name: 'scholarship'
  },
  {
    name: 'hardship'
  },
  {
    name: 'apply'
  },
  {
    name: 'opal card'
  },
  {
    name: 'concession card'
  },
  {
    name: 'transport entitlement card'
  },
  {
    name: 'how'
  },
  {
    name: 'support'
  },
  {
    name: 'university services'
  },
  {
    name: 'security'
  },
  {
    name: 'safety'
  },
  {
    name: 'how security'
  },
  {
    name: 'shuttle'
  },
  {
    name: 'pickup'
  },
  {
    name: 'event'
  },
  {
    name: 'campus'
  },
  {
    name: 'function'
  },
  {
    name: 'visa'
  },
  {
    name: 'apply'
  },
  {
    name: 'covid19'
  },
  {
    name: 'student visa'
  }

];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  if(inputValue == 'x' || inputValue =='X'){
    return languages;
  }
  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.


// Use your imagination to render suggestions.


class Example extends React.Component {
  constructor(props) {
    super(props);


    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }
  renderSuggestion = suggestion => (
    <div >
      {suggestion.name}
    </div>
    
  );
   getSuggestionValue = suggestion => suggestion.name;
  onChange  = (event, { newValue }) => {
    this.setState({
      value: newValue,
      
    });
    this.props.func(event, { newValue });
    // if(newValue != undefined){
    //     this.props.func2(newValue);
    // }
    
  };

 

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a message, suggestion will appear accrodingly',
      value,
      onChange: this.onChange,
      
    };

    // Finally, render it!
    return (
      
      <Autosuggest
     
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default Example;