/*
handles login and logout
state is passed and initialized to empty obj. add prop to that obj if user log in and wipe off when user log off
action is getting dispatched in reducer by from app.js. it contains login and logout dispatched actions.
switch based on action.type 
*/

export default (state = {}, action) => {
   switch (action.type) {
       // return obj with uid when we dispatch the login case
       case 'LOGIN':
           return {
               uid: action.uid
           };
        case 'LOGOUT':
            return {};
        default:
            return state;
   };
};

// now connect reducers to redux store. go to store folder> configureStore.js