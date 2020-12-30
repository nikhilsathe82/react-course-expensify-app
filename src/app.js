//import './utils.js';
//import subtract, { square,multiply } from './utils.js'; //def exp have to be put outside of {}.you can put any different name for default exp. but it takes same default exp from utils

import React from 'react';
import  ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; //provider allows to provide store to all components that make up our application
import AppRouter, { history } from './routers/AppRouter';
import configureStore from "./store/configureStore";
import { startSetExpenses } from './actions/expenses';
import { login, logout} from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';


const store = configureStore(); //gets its return value from configurestore() and get access to store.dispatch, store.getState. store.subscribe

// store.dispatch(addExpense({ description: 'water bill',amount:3343 }));
// store.dispatch(addExpense({ description: 'gas bill',createdAt:1000 }));
// store.dispatch(addExpense({ description: 'Rent',amount:8500 }));
// store.dispatch(setTextFilter('water'));

// setTimeout(() =>{
//    store.dispatch(setTextFilter("bill"));
// },3000);

// const state = store.getState();
// const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
// console.log(visibleExpenses);

//below we have to specify the store that we have share with rest of application. we have to set equal to redux store
const jsx = (
  <Provider store={store}> 
      <AppRouter />
  </Provider>
);

//if user is already in applicaiton we do not want to render again means refresh and display again. just render once
let hasRendered = false;
// to check if we have rendered already or not
const renderApp = () => {
  // if we have not rendered then we are going to render
  if (!hasRendered) {
    ReactDOM.render(jsx,document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />,document.getElementById('app'));

//onAuthstatechanged takes a call back and runs it when auth state changs. like user goes from unauth to auth or vice versa.
firebase.auth().onAuthStateChanged((user) => {
 if (user){
   //as user is logged in then dispatch login action
    store.dispatch(login(user.uid));
   //just logged in
    store.dispatch(startSetExpenses()).then(() => {
    renderApp();
    // redirect the user if they are on login page
    if (history.location.pathname === '/') {
       history.push('/dashboard');
    };
    console.log('log in');
  });
   
 } else {
   // logout action generator takes no parameters so we do not pass any args
   store.dispatch(logout());
   //history.push('/'); // brings to login page.
   renderApp(); 
   console.log('log out');
   //brings to login page
   history.push('/');
 }
});


//code for passing children component
// const Layout = (props) => { //stateless functional component
//     return (
//        <div>
//            <p>header</p>
//            {props.children} 
//            <p>footer</p>
//        </div>
//     );
// };

// const template = (
//     <div>
//         <h1>Page Title</h1>
//         <p>This is my page</p>
//     </div>
// );

// ReactDOM.render((
//     <Layout>
//     <div>
//         <h1>Page Title</h1>
//         <p>This is my page</p>
//     </div>
//     </Layout>)
//     , document.getElementById('app')); 
//<Layout content={template}/>

// class oldSyntax {
//     constructor(){
//         this.name = "M";
//         this.getGreeting1 = this.getGreeting1.bind(this);
//     }
//     getGreeting1() {
//         return `my name is ${this.name}.`;
//     }
// }
// const os = new oldSyntax();
// const getGreeting1 = os.getGreeting1();
// console.log(getGreeting1());

// class newSyntax {
//     name = 'N';
//     getGreeting = () => {
//         return `my name is ${this.name}.`;
//     }
// }
// const ns = new newSyntax();
// const newGetGreeting = newSyntax.getGreeting;
// console.log(newGetGreeting());

