
// for app.js, we will need React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom';
// import the Provider component from react-redux
import { Provider } from 'react-redux';
// imoort our router
import AppRouter from './routers/AppRouter';
// import out store
import configureStore from './store/configureStore';
// import the named export
import { addExpense } from './actions/expenses';
// import the named export
import { setTextFilter } from './actions/filters';
// import the default export getVisibleExpenses
import getVisibleExpenses from './selectors/expenses';
// import normalize css
// remember normalize css has to be imported before our style file is imported
import 'normalize.css/normalize.css';
// import our style file into app.js
import './styles/styles.scss';
// lecture 121: Mocking Libraries with Jest
// we moved the import below from ExpenseForm.js to this file
// import the css for the react-dates library
import 'react-dates/lib/css/_datepicker.css';




// now we can create a const called store and then call confirgureStore()
// in order to get the store value
// this will give us access to store.dispatch(), store.getState() and
// store.subscribe()
const store = configureStore();



/*
// lecture 99: Challange
// 6
// this one or #4 has to come before #1, #2 or #3 in order to work properly
// use store.subscribe to track changes and make sure everytime store.subscribe
// runs we get notified of the changes
store.subscribe( () => {
    // first, create a const called state and this will contain the state or
    // the expenses array and the filters object
    const state = store.getState();
    // second, create another const called visibleExpenses and this will equal
    // the return value from getVisibleExpenses and we need to pass in the necessary
    // data
    const visibleExpenses = getVisibleExpenses( state.expenses, state.filters );
    // change from console.log( store.getState() ) to console.log( visibleExpenses )
    console.log( visibleExpenses );
});
*/


// -- Mark 5 --
// lecture 131: Integrating Git into Our Project
// now, we are going to remove all of the expenses below that we created on fly
// ( i.e 1, 2 and 3 )
// in the next section, we are going to add a real database and will no longer want
// to add the dummy expenses below

// were also going to comment out #6 above bacause in the future, that functionality
// will happen by interacting with the application

// now if we run git status, we see that this file is in the unstaged changes category
// and when we see " Changes not staged for commit: " we know that those files are
// in the unstaged changes category and these are files that Git knows about since this
// file has already been committed but is saying that the file has been changed since
// the last commit and so we can now add this file to the staging area and make a new
// commit

// so run git add src/app.js and then run git status and we can now see that src/app.js
// is in the staging area and ready for a commit and we will type:
// git commit -m " Remove dummy expense data "

// ------------



/*
// lecture 99: Challange
// 1
// remember, this store.dispatch call has to be called after
// const store = configureStore(); and before console.log( store.getState() );
// DISPATCH THE ADD EXPENSE ACTION GENERATOR
// remember to pass an object into the addExpense generator
store.dispatch( addExpense( { description : 'Water bill', amount : 4500 } ) );



// lecture 99: Challange
// 2
// remember, this store.dispatch call has to be called after
// const store = configureStore(); and before console.log( store.getState() );
// set the createdAt value to a value in the future ( i.e. 1000 )
// DISPATCH THE ADD EXPENSE ACTION GENERATOR
// remember to pass an object into the addExpense generator
store.dispatch( addExpense( { description : 'Gas bill', createdAt : 1000 } ) );




// -- Mark 2 --
// lecture 104: Dropdown for Picking SortBy
// 3
// DISPATCH THE ADD EXPENSE ACTION GENERATOR
// remember to pass an object into the addExpense generator
store.dispatch( addExpense( { description : 'Rent', amount : 109500 } ) );
*/

// -----------


// lecture 99: Challange
// 4
// remember, this store.dispatch call has to be called after
// const store = configureStore(); and before console.log( store.getState() );
// DISPATCH THE SET TEXT FILTER ACTION GENERATOR

// -- Mark 2 --
// lecture 104: Dropdown for Picking SortBy
// comment out 4 & 5
/*
store.dispatch( setTextFilter( 'water bill' ) );



// -- Mark 4 --
// 5
// lecture 101: Connecting Store and Component with React-Redux
// call setTimeout and watch the data change from " water bill "
// to " rent " after 3 seconds
setTimeout( () => {
    store.dispatch( setTextFilter( 'bill' ) );
}, 3000);
*/


// -----------------------------------------------


// test store
// when we look at console.log, we see we are getting the default state
// and everything has been set up correctly
// console.log( store.getState() );

// in the next video, we are going to start taking the first steps to
// connect react and redux




// -- Mark 1 --
// lecture 101: Connecting Store and Component with React-Redux

// the Provider component is very simple to use
// first, we remove <AppRouter /> from ReactDOM.render() or
// ReactDOM.render( <AppRouter />, document.getElementById( 'app' ) );
// and replace it with a jsx variable like this:
// ReactDOM.render( jsx, document.getElementById( 'app' ) );

// in here, we will just dump the jsx
// we haven't changed the functionality at all, we have just broken it
// out into a separate variable

// the Provider component is going to allow us to provide the store to
// all of the components that make up our application and this is a super
// useful feature and it means that we do not need to manually pass the store
// around, instead individual components that want to access the store
// can just access it

// below we also have to provide a single prop, which is the store that
// we're trying to share with the rest of our application and the prop
// name is store and we set it equal to our redux store or the store variable
// up above

// we now have an application where all the components have access to the
// store and we can now take advantage of the other thing that the
// react-redux library gives us, which is the connect function
// we can't use the connect function until the Provider component is set up
const jsx = (
    <Provider store={ store }>
        <AppRouter />
    </Provider>
);


ReactDOM.render( jsx, document.getElementById( 'app' ) );

// create a new component called expenseList.js under the Component's
// folder

// ==============================
// GO TO EXPENSELIST.JS -- Mark 2 --
// ==============================