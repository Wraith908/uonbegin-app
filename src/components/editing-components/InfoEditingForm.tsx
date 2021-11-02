import React, {SyntheticEvent, useState} from 'react';
import axios from 'axios';

const InfoEditingForm = (props: {section_id: number}) => {
  const [count, setCount] = useState(0);

  const submit = () => {

  }

  return (
    <div>
      <form onSubmit = {submit}>
        <input type = "text" placeholder = "Header" required />
        <input type = "text" placeholder = "Body of the information block" required />
      </form>
    </div>
  )
}; export default InfoEditingForm;
