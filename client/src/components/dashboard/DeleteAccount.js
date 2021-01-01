import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { deleteAccount } from '../../actions/profile';
import { connect } from 'react-redux';

function DeleteAccount({ id, deleteAccount }) {
  const [formData, setFormData] = useState({
    password: ''
  });
  const { password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    setShowPopup(false);
    deleteAccount(id, password);
  };
  const [showPopup, setShowPopup] = useState(false);
  return (
    <Fragment>
      <div className="my-2">
        <button onClick={() => setShowPopup(true)} className="btn btn-danger">
          Delete Account
        </button>
      </div>
      {showPopup && (
        <Fragment>
          <div className="modal-content container">
            <div className="close">
              <p type="button" onClick={() => setShowPopup(false)}>
                +
              </p>
            </div>
            <h2 className="lead">
              Are you sure to delete the account? <br />
            </h2>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <label>Enter your password below to confirm:</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <input type="submit" className="btn btn-danger" value="Confirm" />
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

DeleteAccount.propTypes = {
  id: PropTypes.string.isRequired,
  deleteAccount: PropTypes.func
};

export default connect(null, { deleteAccount })(DeleteAccount);
