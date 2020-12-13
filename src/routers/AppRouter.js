import React from 'react';
import {Router, BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';

import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const AppRouter = () => (
//regular router does not have history but browserrouter has. so we pass our own history
  <Router history={history}>
   <div>
    <Switch>
     <Route path="/" component={LoginPage} exact={true} />
     <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
     <PrivateRoute path="/create" component={AddExpensePage} />
     <PrivateRoute path="/edit/:id" component={EditExpensePage} />
     <Route path="/help" component={HelpPage} />
     <Route component={NotFoundPage} />
    </Switch>
   </div>
  </Router>

);
export default AppRouter;