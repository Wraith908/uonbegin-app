import React, { useEffect, useState } from 'react';
import { User } from '../../models/user';
import axios from 'axios';
import { Picture } from '../../models/picture';

const BasicInfoBlock = (props: {key: number, id: number, title: string, body: string,
                        section_id: number, picture: Picture, user: User}) => {

  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.body}</p>
      {props.picture !== undefined && <img src = {props.picture.picture_url} />}
    </div>
  );
};

export default BasicInfoBlock;
