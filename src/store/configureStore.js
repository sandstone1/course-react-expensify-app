
// below we do have some dependencies: we need to get createStore and combineReducers
// from redux and we need to import in the expenseReducer and the filtersReducer
import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';


// set up a default export for store
// put the store inside the default export and then return the store we just created
// and this means when we import the default export from configureStore,js
// we can call the store and get the store back and use it
export default () => {
    // combineReducers let's you combine multiple reducers to create a single store and
    // using combineReducers is pretty simple, we provide the conbineReducers() as
    // the first argument to createStore and call it as a function so the code would
    // look as follows:
    const store = createStore(
        // combineReducers also takes an argument and the argument will be an object and
        // the object will have key value pairs
        // the key will be the root state name ( i.e. expenses, filter ) and the value
        // will be the reducer that is suppose to manage the key name

        // below we call combineReducers passing the return value into createStore
        // and on the combineReducers object is where we define what we want our
        // redux store to look like
        // so instead of being just an array, we have an object with 2 properties:
        // expenses and filters
        combineReducers({
            // the expenses property is managed by the reducer or the expensesReducer
            expenses : expensesReducer,
            // the filters property is managed by the reducer or the filtersReducer
            filters : filtersReducer
        }),
        // for redux dev tools, we need to add this line of code in addition to downloading
        // the Chrome redux dev tool extension
        // this line of code came from the following URL:
        // " https://github.com/zalmoxisus/redux-devtools-extension "
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};


