import React, { useEffect, useState } from 'react';
import { User } from '../models/user';

const StaffDirectory = (props: {user: User}) => {
  return(
    <div id="staffDirectory">
      <div>
        {/*This-is-gonna-be-the-search-bar*/

        /*This-is-gonna-be-the-results-list*/}
        <h1>Staff Directory</h1>

      </div>
      <div>
        {/*This-is-gonna-be-the-section-that-shows-the-chosen-result*/}
        <p>Testing</p>
      </div>
    </div>
  );
}

export default StaffDirectory;
