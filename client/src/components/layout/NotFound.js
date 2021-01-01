import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <Fragment>
      <h3 className="x-large text-primary ">
        <i className="fas fa-exclamation-circle"></i> Page Not found
      </h3>
      <p className="large">The requested page was not found.</p>
    </Fragment>
  );
};

export default NotFound;
