import {v4 as uuidv4} from 'uuid';
import database from '../firebase/firebase';
import expenses from '../tests/fixtures/expenses';

//ADD_EXPENSE. handles dispatched action with type add_expense
export const addExpense = ( expense ) => ({
   type:'ADD_EXPENSE',
   expense
});

//asynchronous action responsible for adding data to  firebase
export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
     const {
        description = '',
        note='',
        amount=0,
        createdAt=0
     } = expenseData; //destructure the expenseData
     
     const expense = {description,note,amount,createdAt}; //define an expense obj
     
     return database.ref('expenses').push(expense).then((ref) => {
        dispatch(addExpense({
            id: ref.key,
            ...expense
        })); // dispatch the action from above otherwise redux store is not going to change.
     });
  };
};

//REMOVE EXPENSE. handles dispatched action with type remove_expense
export const removeExpense = ({id}={}) => ({
    type: 'REMOVE_EXPENSE',
    id
    });

//EDIT EXPENSE
export const editExpense = (id,updates) => ({
     type: 'EDIT_EXPENSE',
     id,
     updates
});

// SET_EXPENSES
export const setExpenses = (expenses) => ({
   type: 'SET_EXPENSES',
   expenses
});

//1. fetch all expense data at once from firebase
//2. parse that data into array
//3. dispatch SET_EXPENSES

export const startSetExpenses = () => {
   return (dispatch) => {
      // return the promise that allows us to access startSetExpenses in app.js where we dispatch things
     return database.ref('expenses').once('value').then((snapshot) => { 
        const expenses = [];
        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });

      dispatch(setExpenses(expenses));

     });
   };
};


