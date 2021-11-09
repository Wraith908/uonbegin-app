import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import ImageUploadBlock from './ImageUploadBlock';

const InfoCreationForm = (props: {newInfo: boolean, setNewInfo: (newInfo: boolean | ((prevVar: boolean) => boolean)) => void, section_id: number}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [pictureURL, setPictureURL] = useState('');
  const [imageStatus, setImageStatus] = useState(0);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('info', {
          title: title,
          body: body,
          section_id: props.section_id,
          image_url:  pictureURL
      })
      props.setNewInfo(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit = {submit}>
        <label>Head</label><br />
        <input type = "text" onChange = {e => setTitle(e.target.value)}
        placeholder = "Header" required /><br />
        <label>Body</label><br />
        <input type = "text" onChange = {e => setBody(e.target.value)}
        placeholder = "Body of the information block" required /><br />
        <label>Image</label><br />
        {pictureURL === ''?
          <p>No picture</p>:
          <div>
            <p>{pictureURL}</p><button onClick = {() => setPictureURL('')}>Remove picture</button>
          </div>
        }
        <ImageUploadBlock pictureURL = {pictureURL} setPictureURL = {setPictureURL}/>
        <button type = "submit">Submit</button>
      </form>
    </div>
  )
}; export default InfoCreationForm;
