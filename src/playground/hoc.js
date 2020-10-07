// higher order component - a component (HOC) that renders another component
//benefits as below
//reuse code
//render hijacking
//prop manipulation
//abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const requireAuthentication = (WrappedComponent) => { //Wrappedcompoenent is referring to Info comp here
    return (props) => (//this is the higher order component
        <div>
            {props.isAuthenticated?(
                <WrappedComponent {...props}/>
            ):(
                <p>Please login to view info</p> 
            )}
            
        </div>
    );
};
const withAdminWarning = (WrappedComponent) => {  // withAdminWarning is a  regular function that going to get called with the component that we want to wrap
    return (props) => ( // this is the higher order component
    <div>
        {props.isAdmin} && <p>This is private info. do not share</p>}
        <WrappedComponent {...props}/> /*props takes admininfo from .render and we spready it out.*/
    </div>
    );
};

const AdminInfo = withAdminWarning(Info); //call adminwarning with component that i want to wrap
const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info="These are the details" />, document.getElementById('app'));
// flow = we render Admininfo > withAdminWarning (takes props) > render a paragraph with wrappedcomponent which is Info component > displays the content in Info component
ReactDOM.render(<AuthInfo isAuthenticated={true} info="These are the details" />, document.getElementById('app'));