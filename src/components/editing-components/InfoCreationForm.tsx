import React, {SyntheticEvent, useState} from 'react';
import axios from 'axios';

const InfoCreationForm = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      Count {count} <br />
      <input type ="number" onChange = {e => setCount(parseInt(e.target.value))}/>
    </div>
  )
}; export default InfoCreationForm;
