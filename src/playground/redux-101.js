import { createStore } from 'redux';

// Action generators : these are functions that return action objects

// const incrementCount = (payload={}) => ({  //we implicitly return object with type set as increment, decrement etc
                        //need to set to payload = empty obj {} as bcoz if nothing is passed then accessing an property of empty object results in undefined error
    
//     type: 'INCREMENT',
//     incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
// }); 

const incrementCount = ({ incrementBy = 1 } = {}) => ({  //we implicitly return object with type set as increment, decrement etc
    //incrementBy is first property of object passed, we set it to 1 by default and use empty obj if nothing is passed.
    //if empty obj is there then automatically we use and set incrementBy =1 as we are equating or setting default obj containing incrementBy=1
    type: 'INCREMENT',
    incrementBy //object property name and value is same thats why one one name     incrementBy:    incrementBy
}); 

const decrementCount = ({decrementBy = 1} = {}) => ({
    type:'DECREMENT',
    decrementBy        
});
const setCount = ({setCount = 0}={}) => ({
    type: 'SET',
    setCount
});
const resetCount = ({resetCount=0}={}) => ({
    type: 'RESET',
    resetCount
});

//Actions indicate that something has happened but do not specify how app state changes in response. like action below
// but Reducers do this job what needs to be done of 'action'. reduce are pure function i.e. output is purely calculate from passed input. 
//reducers do not rely on values outside of reducer scope i.e. var or state from outside functions.
//do not change the 'state' or 'action' values directly. just read their properties. and retrun obj with their changed properties and new state
const countReducer = (state = { count: 0 }, action) => { //state is current state just as in .state. count is default param. in createStore we have to pass a funciton that gets called right in
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.setCount
                }
        case 'RESET':
            return {
                count: action.resetCount
            };
        default:
            return state;
    }
};
//action is the action object. when we dispatch something with store.dispatch(), we can access from action object as second parameter
const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => { //this func in subscribe() gets called everytime the store changes.
    console.log(store.getState()); //get the current state object
});
// if (action.type === 'INCREMENT') {
//      return {
//          count: state.count + 1
//      };
// } else {
//     return state;
// };

//Actions are an object that gets sent to the store
// store.dispatch( //dispatch() allows you to dispatch an action object to store so that store can do something with passed info.
//     {
//         type: 'INCREMENT' //DEFAULT NAMING CONVENTION TO NAME THE ACTION OBJECT type
//     }
// );
//unsubscribe(); to unsubscribe from subscribe. below dispatch will not be logged.
// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// }); 
store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());
store.dispatch(resetCount({resetCount:5}));

// store.dispatch({
//     type: 'DECREMENT'
//     decrementBy: 10
// });
store.dispatch(decrementCount());

store.dispatch(decrementCount({decrementBy: 1000})); 

store.dispatch(setCount({setCount: 101}));