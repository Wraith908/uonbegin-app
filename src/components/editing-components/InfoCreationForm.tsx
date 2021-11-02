import React, {SyntheticEvent, useState} from 'react';
import axios from 'axios';

const InfoCreationForm = (props: {section_id: number}) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const {data} = await axios.post('info', {
          title,
          body,
          section_id: props.section_id
      })
    } catch (error) {
      console.log(e);
    }
  }

  return (
    <div>
      <form onSubmit = {submit}>
        <input type = "text" placeholder = "Header" required />
        <input type = "text" placeholder = "Body of the information block" required />
      </form>
    </div>
  )
}; export default InfoCreationForm;
