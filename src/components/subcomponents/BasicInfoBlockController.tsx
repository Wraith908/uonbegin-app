import React, { useState } from 'react';
import { User } from '../../models/user';
import axios from 'axios';
import { Picture } from '../../models/picture';
import InfoEditingForm from "../editing-components/InfoEditingForm";
import BasicInfoBlock from "./BasicInfoBlock";

const BasicInfoBlock = (props: {key: number, id: number, title: string, body: string,
                        section_id: number, picture: Picture, user: User}) => {
  const [isEditing,setIsEditing] = useState(false);
  const changeEditStatus = () => {
    //I need to change the generic information display block into something else
    setIsEditing(!isEditing);
  }

  const viewDataBlock = () => {

  }

  const editDataBlock = () => {

  }

  return (
    {isEditing ?
      <BasicInfoBlock /> :
      <InfoEditingForm />
    }
  );
};

export default BasicInfoBlock;
