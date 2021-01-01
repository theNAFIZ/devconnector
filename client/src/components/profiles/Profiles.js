import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getAllProfiles } from '../../actions/profile';
import { ProfileItem } from './ProfileItem';

export const Profiles = ({
  getAllProfiles,
  profile: { profiles, loading }
}) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">Browse and connect with developers</p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No Profiles found..</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

const mapDispatchToProps = {
  getAllProfiles
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
