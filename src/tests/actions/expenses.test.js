import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore ([thunk]);

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({ //use toEqual for  objects or array. while use toBe for numbers or booleans
        type: 'REMOVE_EXPENSE',
        id: '123abc'
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

