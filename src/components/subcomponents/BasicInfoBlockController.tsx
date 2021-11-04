import React, { useEffect, useState } from 'react';
import { User } from '../../models/user';
import axios from 'axios';
import { Picture } from '../../models/picture';
import InfoEditingForm from "../editing-components/InfoEditingForm";
import BasicInfoBlock from "./BasicInfoBlock";

const BasicInfoBlockController = (props: {key: number, id: number, title: string, body: string,
                        section_id: number, picture: Picture, user: User, pictureArray: Picture[]}) => {

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ?
        <InfoEditingForm id = {props.id} title = {props.title} body = {props.body} section_id = {props.section_id}
        picture = {props.picture} user = {props.user} isEditing= {isEditing} setIsEditing = {setIsEditing} pictureArray = {props.pictureArray}/> :
        <BasicInfoBlock id = {props.id} title = {props.title} body = {props.body} section_id = {props.section_id}
        picture = {props.picture} user = {props.user} isEditing= {isEditing} setIsEditing = {setIsEditing}/>
      }
    </div>
  );
};

export default BasicInfoBlockController;
