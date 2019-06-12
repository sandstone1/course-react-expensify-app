
// lecture 91: Reducers, continued from the redux-101.js file

// first, change the entry point in the webpack.config.js from
// "  entry  : './src/playground/redux-101.js', " to
//  " entry  : './src/playground/redux-expensify.js', "

// second, restart the server and to do that we go to the terminal
// and press control C to stop the dev server and then type
// " yarn run dev-server " to restart the server

import { createStore, combineReducers } from 'redux';
import uuid                             from  'uuid';

// combineReducers is going to allow us to create multiple functions that
// define how a redux applicaton changes
// for redux-101.js, one reducer was fine since we were not tracking a
// whole lot of data
// we will learn how to use combineReducers to create multiple smaller
// functions and then combine them together

// let's look at the final state and what we are trying to build
// create a static object that represents the various things we want
// to keep track of

// all the data below is what we need to track in order to create
// a real world expense tracking application
const demoState = {
    // create an expenses array and as we add expenses they will be
    // added as objects inside the array

    // we will have multiple expenses for this application so we will
    // have multiple objects for this array
    expenses : [{
        // id will be randomly generated for us later but for now we
        // will use a random string of characters
        id          : 'adsaskg',
        description : 'January Rent',
        note        : 'That was the final payment to that address',
        // amount we paid in pennies and using pennies makes it easier
        // to calculate numbers
        amount      : 54500,
        // lastly, track the timestamp as to when this expense was
        // created but for now use the number 0
        createdAt   : 0
    }],
    // we will need to filter data by date, by amount, by a date range
    // or search for them by a text value
    // to allow for all of the above, we will use filter below
    // filter will be an object and on this object we will store the
    // current value for a few filters
    filters : {
        // will allow users to filter by text
        text      : 'rent',
        // also going to allow users to pick how they want to sort the
        // expenses they are viewing when they are on the dashboard page
        sortBy    : 'amount', // could date or amount
        // now allow users to filter by a date range
        // we will only show expenses whose createAt property falls in
        // between startDate and endDate
        startDate : undefined,
        endDate   : undefined
    }
};

// in the next video, we will learn how to use combineReducers to write
// reducers for this complex state







// lecture 92: Working with Multiple Reducers

// in this video, we are going to learn how to use combine reducers to
// create redux stores that use multiple reducers as opposed to one
// big one

// the technique in principal is going to be exactly the same as before
// a list of all the action we are going to need to create:
// ADD_EXPENSE for the expense array
// REMOVE_EXPENSE for the expense array
// EDIT_EXPENSE for the expense array
// SET_TEXT_FILTER for the filter array
// SORT_BY_DATE for the filter array
// SORT_BY_AMOUNT for the filter array
// SET_START_DATE for the filter array
// SET_END_DATE for the filter array

// setting up all these actions and handling them with a single reducer
// is just not feasible so we are going to learn how we can break up the
// application into multiple reducers

// we are going to use a single reducer for each root property in our
// redux store and the two root properties in the demoState above are
// expenses and filter so we are going to create two reducers, one for
// expenses and another for filter and we are then going to take those
// 2 reducers and combine them together to create the complete redux store

// so we are going to create a store that has 2 reducers associated with it

// EXPENSES REDUCER
// pass in the 2 arguments: state and action and return the new state
// the default state value will be an empty array and we can create a
// variable for our default state value
const expensesReducerDefaultState = [];

const expensesReducer = ( state = expensesReducerDefaultState, action ) => {
    // we will switch what we do based off a particular value
    switch ( action.type ) {
        // inside the {} we can define the various cases we want to handle
        // -- Mark 3 --
        case 'ADD_EXPENSE':
            // here we want to run some code that adds the expense onto the array
            // don't want to use state.push( action.expense ) since push will change
            // the original array and we want to avoid this so we will use
            // state.concat( action.expense ) since this takes the state array and combines
            // it with action.expense to create a new array and we return this array
            /*
            return state.concat( action.expense );
            */
            // in the console, this results in:
            // {expenses: Array(1), filters: {…}}
                // expenses: Array(1)
                    // 0:
                        // amount: 100
                        // createdAt: 0
                        // description: "Rent"
                        // id: "5618a125-a32c-4011-8c59-1a9bd7819c01"
                        // note: ""
            
            // SPREAD OPERATOR
            // now the above works but we want to explore the ES6 spread operator and
            // this allows us to get the same thing done and more
            // as an example, const names = [ 'Andrew', 'Steve' ];
            // if I use the spread operator or [ ...names  ], the result is [ 'Andrew', 'Steve' ]
            // if I want to add an item onto the names array and return a new array, I do as
            // follows [ ...names, 'Mike' ] and the result is [ 'Andrew', 'Steve', 'Mike' ]
            // the great thing here is the spread operator did not change the names array
            // could do [ 'Adam', ...names, 'Mike' ] and the result is [ 'Adam', Andrew', 'Steve', 'Mike' ]
            // so instead of doing this " return state.concat( action.expense ); ", were going to do
            // return [ ...state, action.expense ]; ( so were taking the current state array and addng
            // on the action.expense object without changing the state array )
            return [ ...state, action.expense ];
            // in the console, this results is the same as above
            // go to -- Mark 4 --

        // -- Mark 5 --
        case 'REMOVE_EXPENSE':
            // use filter to remove an expense from the state array
            // filter creates a brand new array from another array and does this by looking at each item in the array
            // and will call a function once for each item in the array and the function will return true or false
            // if the function returns true then the current item will be passed into the new array
            // if the function returns false then the current item will not be passed into the new array

            // remember, action.expense.id is equal to expenseOne.expense.id
            // could use destructuring here so { id } = item (remember we have an object here) so we can pull
            // id off each item in the state array
            // BELOW WORKS
            // return state.filter( ( { id } ) => id !== action.expense.id )
            // BELOW WORKS
            return state.filter( ( item ) => item.id !== action.expense.id )

        // -- Mark 6 --
        case 'EDIT_EXPENSE':
            // will use the object spread operator below
            // what do we want to do here? we want to go through every singe expense in the array and
            // find the match and when we find the match then go ahead and correctly change the match
            // we going to use a some conditional logic to change the expense when our item.id matches
            // the action.id
            return state.map( ( item ) => {
                if ( item.id === action.id ) {
                    // if we have a match, we want to return a brand new object
                    return {
                        // will use the object spread operator below
                        // we will spread out the expense item so we want to grab description,
                        // note, amount and createdAt and we just want to override the previous values
                        // with the ones that the user passed in
                        // ...item will give us current item / expense key value pairs and ..action.updates
                        // will provide new key value pairs which will override the previous key value
                        // pairs and this will result in new key value pairs for this item / expense
                        // this results in a new key value pair or " amount : 500 "
                        ...item,
                        ...action.updates

                        // by using the object spread operator we have simple way to create a new object
                        // from an existing oject and we will be using the object spread operator
                        // extensively throughout the course
                    }
                }
                else {
                    // do nothing
                    return item;
                }
            } );

        // set up the default case
        default :
            // if the store is running for the first time, then the default state value
            // will be shown
            return state;
    }
};


// -- Mark 1 --
// FILTER REDUCER

// FIRST, CREATE THE DEFAULT STATE OBJECT FOR FILTER
const filtersReducerDefaultState = {
    text      : '',
    sortBy    : 'date', // will sort by date by default
    startDate : undefined, // can be changed via the UI
    endDate   : undefined // can be changed via the UI
};

// SECOND, CREATE THE FILTERS REDUCER
const filtersReducer = ( state = filtersReducerDefaultState, action ) => {
     // we will switch what we do based off a particular value
     switch ( action.type ) {
        // inside the {} we can define the various cases we want to handle

        // -- Mark 7 --
        case 'SET_TEXT_FILTER':
            // when the filtersReducer see the case SET_TEXT_FILTER we want
            // to return a new object
            // when we look at the filters array in the console, we should see
            // the text value change from an empty string to " rent "
            return {
                // ...state will give us current key value pairs for the current state object
                // and text : action.text will provide one new key value pair for the
                // property text and this new key value pair will override the previous
                // key value pair because we are using the object spread operator below

                // the result is we will have a new object with the text value changing
                // from an empty string to " text : "rent" "
                ...state,    
                text : action.text
            };

        // -- Mark 8 --
        case 'SORT_BY_AMOUNT':
            // when the filtersReducer see the case SORT_BY_AMOUNT we want
            // to return a new object
            // when we look at the filters array in the console, we should see
            // the sortBy value change from " date " to " amount "
            return {
                // ...state will give us current key value pairs for the current state object
                // and sortBy : action.amount will provide one new key value pair for the
                // property sortBy and this new key value pair will override the previous
                // key value pair because we are using the object spread operator below

                // the result is we will have a new object with the sortBy value changing
                // from " date " to " amount "
                ...state,    
                sortBy : action.amount
            };

        // -- Mark 9 --
        case 'SORT_BY_DATE':
            // when the filtersReducer see the case SORT_BY_DATE we want
            // to return a new object
            // when we look at the filters array in the console, we should see
            // the sortBy value change from " amount " to " date "
            return {
                // ...state will give us current key value pairs for the current state object
                // and sortBy : ' date ' will provide one new key value pair for the
                // property sortBy and this new key value pair will override the previous
                // key value pair because we are using the object spread operator below

                // the result is we will have a new object with the sortBy value changing
                // from " amount " to " date "
                ...state,    
                sortBy : 'date'
            };

        // -- Mark 10 --
        case 'SET_START_DATE':
            // when the filtersReducer see the case SET_START_DATE we want
            // to return a new object
            // when we look at the filters array in the console, we should see
            // the startDate value change from " undefined " to " 125 "
            return {
                // ...state will give us current key value pairs for the current state object
                // and startDate : action.startDate will provide one new key value pair for the
                // property startDate and this new key value pair will override the previous
                // key value pair because we are using the object spread operator below

                // the result is we will have a new object with the startDate value changing
                // from " undefined " to " 125 "
                ...state,
                startDate : action.startDate
            };

        // -- Mark 11 --
        case 'SET_END_DATE':
            // when the filtersReducer see the case SET_END_DATE we want
            // to return a new object
            // when we look at the filters array in the console, we should see
            // the endDate value change from " undefined " to " 1250 "
            return {
                // ...state will give us current key value pairs for the current state object
                // and endDate : action.endDate will provide one new key value pair for the
                // property endDate and this new key value pair will override the previous
                // key value pair because we are using the object spread operator below

                // the result is we will have a new object with the endDate value changing
                // from " undefined " to " 1250 "
                ...state,
                endDate : action.endDate
            };

        // set up the default case
        default :
            // if the store is running for the first time, then the default state value
            // will be shown
            return state;
    }   
};

// THIRD, REGISTER THE FILTERS REDUCER WITH COMBINEREDUCERS INSIDE THE STORE BELOW



// CREATE A NEW STORE
/*
const store = createStore( expensesReducer );

// test to see if the store is working by testing the default state value and can
// do this by using the getState method
// the result is an empty array or []
console.log( store.getState() );
*/

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
        // -- Mark 1 --
        filters : filtersReducer
    })
);

// by doing the above, the redux store is an object with a property named expenses
// and that property's value is where the array lives, which is what we want
// so expenses is a property on the root object and this will allow us to build more
// complex redux stores

// test to see if the store is working and we can do this by using the getState method
// console.log( store.getState() );

// challange
// create a second reducer and register it just like we registered the expensesReducer
// go to -- Mark 1 -- above since this code needs to come before the store

// lecture recap
// at this point, we know how to set up the basic store but we don't know how to
// dispatch things like actions correctly 
// in other words, how do we have the expenses reducer respond to a specific action
// and how do we have the filters reducer respond to a specific action





// lecture 93: ES6 Spread Operator in Reducers

// in this video, we will start dispatching actions and handling those actions
// in the appropriate reducer and to do this we will be exploring a very handy
// ES6 tool, which is the ES6 spread operator and it is going to make it a lot
// easier to work with arrays and objects

// a list of all the action we are going to need to create:

// ==============================
// ACTION GENERATOR #1
// ==============================

// ADD_EXPENSE for the expense array

// STEP 1: CREATE THE ADD EXPENSE ACTION GENERATOR

// we are going to start off with the add expense action generator
// we will implicitly return the action object below

// -- Mark 2 --
// we will destructure the first argument and if it doesn't exist we will destructure
// an empty object
// we can define all the things we want within the first {} within the argument
// we want the user to provide the value for description and note but if the user
// does not provide a value then an empty string will surfice
// next up, we default the amount to an appropriate value like 0
// next up, we default the createdAt to an appropriate value like 0 until we talk about
// timestamps
const addExpense = (
    { 
        description = '',
        note        = '',
        amount      = 0,
        createdAt   = 0
    } = {} 
) => ( {
    type : 'ADD_EXPENSE',
    // the expense object will contain all the fields we need,
    // such as id, description, note, amount and createdAt, the last 4 fields
    // are going to come from the user and the id will be generated by our code

    // to generate a random id we will use the NPM UUID library and all we have to
    // do is install it and call the function and we'll be able to generate those IDs
    // however, later on, the IDs will come from the database
    
    // STEP 1: install NPM UUID: I USED NPM HERE INSTEAD OF YARN and in the terminal typed
    // "npm install uuid@3.1.0" but could have used "yarn add uuid@3.1.0"
    // STEP 2: after it is installed, restart the dev server by typing yarn run dev-server
    // STEP 3: next, we need to import the uuid library and there is a single default export
    // we need for this library and type " import uuid from 'uuid'; "
    // STEP 4: next we just call uuid within the expense object to generate a random id,
    // please see below

    // since the other 4 fields are generated by the user, we will pass those fields in
    // as an argument to the arrow function above, go to -- Mark 2 -- above
    expense : {
        id : uuid(),
        // we are using the property shorthand below
        description, // description = description
        note,        // note        = note
        amount,      // amount      = amount
        createdAt    // createdAt   = createdAt
    }
} );

// STEP 2: TRACK CHANGES TO THE ADD EXPENSE ACTION GENERATOR

/*
// now that addExpense generator is set up, we can go ahead and add an expense
// use store.subscribe to track changes and move console.log( store.getState() );
// inside store.subscribe to make sure everytime store.subscribe runs we get
// notified of the changes
store.subscribe( () => {
    console.log( store.getState() );
});
*/

// STEP 3: DISPATCH THE ADD EXPENSE ACTION GENERATOR
// remember to pass an object into the addExpense generator
store.dispatch( addExpense( { description : 'Rent', amount : 100  } ) );

// question: how do we handle this dispatched action when we have mulpiple reducers
// in the redux store?
// answer: the dispatched action will get dispatched to both the expensesReducer and
// the filtersReducer

// when addExpense gets dispatched we set up the case when the reducer needs to do something
// for the expensesReducer, we need to do something (i.e. we need to add the expense to the
// array) when AddExpense get dispatched so set up a case for the AddExpense action generator
// and go to -- Mark 3 --
// for the fitersReducer, we do not need to do anything since AddExpense does not affect the
// data within the filtersReducerDefaultState so we do not set up a case for the addExpense
// action generator

// STEP 4: HANDLE THE ADD EXPENSE ACTION GENERATOR IN THE EXPENSES REDUCER
// -- Mark 4 --
// now we could go ahead and add multiple dispatch expenses by adding multiple dispatch calls
store.dispatch( addExpense( { description : 'Coffee', amount : 300  } ) );
// in the console, this results in:
// {expenses: Array(2), filters: {…}}
    // expenses: Array(2)
        // 0:
            // amount: 100
            // createdAt: 0
            // description: "Rent"
            // id: "17936262-c868-46c6-b1ed-1ab217f671c2"
            // note: ""
        // 1:
            // amount: 300
            // createdAt: 0
            // description: "Coffee"
            // id: "e4243a5c-84c7-4b58-bc84-bd667a61b53f"
            // note: ""


            

// REMOVE_EXPENSE for the expense array

// ==============================
// ACTION GENERATOR #2
// ==============================

// challange
// were going to be removing expenses by their ID
// first we need the ID and we can get the ID from the dispatch call
const expenseOne = store.dispatch( addExpense( { description : 'Rent', amount : 100  } ) );
const expenseTwo = store.dispatch( addExpense( { description : 'Coffee', amount : 300  } ) );


// STEP 1: CREATE ACTION GENERATOR FOR REMOVE EXPENSE
// we need the id from the expense we are going to remove
const removeExpense = ( { id } = {} ) => ( {
    type : 'REMOVE_EXPENSE',
    expense : {
        id : id
    }
} );

// STEP 2: DISPATCH THE ACTION GENERATOR FOR REMOVE EXPENSE
// we will need to create the action generators and fill out the reducer part
// will need to use the filter method inside the reducer to remove the expense
// teacher gave us the dispatch function or
store.dispatch( removeExpense( { id : expenseOne.expense.id } ) );


// STEP 3: REMOVE AN EXPENSE FROM THE REDUCER
// go to -- Mark 5 --

// recap video: in this video, we explored the spread operator when working with arrays
// in the next lecture we are going to explore how we can use the spread operator when
// working with objects and this will make it much easier to handle the remaining action
// generators




// lecture 94: Spreading Objects

// in this video, we will look at the object spread operator and the object spread
// operator is more useful than the array spread operator, in the instructor's opinion

// with the array spread operator, you could use concat instead but with the object
// spread operator there really is no substitute

// in prinicpal the object spread operator does the same thing but it's the details that
// are different
// the array spread operator allows us to grab items from an existing array and create a
// new array
// the object spread operator allows us to grab items from an existing object and create a
// a new object
// for example:
const user = {
    name : 'Jen',
    age  : 24
};

// so now we want to create a new object without changing the user object and to do
// this we are going to use the spread operator or ...user to spread out the user
// object

// in the example below we are going to have 2 properties named name and age
// remember, the array spread operator has made it's way into mainstream but the
// the object spread operator is on its way but not quite there yet so we are going
// to have to customize our babel configuration in order to support this syntax

// find appropriate plug in by googling " babel object spread operator " and the
// plug in is called proposal-object-rest-spread but old plug in, at the time the course
// was uploaded, was called transform-object-rest-spread

// #16
// transform-object-rest-spread: I USED NPM HERE INSTEAD OF YARN and typed
// "npm install babel-plugin-transform-object-rest-spread@6.23.0" but could have used
// "yarn add babel-plugin-transform-object-rest-spread@@6.23.0" and we will install it
// locally and then configure the plugin in .babelrc
// in .babelrc we add the following:
//  {
//      "plugins": ["transform-object-rest-spread"]
//  }
// lecture 94: Spreading Objects

console.log( { ...user } );

// can also add key value pairs to ...user
// results in " { name: "Jen", age: 24, location: "Philadelphia" } "
console.log( {
    ...user,
    location : 'Philadelphia'
 });

// if we add age : 27 then that will override age : 24 in the user object
// results in " { name: "Jen", age: 27, location: "Philadelphia" } "
 console.log( {
    ...user,
    location : 'Philadelphia',
    age      : 27
 });

 // if we add age : 27 before ...user then age : 24 will override age : 27
// results in " { age: 24, name: "Jen", location: "Philadelphia" } "
console.log( {
    age : 27,    
    ...user,
    location : 'Philadelphia'
});

// this is useful because just like we don't want to change the state array
// we also don't want to change the objects that make up our redux store instead
// we just want to clone the objects and add or override various values

// were going to use the object spread operator to give us the ability to edit
// an expense
// so we want the user to be able to override /change description, note, amount and
// createdAt -> see the addExpense action generator above


// EDIT_EXPENSE for the expense array


// ==============================
// ACTION GENERATOR #3
// ==============================


// STEP 1: CREATE THE EDIT EXPENSE ACTION GENERATOR

// pass in our 2 arguments: id and updates neither need default values since we
// we don't have the ID and were not updating anything ( don't understand this last
// part ) 
const editExpense = ( id, updates ) => ( {
    type : 'EDIT_EXPENSE',
    id, // remember this is equal to id : id
    updates // remember this is equal to updates : updates
} );


// STEP 2: DISPATCH THE ACTION GENERATOR FOR EDIT EXPENSE

// were going to pass in the necessary information to editExpense()
// what details do we need to give editExpense? Two things, (1) we need the ID of
// the expense were trying to edit and (2) we need what were trying to edit
// so we can pass in the ID and what were trying to edit or we pass in 2 arguments,
// the first one will be the ID and the second one will be the updater object and
// this object will update description, note, amount and createdAt
// for our example, we will just update the amount right now (remember, amount is 
// in pennies )
store.dispatch( editExpense( expenseTwo.expense.id, { amount : 500 } ) );


// STEP 3: HANDLE THE EDIT EXPENSE ACTION GENERATOR IN THE EXPENSES REDUCER

// go to -- Mark 6 --



// SET_TEXT_FILTER for the filter array


// ==============================
// ACTION GENERATOR #4
// ==============================


// challange
// my job for this challange is to set up the action generator and filter reducer
// code necessary so that the user can change the text value, which is an empty
// string currently in filtersReducerDefaultState

// STEP 1: CREATE THE SET TEXT FILTER ACTION GENERATOR

// remember, to set the text default value so that if no text value is provided
// by the user then the text value will equal an empty string
const setTextFilter = ( text = '' ) => ( {
    type : 'SET_TEXT_FILTER',
    text // remember this is equal to text : text
} );


// STEP 2: DISPATCH THE ACTION GENERATOR FOR SET TEXT FILTER

// instructor gave us the code below
// results in " text : "rent" "
store.dispatch( setTextFilter( 'rent' ) );
// results in " text : "" "
store.dispatch( setTextFilter( '' ) );


// STEP 3: HANDLE THE SET TEXT FILTER ACTION GENERATOR IN THE FILTERS REDUCER

// go to -- Mark 7 --






// lecture 95: Wrapping Up Our Reducers

// the expense reducer is finished and in this video, we are going to finish
// off the filters reducer

// first, we need the ability to change sort by and that is done via to actions:
// sort by date and sort by amount



// SORT_BY_AMOUNT for the filter array


// ==============================
// ACTION GENERATOR #5
// ==============================


// challange

// STEP 1: CREATE THE SORT BY AMOUNT ACTION GENERATOR

const sortByAmount = ( ) => ( {
    type   : 'SORT_BY_AMOUNT',
    amount : 'amount'
} );


// STEP 2: DISPATCH THE ACTION GENERATOR FOR SORT BY AMOUNT

// there is no need to pass any values into the sortByAmount call
// all we need to do is generate the action object which is completely static
// and then we'll dispatch it
store.dispatch( sortByAmount() );


// STEP 3: HANDLE THE SORT BY AMOUNT ACTION GENERATOR IN THE FILTERS REDUCER

// go to -- Mark 8 --



// SORT_BY_DATE for the filter array


// ==============================
// ACTION GENERATOR #6
// ==============================


// challange

// STEP 1: CREATE THE SORT BY DATE ACTION GENERATOR

const sortByDate = ( ) => ( {
    type : 'SORT_BY_DATE'
} );


// STEP 2: DISPATCH THE ACTION GENERATOR FOR SORT BY DATE

// there is no need to pass any values into the sortByDate call
// all we need to do is generate the action object which is completely static
// and then we'll dispatch it
store.dispatch( sortByDate() );


// STEP 3: HANDLE THE SORT BY DATE ACTION GENERATOR IN THE FILTERS REDUCER

// go to -- Mark 9 --






// SET_START_DATE for the filter array


// ==============================
// ACTION GENERATOR #7
// ==============================


// challange

// STEP 1: CREATE THE SET START DATE ACTION GENERATOR

// remember, no need to set the default value equal to undefined since the
// default value above is already set to undefined; also, if no
// argument is passed in then the default value will equal undefined anyway
// and this is the typical behavior of arguments
const setStartDate = ( startDate ) => ( {
    type : 'SET_START_DATE',
    startDate : startDate // could have just put " startDate "
} );


// STEP 2: DISPATCH THE ACTION GENERATOR FOR SET START DATE

// setStartDate is going to take the new date in and for now we will just
// use the number 125
store.dispatch( setStartDate( 125 ) );
// do a second dispatch and remove the argument from the setStartDate and
// therefore the value should return back to undefined
store.dispatch( setStartDate( ) );



// STEP 3: HANDLE THE SET START DATE ACTION GENERATOR IN THE FILTERS REDUCER

// go to -- Mark 10 --








// lecture 96: Filtering Redux Data

// in this video, we are going to be creating a single function that's going
// to allow us to actually filter and sort the expenses data

// at this point, if we add 4 expenses in, we will see 4 expenses in the counsel
// the single function mentioned above will run after our action generators,
// reducers and store have run

// get visible expenses
// will take 2 arguments: the expenses array and the filters object and using
// these 2 pieces of data, we can calculate what the visible expenses should
// look like

// startDate and endDate are timestamps and are in milliseconds
// timestamps start at January 1, 1970 ( known as the unix epoch )
// we will be using timestamps in this course as a way to store
// timezone independent time data


// change filters to text, sortBy, startDate, endDate
const getVisibleExpenses = ( expenses, { text, sortBy, startDate, endDate } ) => {
    // use filter to 
    // filter creates a brand new array from another array and does this by looking at
    // each item in the array and will call a function once for each item in the array
    // and the function will return true or false
    // if the function returns true then the current item will be passed into the new array
    // if the function returns false then the current item will not be passed into the new array
    return expenses.filter( ( expense ) => {
        // we will make 3 const to store whether or not we have a match
        // for text, if I enter in some search text I want to show the expenses that actually
        // use that text value somewhere
        // for our purposes, we are just going to check the description and not the notes

        // challange for textMatch
        // 1 -- figure out if expense.description is inside the text variable string
        // 2 -- use the includes method and convert both strings to lower case
        const textMatch      = expense.description.toLowerCase().includes( text.toLowerCase() );
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch   = typeof endDate   !== 'number' || expense.createdAt <= endDate;
        // if all three const above are true then we have a complete match and we want
        // to return true from filter
        return textMatch && startDateMatch && endDateMatch;


        // ---------------------------------------------------
        // lecture 97: Sorting Redux Data

        // now it's time to add sorting so we can get visible expenses
        // we want to be able to sort by date or sort by amount

        // we are going to look at 2 expenses and determine which one should come
        // before the other

        // sort gets called on an array and returns an array
        // when need to write a compare function or arguments ( a, b ) and then
        // compare them to determine which one comes first
    } ).sort( ( a, b ) => {
        // first thing we need to figure out are we sorting by date or amount
        if ( sortBy === 'date'  ) {
            // if we return -1 a would come first or if we return 1 b would come first
            // if a.createdAt < b.createdAt then we will show b first or have the
            // most recent expenses at the top of the list
            // use the ternary operator and if a.createdAt < b.createdAt then the
            // truthy value will be 1 ( b comes first ) otherwise a comes first
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        // challange
        // sort by amount and put the one with a greater amount first
        else if ( sortBy === 'amount' ) {
            return a.amount < b.amount ? 1 : -1;
        }
    });

    // ---------------------------------------------------
};


// TRACK CHANGES USING STORE.SUBSCRIBE

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

// set the first createdAt to one second after the unit epoch and set the second
// createdAt to one second before the unit epoch
store.dispatch( addExpense( { description : 'Rent', amount : 600, createdAt : 1000  } ) );
store.dispatch( addExpense( { description : 'Coffee', amount : 700, createdAt : -1000  } ) );

// put store.dispatch( setStartDate( 125 ) ); below for testing purposes
/*
store.dispatch( setStartDate( 125 ) );
*/

// remember, I have store.dispatch( setEndDate( 1250 ) ); below under action generator #8

// the result of the above is that addExpense( { description : 'Rent', amount : 600, 
// createdAt : 1000  } ) will be the only expense left in the array after applying the filter
// function above
// and this result will show up twice in the console, once we store.dispatch( setStartDate( 125 ) );
// runs and once when store.dispatch( setEndDate( 1250 ) ); runs

// so we can now sort by date
// so we will be able to add those calender pickers in be able to sort and view a subset of
// our expenses

// to test the text filter, run store.dispatch( setTextFilter( 'rent' ) ) and turn off
// store.dispatch( setStartDate( 125 ) ); above
// and store.dispatch( setEndDate( 1250 ) ); below
store.dispatch( setTextFilter( 'rent' ) );

// the result of running store.dispatch( setTextFilter( 'rent' ) ); is that 
// addExpense( { description : 'Rent', amount : 100, createdAt : 0 } )
// addExpense( { description : 'Rent', amount : 600, createdAt : 1000  } )
// will be the only expenses left in the array after applying the filter function above


// ---------------------------------------------------
// lecture 97: Sorting Redux Data

// to test the text sort, run store.dispatch( sortByAmount() )
// remember, the sortBy value is set to " date " by store.dispatch( sortByDate() );
// above so we need to change this to " amount " so the above sort call will work
// store.dispatch( sortByAmount() ); will change the sortBy value from " date "
// to " amount "
store.dispatch( sortByAmount() );

// the result of running store.dispatch( setTextFilter( 'rent' ) ); and
// store.dispatch( sortByAmount() ); is that 
// addExpense( { description : 'Rent', amount : 600, createdAt : 1000  } )
// addExpense( { description : 'Rent', amount : 100, createdAt : 0 } )

// lecture recap: redux is esstential to creating react applications that scale
// without something like redux our code is going to be a huge mess and it is
// going to be very difficult to scale and maintain
// with redux we will have an easy time creating those separate pages and
// allowing them to share data

// ---------------------------------------------------



// lecture 95: Wrapping Up Our Reducers


// SET_END_DATE for the filter array


// ==============================
// ACTION GENERATOR #8
// ==============================


// challange

// STEP 1: CREATE THE SET END DATE ACTION GENERATOR

// remember, no need to set the default value equal to undefined since the
// default value above is already set to undefined; also, if no
// argument is passed in then the default value will equal undefined anyway
// and this is the typical behavior of arguments
const setEndDate = ( endDate ) => ( {
    type : 'SET_END_DATE',
    endDate : endDate // could have just put " endDate "
} );


// STEP 2: DISPATCH THE ACTION GENERATOR FOR SET END DATE

// setEndDate is going to take the new date in and for now we will just
// use the number 1250
/*
store.dispatch( setEndDate( 1250 ) );
*/


// STEP 3: HANDLE THE SET END DATE ACTION GENERATOR IN THE FILTERS REDUCER

// go to -- Mark 11 --

// we now have a complete redux store for our application
// in the next section, we will integrate all of this into our react
// application






// lecture 97: Sorting Redux Data

// now it's time to add sorting so we can get visible expenses
// we want to be able to sort by date or sort by amount

// we are going to look at 2 expenses and determine which one should come
// before the other

// sort gets called on an array and returns an array
