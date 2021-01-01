import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ profile }) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experience</h2>
      {profile.experience.length > 0 ? (
        <Fragment>
          {profile.experience.map((exp) => (
            <div key={exp._id}>
              <h3 className="text-dark">{exp.company}</h3>
              <p>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
                {exp.current ? (
                  'Now'
                ) : (
                  <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                )}
              </p>
              <p>
                <strong>Position: </strong>
                {exp.title}
              </p>
              {exp.description && (
                <p>
                  <strong>Description: </strong>
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </Fragment>
      ) : (
        <p>No experiences found..</p>
      )}
    </div>
  );
};

ProfileExperience.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileExperience;
