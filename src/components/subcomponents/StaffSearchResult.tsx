import React, {Component} from 'react';
import { Staff } from '../../models/staff';

const StaffSearchResults = (props: {staff: Staff}) => {
  /*This is the long version that shows up after the user makes a selection*/
  return(
    <div>
      <h3>{props.staff.name}</h3>
      <p>{props.staff.about}</p>
      <p>Contact Information:
      <ul>
        <li>Contact Email {props.staff.contact_email}</li>
        <li>Contact Phone {props.staff.contact_phone}</li>
        <li>Contact Mobile {props.staff.contact_mobile}</li>
        <li>Contact Fax {props.staff.contact_fax}</li>
      </ul>
      </p>
      <p>Focus Area and office:
      <ul>
        <li>Focus Area {props.staff.focus_area}</li>
        <li>Office Room {props.staff.office_room}</li>
        <li>Office Building {props.staff.office_building}</li>
        <li>Office Location {props.staff.office_location}</li>
      </ul>
      </p>
      <img src = {props.staff.picture.pictureURL} />
    </div>
  );
}

export default StaffSearchResults;
