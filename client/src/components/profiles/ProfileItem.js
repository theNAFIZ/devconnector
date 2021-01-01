import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <div className="profile bg-light">
      <img className="round-img" src={avatar} />
      <div>
        <h1>{name}</h1>
        <p>
          {status} {company && <span>at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        <li>
          <h3>Skills</h3>
        </li>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fa fa-check"></i>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileItem);
