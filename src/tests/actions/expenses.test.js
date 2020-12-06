import { database } from 'firebase';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, startEditExpense, removeExpense, startSetExpenses, startRemoveExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore ([thunk]);

beforeEach((done) => {
    const expensesData= {};
    //loop over the expenses array and add each item to expensesDAdta
    expenses.forEach(({ id, description, note, amount, createdAt}) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref('expenses').set(expensesData).then(() => done());
})

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({ //use toEqual for  objects or array. while use toBe for numbers or booleans
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore({}); // to ensure everything is dispatched correctly
    const id = expenses[2].id;// create id var
    //disptach startremoveexpense. then is added to wait till the process is complete
    store.dispatch(startRemoveExpense({ id })).then(() => {
      const actions = store.getActions();
      // id is the id from above to ensure that it was actually that was passed in
      expect(actions[0]).toEqual({ 
         type: 'REMOVE_EXPENSE',
         id
      });
      // fetch the data to ensure that it was actually deleted
      //return the promise to as to chain on. means pass the data to below .then.
      return database.ref(`expenses/${id}`).once('value');  
    }).then((snapshot) => {
       //we have access to promise data from above over here
       // if we use snapshot.val on id that does not exist we get null back
       expect(snapshot.val()).toBeFalsy(); 
       done();
    });

}); 

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note: 'New Note Value' });
    expect(action).toEqual({ //use toEqual for  objects or array. while use toBe for numbers or booleans
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New Note Value'
        }
    });
});

test('should edit expense from firebase',(done) => {
   const store = createMockStore({});
   const id = expenses[0].id;
   const updates = {amount: 21045};
   store.dispatch(startEditExpense(id,updates)).then(() => {
      expect(actions[0]).toEqual({
         type:'EDIT_EXPENSE',
         id,
         updates
      });
    //fetch data from firebae and check the amount val to check that indeed it was changetd.
    return database.ref(`expenses/${id}`).once('value');
    // above line we are returning promise. so in .then below can be chained promise. .then contains data in snapshot that we can use to check data from firebase.
   }).then((snapshot)=>{
     expect(snapshot.val().amount).toBe(updates.amount);
     done();
   });
});


test('should setup add expense action object with provided values', () => {
    // const expenseData = {
    //     description: 'Rent',
    //     amount: 123233,
    //     createdAt: 1000,
    //     note: 'This was rent'
    // };
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
     const store = createMockStore({});
     const expenseData = {
         description: 'Mouse',
         amount: 34,
         createdAt: 3434,
         note: 'mouse'
        };

     store.dispatch(startAddExpense(expenseData)).then(() => {
       expect(1).toBe(2);
       done();
     });

});

test('should add expense with defaults to database and store', () => {

});

test('should setup add expense action object with default values', () => {
    const expenseData = {
        description: 'Rent',
        amount: 1323232,
        createdAt: 1000,
        note: 'This'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String),
        }
    });
});

test('should fetch the expenses from firebase', (done) =>{
  const store = createMockStore({});
  //dispatch the startsetexpenses to mockstore
  store.dispatch(startSetExpenses()).then(() => {
     const actions = store.getActions();
     expect(actions[0]).toEqual({
         type: 'SET_EXPENSES',
         expenses
     });
     done();
  }); 
});