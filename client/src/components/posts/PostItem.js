import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLikes, deletePost, removeLikes } from '../../actions/post';

function PostItem({
  addLikes,
  removeLikes,
  deletePost,
  auth,
  history,
  post: { _id, text, name, avatar, user, likes, comments, date }
}) {
  return (
    <Fragment>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img className="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY-MM-DD">{date}</Moment>
          </p>

          <button
            onClick={(e) => addLikes(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-up"></i>
            {likes.length > 0 && <span> {likes.length}</span>}
          </button>
          <button
            onClick={(e) => removeLikes(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down"></i>
          </button>

          <Link to={`/post/${_id}`} className="btn btn-primary">
            Discussion{' '}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={(e) => deletePost(_id, history)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    </Fragment>
  );
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLikes, removeLikes, deletePost })(
  withRouter(PostItem)
);
