import {v4 as uuidv4} from 'uuid';
import database from '../firebase/firebase';

//ADD_EXPENSE. handles dispatched action with type add_expense
export const addExpense = ( expense ) => ({
   type:'ADD_EXPENSE',
   expense
});

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