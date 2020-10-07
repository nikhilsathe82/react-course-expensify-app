import React from 'react';
import { connect } from 'react-redux';
import { editExpense, removeExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

const EditExpensePage = (props) => {
    return (
        <div>
            <ExpenseForm
                //expense is the new prop that expenseform is getting. props.expense is the original data of expense that we have to show.
                expense={props.expense}
                //things to do when form gets submitted
                onSubmit={(expense) => {
                    //dispatch the action object to store that is returned by the edit expense
                    props.dispatch(editExpense(props.expense.id, expense));
                    props.history.push('/');
                }}
            />
            <button onClick={() => {
                props.dispatch(removeExpense({ id: props.expense.id })); //removeExpense is the action generator and it take id to remove from expense array
                props.history.push('/');
            }}>Remove</button>
        </div>
    );

};

//give the component editexpensepage, the current expense obj 
const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id) //returns true and put in expense below return.
        // if returns true then component editexpensepage has acccess to expense
    };
};
export default connect(mapStateToProps)(EditExpensePage);
