import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

//redux thunk we can create asynchronous actions that will do asynchonous like firebase data call and then use dispatch to change redux data store

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
//Store creation and using combineReducers to create single store
//auth is prop on redux store managed by authReducer
const store = createStore(
    combineReducers({
       expenses: expensesReducer,
       filters: filtersReducer,
       auth: authReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
return store;
};

