//import './utils.js';
//import subtract, { square,multiply } from './utils.js'; //def exp have to be put outside of {}.you can put any different name for default exp. but it takes same default exp from utils

import React from 'react';
import  ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; //provider allows to provide store to all components that make up our application
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { addExpense } from './actions/expenses';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';


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
ReactDOM.render(jsx,document.getElementById('app'));

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

