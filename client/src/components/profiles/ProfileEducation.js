import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ profile }) => {
  return (
    <div>
      <div className="profile-edu bg-white p-2">
        <h2 className="text-primary">Education</h2>
        {profile.education.length > 0 ? (
          <Fragment>
            {profile.education.map((edu) => (
              <div key={edu._id}>
                <h3>{edu.school}</h3>
                <p>
                  <Moment format="YYYY-MM-DD">{edu.from}</Moment> -{' '}
                  {edu.current ? (
                    'Now'
                  ) : (
                    <Moment format="YYYY-MM-DD">{edu.to}</Moment>
                  )}
                </p>
                <p>
                  <strong>Degree: </strong>
                  {edu.degree}
                </p>
                <p>
                  <strong>Field Of Study: </strong>
                  {edu.fieldofstudy}
                </p>
                {edu.description && (
                  <p>
                    <strong>Description: </strong>
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </Fragment>
        ) : (
          <p>No Education found..</p>
        )}
      </div>
    </div>
  );
};

ProfileEducation.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileEducation;
