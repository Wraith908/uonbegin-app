import React, {SyntheticEvent, useState} from 'react';
import axios from 'axios';
import { Picture } from '../../models/picture';
import { User } from '../../models/user';

const InfoEditingForm = (props: {id: number, title: string, body: string, section_id: number,
  picture: Picture, user: User, isEditing: boolean, setIsEditing?: (user: boolean | ((prevVar: boolean) => boolean)) => void}) => {
  const [count, setCount] = useState(0);

  const submit = () => {

  }

  const changeEditStatus = () => {
    if (props.setIsEditing !== undefined && props.isEditing !== undefined) {
      props.setIsEditing(!props.isEditing);
    }
   }

  return (
    <div>
      <form onSubmit = {submit}> <button onClick = {changeEditStatus}>View</button>
        <input type = "text" placeholder = "Header" required />
        <input type = "text" placeholder = "Body of the information block" required />
        <input type = "file" />
      </form>
    </div>
  )
}; export default InfoEditingForm;
