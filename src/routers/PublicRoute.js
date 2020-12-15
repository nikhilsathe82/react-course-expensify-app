import React from 'react';
import { connect } from 'react-redux'; // bcoz we have to use redux store to know whether user is authenticated
import { Route,Redirect } from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => ( 
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
            <Redirect to="/dashboard" /> 
        ) : (
            <Component {...props} />
        ) 
    )}/>
  
);

// we are not dispatching. but we need to grab values to ensure authentication
const mapStateToProps = (state) => ({
    //we get boolean true if authenticated else boolen false if not authenticated
   isAuthenticated: !!state.auth.uid //if this exists then we are authenticated otherwise not. if not authen then we get 'undefined' and we get uid in string value, so use !! to turn that into boolean false or true respective
});

export default connect(mapStateToProps)(PublicRoute); //export connected version of component