import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({startLogin}) => (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title"> Expensify App </h1>
        <p> Organize Yourself! </p>
        <button className="button" onClick={startLogin}>Login with Google</button>
      </div>  
    </div>
);

// since we want to dispatch startlogin. return implicity obj. and startlogin prop is going to dispatch startlogin action as imported froma above
const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
}); 

export default connect (undefined, mapDispatchToProps)(LoginPage);