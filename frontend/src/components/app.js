import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import ProfileFormContainer from './profile/profile_container'

// Room component 
import Room from "./chatroom/room"

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <Route path="/room/:roomID" component={Room}/>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/profile" component={ProfileFormContainer} />
    </Switch>
  </div>
);

export default App;