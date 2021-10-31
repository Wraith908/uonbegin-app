import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import BasicInfoBlock from './subcomponents/BasicInfoBlock';
import { Information } from '../models/information';
import { User } from '../models/user';

const InfoContainer = (props: {title: string, section_id: number, user: User}) => {
  const [informationSet,setInformation] = useState([]);

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
      {informationSet.map((info: Information) => {
        if (info.section_id === props.section_id) {
          return (
              <BasicInfoBlock key = {info.id} id = {info.id} title = {info.title} body = {info.body}
              section_id = {info.section_id} picture_url = {info.picture.pictureURL} user = {props.user} />
          );
        }
      })}
    </div>
  );
}

export default InfoContainer;
