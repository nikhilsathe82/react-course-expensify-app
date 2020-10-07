import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux'; // connect component to store
import { addExpense } from '../actions/expenses';

const AddExpensePage = (props) => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm 
          //onSubmit gets called when the user submits valid data. we get data back in the form of expense obj. desc, amount, createdat, note
          //add expense page needs to dispatch the given action to redux store. 
          //here we can pass props from parent (addexpensepage) to child (expenseform) and viceversa
          //so in expenseform in this.props.onSubmit sets the expense obj. which is passed to onsubmit in addexpensepage in expense obj
          //using the data in expense obj, the addexpense action is called thru dispatch
          onSubmit={(expense) => { 
              props.dispatch(addExpense(expense)); //we are trying to dispatch an action from expenses.js from actions. add data to redux store.
              props.history.push('/');
          }}
        />
    </div>
);

export default connect()(AddExpensePage); //this connects addexpensepage component to store and props.dispatch