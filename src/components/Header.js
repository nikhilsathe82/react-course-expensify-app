import React from 'react';
import { NavLink } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <header>
       <h1>Expensify App </h1>
       <NavLink to="/" activeClassName="is-active" exact={true}>Dashboard </NavLink>
       <NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>
       <NavLink to="/help" activeClassName="is-active">Help</NavLink>
       <button onClick={startLogout}>Logout</button>
    </header>
);

/*
with connect we connect mapdispatchto props to header.
in mapdispatchtoprops, we define a startlogout props with call back that dispatches the startlogout func imported from actions/auth
in Header func, we destructure that startlogout props passed from mapdispatchtoprops const to grab the startlogout and in header onClick we call the startlogout
*/

//dispatch startlogout to header and pass props also 
const mapDispatchToProps = (dispatch) => ({
      startLogout: () => dispatch(startLogout())
});

export default connect(undefined,mapDispatchToProps)(Header);