import { firebase,googleAuthProvider } from '../firebase/firebase'

//login action object setup
export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLogin = () => {
 return () => {
     // i want to sign in into one of my accounts and going to use popup to login using google acc
    return firebase.auth().signInWithPopup(googleAuthProvider);

 };
};

export const logout = () => ({
    type: 'LOGOUT'
});
export const startLogout = () => {
    return () => {
        // to signout of google.
       return firebase.auth().signOut();
       
    };
   };

// now connect reducers to redux store. go to store folder> configureStore.js