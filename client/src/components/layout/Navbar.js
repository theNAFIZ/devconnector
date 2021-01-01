import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="fas fa-atlas"></i> Developers
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <i className="fas fa-file-invoice"></i> Posts
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i> Dashboard
        </Link>
      </li>
      <li>
        <a onClick={logout} href="">
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="fas fa-atlas"></i> Developers
        </Link>
      </li>
      <li>
        <Link to="/register">
          <i className="fas fa-user-plus"></i> Register
        </Link>
      </li>
      <li>
        <Link to="/login">
          <i className="fas fa-sign-in-alt"></i> Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1 className="text-primary">
        <Link to="/">
          <i className="fas fa-code"></i>
          <span> DevConnector</span>
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
