
// below we do have some dependencies: we need to get createStore and combineReducers
// from redux and we need to import in the expenseReducer and the filtersReducer

// add applyMiddleware and conpose and applyMiddleware just lets you add middleware to your store
// and we need it to add our thunk middleware and then we need to import redux-thunk
// below and it is a single default export and our instructor calls the default export
// thunk
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import thunk from 'redux-thunk';


// ( see notes to -- Mark 1 -- below )
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

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
        // comment out the line below ( see notes to -- Mark 1 -- below )
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

        // add this in as the second argument to createStore and this is needed in order
        // for redux-thunk to work ( see notes to -- Mark 1 -- below )
        composeEnhancers( applyMiddleware( thunk ) )
    );

    return store;
};


// -- Mark 1 --
// lecture 152: Asynchronous Redux Actions
// now that we have installed redux-thunk, we need to make some changes to the redux store file and
// these changes get a little archaic because once again we are using that dev tools extension from
// above so the process of setting this up is going to look a little weird and add the following
// above:
/*
// add applyMiddleware and compose and applyMiddleware just lets you add middleware to your store
// and we need it to add our thunk middleware and then we need to import redux-thunk
// below and it is a single default export and our instructor calls the default export
// thunk
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'rdux-thunk';
*/

// so now from here we want to use applyMiddleare to apply this piece of middleware or redux-thunk
// and if we weren't using the dev tools above this would be pretty easy and we would do the
// following:
/*
        combineReducers({
            // the expenses property is managed by the reducer or the expensesReducer
            expenses : expensesReducer,
            // the filters property is managed by the reducer or the filtersReducer
            filters : filtersReducer
        }),
        applyMiddleware(thunk)
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
*/

// but since we want to we want to perserve the dev tools functionality we will have to add in a
// little more code that makes things a little more confusing so we will create a const called
// composeEnhancers and set it equal to the following:
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;
// and this line of code above " export default () => { "

// and we are going to use " window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ " but only if it exists
// and if it doesn't exist then we are going to use the logical OR operator and will use compose
// instead or " || compose; " and then we wrap applyMiddleware(thunk) in a call to
// composeEnhancers() or composeEnhancers( applyMiddleware( thunk ) ) and delete or comment out
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

// so now we have everythng set up and we can turn our attention towards creating our very first
// asynchronous action but first we need to tweak our firebase.js file since we are not exporting
// anything and we do want to export some stuff


// ==============================
// GO TO FIREBASE/FIREBASE.JS -- GO TO -- Mark 9 --
// ==============================


// END OF -- Mark 1 --