import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import BasicInfoBlock from './subcomponents/BasicInfoBlock';
import { Information } from '../models/information';
import { User } from '../models/user';

const InfoContainer = (props: {title: string, section_id: number, user: User}) => {
  const [information,setInformation] = useState([]);
  const [newInformationBlocks, setNewInformationBlocks] = useState([]);

  useEffect(() => {
    (
      async () => {
        try {
          const {data} = await axios.get('info');

          setInformation(data.data);
        } catch (error) {
          console.log(error);
        }
      }
    )()
  },[]);

  return(
    <div id={props.title}>
      <h1>{props.title}</h1>
      {props.section_id}
      {information.map((info: Information) => {
        return (
            <BasicInfoBlock id = {info.id} title = {info.title} body = {info.body}
            section_id = {info.section_id} picture_id = {info.picture_id} user = {props.user} />
        );
      })}
    </div>
  );
}

export default InfoContainer;
