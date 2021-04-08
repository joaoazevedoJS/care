import React, { FC } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import ConfirmationCode from '../pages/ConfirmationCode';
import ImportCSV from '../pages/ImportCSV';
import Appointments from '../pages/Appointments';

const Routes: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/dashboard" exact component={Dashboard} isPrivate />
      <Route
        path="/appointments/:service_id"
        exact
        component={Appointments}
        isPrivate
      />
      <Route
        path="/confirmation_code"
        exact
        component={ConfirmationCode}
        isPrivate
      />
      <Route path="/csv" exact component={ImportCSV} isPrivate />
      <Route path="**" component={SignIn} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
