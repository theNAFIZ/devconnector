import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from '../routing/PrivateRoute';
import CreateProfile from '../forms/CreateProfile';
import Profiles from '../profiles/Profiles';
import Profile from '../profiles/Profile';
import EditProfile from '../forms/EditProfile';
import AddEducation from '../forms/AddEducation';
import AddExperience from '../forms/AddExperience';
import Posts from '../posts/Posts';
import Post from '../posts/Post';

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/post/:id" component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
