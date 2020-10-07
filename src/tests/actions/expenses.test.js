import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

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
    const expenseData = {
        description: 'Rent',
        amount: 123233,
        createdAt: 1000,
        note: 'This was rent'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('should setup add expense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note:'',
            amount: 0,
            createdAt: 0
        }
    });
});