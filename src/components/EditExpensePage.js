import React from 'react';
import { connect } from 'react-redux';
import { startEditExpense, removeExpense, startRemoveExpense } from '../actions/expenses';
import ExpenseForm from './ExpenseForm';

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        //dispatch the action object to store that is returned by the edit expense
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/');
    };
    onRemove = () => {
        this.props.startRemoveExpense({ id: this.props.expense.id });
        this.props.history.push('/');
    };
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        //expense is the new prop that expenseform is getting. props.expense is the original data of expense that we have to show.
                        expense={this.props.expense}
                        //things to do when form gets submitted
                        onSubmit={this.onSubmit}
                    />
                    <button className="button button--secondary" onClick={this.onRemove}>Remove Expense</button>
                </div>

            </div>
        );
    }

};

//give the component editexpensepage, the current expense obj 
const mapStateToProps = (state, props) => ({

    expense: state.expenses.find((expense) => expense.id === props.match.params.id) //returns true and put in expense below return.
    // if returns true then component editexpensepage has acccess to expense

});
const mapDispatchtoProps = (dispatch, props) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchtoProps)(EditExpensePage);
