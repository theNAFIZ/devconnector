import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DeleteAccount from './DeleteAccount';

const Dashboard = ({
  auth: { user, loading },
  getCurrentProfile,
  profile: { profile }
}) => {
  useEffect(() => {
    if (user) getCurrentProfile();
  }, [user]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>Welcome {user && user.name}</h1>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <DeleteAccount id={user._id} />
        </Fragment>
      ) : (
        <Fragment>
          <p>You don't have a profile.</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
