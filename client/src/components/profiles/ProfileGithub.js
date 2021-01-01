import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ username, repos, getGithubRepos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);
  return (
    <div className="profile-github">
      {repos.length > 0 ? (
        <Fragment>
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>
          {repos.map((repo) => (
            <div className="repo bg-white p-1 my-1" key={repo.id}>
              <div>
                <h4>
                  <a
                    href={repo.svn_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </h4>
                {repo.description && <p>{repo.description}</p>}
                <p className="my-2">Language: {repo.language}</p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">
                    Stars: {repo.stargazers_count}
                  </li>
                  <li className="badge badge-dark">
                    Watchers: {repo.watchers_count}
                  </li>
                  <li className="badge badge-light">Forks: {repo.forks}</li>
                </ul>
              </div>
            </div>
          ))}
        </Fragment>
      ) : (
        <p>No repos found for user: {username}</p>
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos
});

const mapDispatchToProps = {
  getGithubRepos
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileGithub);
