import React from 'react';
import { NavLink, Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';


export const Header = ({ startLogout }) => (
    <header className="header">
       <div className="content-container">
           <div className="header__content">
                <Link className="header__title" to="/dashboard">
                    <h1>Expensify</h1>
                </Link>
                <Link to="/help">Help</Link>
                <button className="button button--link" onClick={startLogout}>Logout</button>
            </div>
       </div>
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