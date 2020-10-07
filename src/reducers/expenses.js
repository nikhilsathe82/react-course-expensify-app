//Expenses reducer
const expensesReducerDefaultState = [];

//export default (state = expensesReducerDefaultState, action) => { this is also another way.
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

export default expensesReducer;