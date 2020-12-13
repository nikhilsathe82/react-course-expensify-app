import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({startLogin}) => (
    <div>
        <button onClick={startLogin}>Login</button>
    </div>
);

// since we want to dispatch startlogin. return implicity obj. and startlogin prop is going to dispatch startlogin action as imported froma above
const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
}); 

export default connect (undefined, mapDispatchToProps)(LoginPage);