import React, {SyntheticEvent, useState} from 'react';
import axios from 'axios';
import { Picture } from '../../models/picture';
import { User } from '../../models/user';
import { Information } from '../../models/information';
import ImageUploadBlock from './ImageUploadBlock';

const InfoEditingForm = (props: {id: number, title: string, body: string, section_id: number, picture: Picture, user: User, isEditing: boolean, pictureArray: Picture[],
  setIsEditing?: (user: boolean | ((prevVar: boolean) => boolean)) => void}) => {
  const [count, setCount] = useState(0);
  const [imageStatus, setImageStatus] = useState(0);
  const [pictureID, setPictureID] = useState(0);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const {data} = await axios.put(`info/${props.id}`,{
        title: props.title,
        body: props.body
      });
    } catch (error) {
      console.log(error);
    }
  }

  const changeEditStatus = () => {
    if (props.setIsEditing !== undefined && props.isEditing !== undefined) {
      props.setIsEditing(!props.isEditing);
    }
   }

   const checkImageStatus = () => {
     if (imageStatus === 1) {
       return(
         <ImageUploadBlock pictureID = {pictureID} setPictureID = {setPictureID}/>
       );
     } else if (imageStatus === 2) {
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
        <label>Head</label> <button onClick = {changeEditStatus}>View</button><br />
        <input type = "text" placeholder = "Header" defaultValue = {props.title} required /><br />
        <label>Body</label><br />
        <input type = "text" placeholder = "Body of the information block" defaultValue = {props.body} required /><br />
        <label>Would you like to use an image?</label><br />
        <select onChange = {e => setImageStatus(parseInt(e.target.value))}>
          <option value = "0">No</option>
          <option value = "1">Yes, I'd like to upload one</option>
          <option value = "2">Yes, there's one on the database</option>
        </select>
        <button type = "submit">Submit</button>
      </form>
    </div>
  )
}; export default InfoEditingForm;
