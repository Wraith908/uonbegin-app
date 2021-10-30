import React from 'react';

const ErrorPage = (props: {errorMessage: string}) => {
  return (
    <div>
      <h1>Error</h1>
      {props.errorMessage !== undefined ?
        <p>{props.errorMessage}</p> :
        <p>error unknown</p> }
    </div>
  )
}; export default ErrorPage;
