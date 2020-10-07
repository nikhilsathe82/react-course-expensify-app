//1. create stateless funcitonal components for actions to handle -> create a default reducer state -> create a reducer with switch statement -> 
//2. create store through store = createStore(mention the reducer name i.e. expense,filters)
//3. state=store.getstate() gets all expenses and filters
//4. call visibleexpense to sort and filter the expenses array 
//5. log the visibleexpenses on console to view actual results

import {createStore, combineReducers} from 'redux';
import {v4 as uuidv4} from 'uuid';

//ADD_EXPENSE. handles dispatched action with type add_expense
const addExpense = (
    { description = '',
      note='',
      amount=0,
      createdAt=0} = {}) => ({
   type:'ADD_EXPENSE',
   expense: {
       id: uuidv4(), 
       description,
       note,
       amount,
       createdAt
   }
});

//REMOVE EXPENSE. handles dispatched action with type remove_expense
const removeExpense = ({id}={}) => ({
    type: 'REMOVE_EXPENSE',
    id
    });

//EDIT EXPENSE
const editExpense = (id,updates) => ({
     type: 'EDIT_EXPENSE',
     id,
     updates
});
//Expenses reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type){
        case 'ADD_EXPENSE':
           return [...state,action.expense]; //returns a new array. ...is spread operator
        case 'REMOVE_EXPENSE':
           return state.filter(({ id })=> id !== action.id);     //taking only id from expense obj. function returns true then item is kept in array, if it returns false, the item is removed from array
                 //if not equal then results to true means item is kept. if equal then false means remove item from array
        case 'EDIT_EXPENSE':
           return state.map((expense) => {
              if (expense.id === action.id){
                   return {
                       ...expense,  //using spread operator, use existing expense prop, and overide with props of action.updates
                       ...action.updates
                   }
              }else{
                  return expense; //no change to the expense object unless there is a match
              }
           });
        default:
            return state;
        
    }
    
};
///////////////////////////////// Filters
//SET_TEXT_FILTER
const setTextFilter = (text='') => ({
    type: 'SET_TEXT_FILTER',
    text
});
// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',

});
//SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE',

});
//SET_START_DATE
const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});
//SET_END_DATE
const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

//Filters reducer
const filtersReducerDefaultState = {
    text:'',
    sortBy:'date',
    startDate:undefined,
    endDate: undefined};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type){
        case 'SET_TEXT_FILTER':
           return { //take the state obj. and assign the text received to action.text value
                   ...state,
                   text:action.text};
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
                return {
                    ...state,
                    endDate: action.endDate
                }; 
        default:
            return state;
    }
};

//Get Visible expenses
const getVisibleExpenses = (expenses,{text,sortBy,startDate,endDate}) => { //destructure the text, sortBy.. filters obj
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate; //always true. so we want to filter expenses only if startdate is nonnumber 
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch=(expense.description.toLowerCase()).includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch; //if all of these things are true then filter func returns true and item is kept in array. // if false, then  filter func returns false and item is removed and not display on screen. 
    }).sort((a,b) => {
         if (sortBy === 'date') {
             return a.createdAt < b.createdAt ? 1 : -1 // return 1 if a <b else return -1
         } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1 // return 1 if a <b else return -1
        }
    });                                                     
};
//Store creation and using combineReducers to create single store
const store = createStore(
    combineReducers({
       expenses: expensesReducer,
       filters: filtersReducer
    })
);
store.subscribe(()=>{
    const state = store.getState(); //thru .getstate you get all expenses array and all of filters
    const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({description:'Rent', amount: 100, createdAt: -21000})); //passes action object(addExpense) to expenses reducer which works on action  
const expenseTwo = store.dispatch(addExpense({description:'Coffee', amount: 200, createdAt: -1000}));

// store.dispatch(removeExpense({id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter('Rent'));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate(2000));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(999));

const demoState ={
    expenses: [{
        id:'aaa',
        description: 'January rent',
        note:'This was the final payment for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};

