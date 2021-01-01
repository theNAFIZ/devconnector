import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import AddPost from '../forms/AddPost';

export const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-promary">Posts</h1>
      <p className="lead">Welcome to the community</p>
      <AddPost />
      <div className="posts">
        {posts.length > 0 ? (
          <Fragment>
            <div className="posts">
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          </Fragment>
        ) : (
          <Fragment>No Posts Found.</Fragment>
        )}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

const mapDispatchToProps = {
  getPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
