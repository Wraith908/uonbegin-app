import React from 'react';
import axios from 'axios';
import { Picture } from '../../models/picture';
import { User } from '../../models/user';

const BasicInfoBlock = (props: {id: number, title: string, body: string, section_id: number, picture: Picture,
   user: User, isEditing: boolean, setIsEditing?: (user: boolean | ((prevVar: boolean) => boolean)) => void}) => {

  const changeEditStatus = () => {
    if (props.setIsEditing !== undefined && props.isEditing !== undefined) {
      props.setIsEditing(!props.isEditing);
    }
   }

   const deleteInformation = async () => {
     if (window.confirm('Are you sure you want to delete this?')) {
       await axios.delete(`info/${props.id}`);
     }
   }

  return (
    <div>
      <h2>{props.title}</h2>
      {props.user.id !== 0 && <button onClick = {changeEditStatus}>Edit</button>}
      {props.user.id !== 0 && <button onClick = {deleteInformation}>Delete</button>}<br />
      <p>{props.body}</p>
      {props.picture !== undefined && props.picture !== null && <img src = {props.picture.pictureURL} />}
    </div>
  );
}; export default BasicInfoBlock;
