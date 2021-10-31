import React, {Component} from 'react';
import { User } from '../../models/user';

const BasicInfoBlock = (props: {id: number, title: string, body: string, section_id: number, picture_id: number, user: User}) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.body}</p>
    </div>
  );
};

export default BasicInfoBlock;
