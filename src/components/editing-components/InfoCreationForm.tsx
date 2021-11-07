import React, { SyntheticEvent, useEffect, useState } from 'react';
import axios from 'axios';
import ImageUploadBlock from './ImageUploadBlock';
import { Picture } from '../../models/picture';

const InfoCreationForm = (props: {section_id: number, pictureArray: Picture[]}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [pictureID, setPictureID] = useState(0);
  const [imageStatus, setImageStatus] = useState(0);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('info', {
          title,
          body,
          section_id: props.section_id
      })
    } catch (error) {
      console.log(error);
    }
  }

  const imageBlock = (imageStatus: number) => {
    if (imageStatus === 2) {
      return(
         <ImageUploadBlock pictureID = {pictureID} setPictureID = {setPictureID}/>
      );
    } else if (imageStatus === 3) {
      return(
        <select onChange = {e => setPictureID(parseInt(e.target.value))}>
          {props.pictureArray.map((picture: Picture) => {
            return (
              <option key = {picture.picture_id} value = {picture.picture_id}>{picture.picture_name}</option>
            )
          })}
        </select>
      );
    }
    return(<p>Affirmative</p>);
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
        <label>Would you like to use an image?</label><br />
        <select onChange = {e => setImageStatus(parseInt(e.target.value))}>
          <option value = "1">No</option>
          <option value = "2">Yes, I'd like to upload one</option>
          <option value = "3">Yes, there's one on the database</option>
        </select>
        {imageBlock(imageStatus)}
        <button type = "submit">Submit</button>
      </form>
    </div>
  )
}; export default InfoCreationForm;
