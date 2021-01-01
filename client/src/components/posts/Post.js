import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';
import {
  getPost,
  deletePost,
  addComment,
  removeComment
} from '../../actions/post';

export const Post = ({
  addComment,
  removeComment,
  getPost,
  deletePost,
  history,
  post: { post, postloading },
  auth,
  match
}) => {
  useEffect(async () => {
    getPost(match.params.id);
  }, []);

  const [commentsDisplay, togglecommentsDisplay] = useState(false);
  const [formData, setFormData] = useState('');
  return (
    <Fragment>
      {postloading ? (
        <Spinner />
      ) : (
        <Fragment>
          {!post && <p>Null value</p>}
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${post.user}`}>
                <img className="round-img" src={post.avatar} alt="" />
                <h4>{post.name}</h4>
              </Link>
            </div>
            <div>
              <p className="my-1">{post.text}</p>
              <p className="post-date">
                Posted on <Moment format="YYYY-MM-DD">{post.date}</Moment>
              </p>
              {!auth.loading && post.user === auth.user._id && (
                <button
                  onClick={async (e) => deletePost(post._id, history, true)}
                  type="button"
                  className="btn btn-danger"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>

          <div className="post-form">
            <div className="bg-primary p">Leave A Comment</div>
            <form
              className="form my-1"
              onSubmit={async (e) => {
                e.preventDefault();
                addComment(post._id, { text: formData });
                setFormData('');
              }}
            >
              <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Comment on this post"
                required
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
              ></textarea>
              <input
                type="submit"
                className="btn btn-success my-1"
                value="Submit"
              />
            </form>
          </div>

          <button
            className="btn btn-dark"
            onClick={(e) => togglecommentsDisplay(!commentsDisplay)}
          >
            {commentsDisplay ? (
              <span>
                <i className="fas fa-angle-up"></i> Hide
              </span>
            ) : (
              <span>
                <i className="fas fa-angle-down"></i> Show
              </span>
            )}{' '}
            Comments <span className="my-2">({post.comments.length})</span>
          </button>
          {commentsDisplay &&
            (post.comments.length > 0 ? (
              <div className="comments">
                {post.comments.map((comment) => (
                  <div className="post bg-white p-1 my-1" key={comment._id}>
                    <div>
                      <Link to={`/profile/${comment.user}`}>
                        <img
                          className="round-img"
                          src={comment.avatar}
                          alt=""
                        />
                        <h4>{comment.name}</h4>
                      </Link>
                    </div>
                    <div>
                      <p className="my-1">{comment.text}</p>
                      <p className="post-date">
                        Posted on <Moment fromNow>{comment.date}</Moment>
                      </p>
                      {!auth.loading && comment.user === auth.user._id && (
                        <button
                          onClick={async (e) =>
                            removeComment(post._id, comment._id)
                          }
                          type="button"
                          className="btn btn-danger"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No comments found for this post.</p>
            ))}
        </Fragment>
      )}
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
});

const mapDispatchToProps = {
  getPost,
  deletePost,
  addComment,
  removeComment
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
