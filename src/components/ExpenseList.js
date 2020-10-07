import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses'
//tep 1. setup Provider

//step 2. create HOC using connect funciton from react-redux. we define things that we want to get off the store.(mapstatetoprops) and the component (expenselist) of which you want to make the connected version of.
//as store changes the component is going to get rerendered with new values
const ExpenseList = (props) => (
  <div>
    <h1>ExpenseList</h1> 
    {props.expenses.map((expense)=> { //.map takes in individual expense
         return <ExpenseListItem key={expense.id} {...expense}/>; //thru spread operator we are passing each ...expeense to expenselistitem where it is destructure
    })};
     
  </div>
);

//func that maps store state to component props
const mapStatetoProps = (state) => { //provide info on what we want to connect and access from store. connect is keyword 
    //connectedexpenselist has access to name prop in obj. that means it can be accessed in expenselist above thru props  
    return {
      expenses: selectExpenses(state.expenses,state.filters) //selectexpenses is going to return filtered and sorted values and pass to expenselist func above
    };
  
  };

//create a higher order component
export default connect(mapStatetoProps)(ExpenseList); //expenselist is the component that we need to pass and it returns a func

