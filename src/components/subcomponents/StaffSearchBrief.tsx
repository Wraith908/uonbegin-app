import React, {Component} from 'react';
import { Staff } from '../../models/staff';

const StaffSearchBrief = (props: {staff: Staff, setChosenStaff: (staff: Staff | ((prevVar: Staff) => Staff)) => void}) => {
  /*This is the short version that shows up during a search, multiple of these
  tiles will have to fit on the screen at the same time*/
  return(
    <a onClick = {() => props.setChosenStaff(props.staff)}>
      <div>
        <h3>{props.staff.name}</h3><br />
        <img src = {props.staff.image_url} /><br />
        <p>Contact email: {props.staff.contact_email}</p><br />
        <p>Office Room: {props.staff.office_room}</p>
      </div>
    </a>
  );
}

export default StaffSearchBrief;
