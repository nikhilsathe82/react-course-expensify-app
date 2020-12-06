import {v4 as uuidv4} from 'uuid';
import database from '../firebase/firebase';


//ADD_EXPENSE. handles dispatched action with type add_expense
export const addExpense = ( expense ) => ({
   type:'ADD_EXPENSE',
   expense
});

//component calls action generator > action generator returns function> component dispatches func > func runs(has the ability to dispatch other actions and do whatever it wants)
//asynchronous action responsible for adding data to  firebase. i get expenseData and if not received we set to empty obj
export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
     const {
        description = '',
        note='',
        amount=0,
        createdAt=0
     } = expenseData; //destructure from the expenseData
     
     const expense = {description,note,amount,createdAt}; //define an expense obj
     
     // add to firebase and then add to redux store thru dispatch. push the expense obj.
     return database.ref('expenses').push(expense).then((ref) => {
        //dispatch the action addExpense from above to change the redux store
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

//asynchonous action responsible for remove data from firebase. this is done to store data from store to fb
export const startRemoveExpense = ({ id } = {}) => {
   //async function that is going to interact with firebase and then it will dispatch asysn ction to change redux store
   //'dispatch' is given to this func by redux library
   return (dispatch) => {
      // interact with firebase and remove the specific id. 
      return database.ref(`expenses/${id}`).remove().then(() => {//promise executes when expense is removed from fb.
          //dispatch whatever comes back from removeExpense action generator from above to store.
          dispatch(removeExpense({ id }));
      });
   };
   
};
//EDIT EXPENSE
export const editExpense = (id,updates) => ({
     type: 'EDIT_EXPENSE',
     id,
     updates
});
//asynchonous action responsible for editing/updating data from firebase. this is done to store data from store to fb
export const startEditExpense = (id,updates) => {
   return (dispatch) => {
      return database.ref(`expenses/${id}`).update(updates).then(() => {
         dispatch(editExpense);
      });
   };
};



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


