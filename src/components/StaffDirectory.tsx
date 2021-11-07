import React, { useEffect, useState } from 'react';
import { Staff } from '../models/staff';
import { User } from '../models/user';
import StaffSearchBrief from './subcomponents/StaffSearchBrief';
import StaffSearchResults from './subcomponents/StaffSearchResult';
import axios from 'axios';

const StaffDirectory = (props: {user: User}) => {
  const [staffList,setStaffList] = useState([]);
  const [chosenStaff, setChosenStaff] = useState(new Staff);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (
      async () => {
        try {
          const {data} = await axios.get('staff');
          setStaffList(data.data);
          setLastPage(data.meta.last_page);
        } catch (error) {
          console.log(error);
        }
      }
    )()
  },[page]);

  const next = () => {
    if (page < lastPage) {
      setPage(page + 1);
    }
  }

  const prev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  }

  return(
    <div id="staffDirectory">
      <div>
        {/*This-is-gonna-be-the-search-bar*/

        /*This-is-gonna-be-the-results-list*/}
        <h1>Staff Directory</h1>
        {staffList.map((staff: Staff) => {
          return(
            <StaffSearchBrief key = {staff.id} staff = {staff} setChosenStaff = {setChosenStaff}/>
          );
        })}
        <button onClick = {prev}>Prev</button>
        <button onClick = {next}>Next</button>
      </div>
      <div>
        {/*This-is-gonna-be-the-section-that-shows-the-chosen-result*/}
        {chosenStaff.id !== 0 && <StaffSearchResults staff = {chosenStaff} />}
      </div>
    </div>
  );
}

export default StaffDirectory;
