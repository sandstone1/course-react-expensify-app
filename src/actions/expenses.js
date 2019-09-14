
//  we will need the uuid import for the AddExpense action generator
import uuid from 'uuid';
// see -- Mark 1 -- below for details
import database from '../firebase/firebase';
// we will need to set up the named exports
// format is " export const action generator name "



// ==============================
// ACTION GENERATOR #1
// ==============================


// we will destructure the first argument and if it doesn't exist we will destructure
// an empty object
// we can define all the things we want within the first {} within the argument
// we want the user to provide the value for description and note but if the user
// does not provide a value then an empty string will surfice
// next up, we default the amount to an appropriate value like 0
// next up, we default the createdAt to an appropriate value like 0 until we talk about
// timestamps
export const addExpense = ( expense ) => ( {
    type : 'ADD_EXPENSE',
    expense : expense
} );



// ==============================
// ACTION GENERATOR #2
// ==============================


// we need the id from the expense we are going to remove
export const removeExpense = ( { id } = {} ) => ( {
    type : 'REMOVE_EXPENSE',
    expense : {
        id : id
    }
} );




// ==============================
// ACTION GENERATOR #3
// ==============================


// pass in our 2 arguments: id and updates and neither need default values since we
// we don't have the ID and were not updating anything ( don't understand this last
// part ) 
export const editExpense = ( id, updates ) => ( {
    type : 'EDIT_EXPENSE',
    id, // remember this is equal to id : id
    updates // remember this is equal to updates : updates
} );


// ==============================
// ACTION GENERATOR #4
// ==============================

// -- Mark 1 --
// lecture 152: Asynchronous Redux Actions
// addExpense will dispatch an object and that object will change the redux store whereas
// startAddExpense is just going to start that process off and startAddExpense will dispatch
// addExpense inside the function below and that dispatch will change the redux store and in
// the past we always returned objects but in this case we are going to return a function and
// this function works because we set up the middleware for redux-thunk and by default doing
// something like this would not work

// the return function below gets called internally by redux and it gets called with dispatch
// as the argument and this gives us access to dispatch inside our return function and we
// use dispatch after we write some data to Firebase and after waiting for that data to correctly
// sync and then after that we will use dispatch to dispatch addExpense and we will make sure the
// redux store reflects those changes as well and if we going to be saving to Firebase inside the
// return function we will need to restructure addExpense above so instead of having the
// default in the addExpense action generator we want to put the default key value pairs inside
// the return function and will switch up how we set those defaults in the argument to
// startAddExpense

// we will call the argument to startAddExpense " expenseData " and by default set it equal to an
// empty object and set up a const inside the return function and destructure a bunch of stuff and
// we'll destructure from expenseData and then copy the addExpense argument and place it inside the
// const object below and this is exactly the same argument as we had in the addExpense action
// generator and since we are setting up the defaults below that means addExpense can get a whole
// lot simplier

// the next thing we are going to do is use push to save some data to Firebase and we first need
// to import the database variable into this file so we will do this above:
// " import database from '../firebase/firebase'; " and then we can use the database variable below
// and we will get a reference to " expenses " and then we will push an expense, which is an object,
// into our Firebase database and we will create an variable for this object
// and call it expense and then pass that variable into push()
// and then we can attach the then call and at this point what is going to happen? the function
// will run and then we will take all the data or expenseData and save the data to Firebase and at
// this point there is still an important step left and that step is to dispatch the addExpense
// action generator from above and change the addExpense action generator above to this:
/*
export const addExpense = ( expense ) => ( {
    type : 'ADD_EXPENSE',
    expense : expense
} );
*/

// and yes we broke some test cases and we will fix those in the next video but for now let's focus
// on getting this functionality working and what are we trying to add as the argument to the
// addExpense call below? we are trying to add the expense we just created in the expense variable
// up above and we have to include the ID as well in the addExpense call and the good news for us
// is that the then callback or success case gets called with a reference and we can access that
// reference by including the reference as the argument to then() and we'll call the reference
// " ref " and we can access the ref and do something meaningful with it and in our case we'll use
// ref to get the id by creating an object inside the addExpense call and defining the ID as
// follows: " id : ref.key " and then we'll tack on all the properties in expense by using
// the spread operator or " ...expense "
export const startAddExpense = ( expenseData = {} ) => {

    return ( dispatch ) => {

        const {
            description = '',
            note        = '',
            amount      = 0,
            createdAt   = 0
        } = expenseData;

        const expense = { description, note, amount, createdAt };

        // add return below and see -- Mark 1 -- of lecture 153: Testing Async Redux Actions:
        // Part 1 for details on why we added the return keyword below
        return database.ref( 'expenses' ).push( expense ).then( ( ref ) => {
            
            dispatch( addExpense( { 
                id : ref.key,
                ...expense
            } ) );
        
        } );

    };

};

// and there we have it, this is all we need to do inside expenses.js and the last step before this
// is going to work is to make sure we dispatch startAddExpense as opposed to dispatching
// addExpense and

// -- go to the AddExpensePage component page --

// and change:
// " import { addExpense } from '../actions/expenses'; " to
// " import { startAddExpense } from '../actions/expenses'; ""

// and change:
// " addExpense : ( expense ) => dispatch( addExpense( expense ) ) " to
// " startAddExpense : ( expense ) => dispatch( startAddExpense( expense ) ) "

// and change:
// " this.props.addExpense( expense ); " to 
// " this.props.startAddExpense( expense ); "

// with these changes in place we are all done and we can test this out and test this out by
// creating an expense and what we hope to see is the expense showing up in the browser meaning it
// was added to redux and we are also hoping the expense shows up in our Firebase database and
// after I add an expense in the expensify site I get redirected to the home page and I see my
// expense listed meaning it was added to the redux store and when I go to Firebase I see our
// new expense listed in the database

// so by using redux-thunk were going to be able to create asynchronous actions and these actions
// will do something first soemthing asynchronous like make a Firebase data call and then these
// actions will use dispatch to actually change the redux store

// remember, this is just one of our 4 CRUD operations so we have create done but were still not
// reading from Firebase but if we do a page refresh we lose the data and this is expected for the
// moment and we'll read from Firebase in just a little bit but what I want to focus on in the
// next video though is how we can test the code we just wrote in this video and we want to make
// sure that everything we expect to happen actually happens and we will change some test cases
// for things we changed in this video and remember we changed the addExpense action generator so
// we have some breaking test cases there and we changed the AddExpensePage component so we will
// need to make some changes to that test case as well


// -- END OF MARK 1 --




// -- Mark 2 --
// lecture 157: Fetching Expenses: Part 1

// were going to be adding 2 new exports and the first export will be responsible for changing
// the redux store and the second export will be our asynchronous action generator and will be
// responsible for fetching data from Firebase and we will define both action generators down
// below

// let's start off with the action generator that will manipulate the redux store and we will
// implicitly return an object and this action generator will allow us to set the array values
// for expenses

// remember, we have to set the type and we have to provide the data or expenses and now that we
// have this in place we can add a test case that makes sure we get the right structure back

// ==============================
// ACTION GENERATOR #5
// ==============================
export const setExpenses = ( expenses ) => ( {
    type     : 'SET_EXPENSES',
    expenses : expenses
} )



// ==============================
// GO TO TESTS/ACTIONS/EXPENSES.TEST.JS -- GO TO -- Mark 5 --
// ==============================


// End of -- Mark 2 --



// -- Mark 3 --
// lecture 158: Fetching Expenses: Part II


// the startSetExpenses function will look similiar to asynchronous function startAddExpense
// above


// ==============================
// GO TO SRC/APP.JS -- GO TO -- Mark 6 --
// ==============================


// ==============================
// BACK FROM SRC/APP.JS
// ==============================


// now if we go the expensify app in the browser we see " Loading ... " but we are getting
// some errors and startSetExpenses should do the following:
// STEP 1: startSetExpenses will need to fetch all expense data using the once() method and then
// STEP 2: startSetExpenses will need to parse that data into an array and we did something
// similar in the firebase.js file and that code is below:
/*

// so we will iterate over snapshot and the argument will be childSnapshot and we are going to go
// ahead and define an array or " const expenses = []; " and were going to iterate over all of the
// child snapshots ( each child snapshot represents one expense ) and toss each child snapshot
// into the array by using " snapshot.forEach( ( childSnapshot ) => { expenses.push( { childSnapShot 
// } ); } ); so we are going to use .push() to push items into the array and what are we going to
// push into the array? we are going to push in an object so we will have an array of objects and
// we can use our objects in a way that makes sense for us and each object needs an ID so let's
// start there

// every reference inside Firebase is to a specific location and to get access to any specific
// part of the database by using the property " key " so we can get the id for each expense located
// in the Firebase database by typing " childSnapshot.key " and now that we have this in place we
// can toss on other key value pairs and to do that we will use the spread operator or
// " ...childSnapshot.val() " so essentially what were doing is creating a new array so were
// iterating over all the snapshots and were creating a new item in the array for each snapshot
// and at the end of the day were going to have something that is actually useful to us

database.ref( 'expenses' )
    .once( 'value' )
    .then( ( snapshot ) => {

        const expenses = [];

        snapshot.forEach( ( childSnapshot ) => {

            expenses.push( {

                id : childSnapshot.key,
                ...childSnapshot.val()

             } );

        } );

        // so we can use console.log( expenses ) to see what the transformed data looks like and go to
        // the expensify site to view
        console.log( expenses );

    } );

// and what are we getting in the console? we are getting an array and each item in the array is an
// object and on each object we have: amount, createdAt, description, id and note and this is the
// exact structure we need in order to integrate Firebase with our application

*/

// above, we logged the expenses array to the counsel but in this example, we will need to dispatch
// the expenses array and then in
// STEP 3: startSetExpenses needs to dispatch SET_EXPENSES to the reducer so that the data actually
// changes inside the redux store and remember the following:

// ******************

// in this video ( lecture 86 ), you're going to learn all about actions and actions allow us to
// change the redux store values and an action is an object that gets sent to the store and this
// object describes the type of action we would like to take and in this video, we will have
// actions like: (1) increment, (2) decrement and (3) reset and
// this will allow us to change the store over time by discpatching various actions
// and dispatch allows us to send off an action object and then the
// store can do something with this information; for example, it can take the count and increase it
// by one and these actions are sent to a redcuer and the reducer determines what to do based off
// an action ( i.e, the reducer determines what to do in the switch statement below based on the
// action.type ) and what is a reducer? from redux.js.org: " Reducers specify how the application's
// state changes in response to actions sent to the store. Remember that actions only describe what
// happened, but don't describe how the application's state changes. "

// *******************

// and if we complete the 3 steps above everything should work as expected and we should start
// seeing the data from the development server showing up and we should be able to refresh and
// still see the data and I believe this happens since everytime we load the page, app.js will run
// and as soon as app.js runs, the following code will run or startSetExpenses will run:
/*
store.dispatch( startSetExpenses ).then( () => {
    ReactDOM.render( jsx, document.getElementById( 'app' ) );
} );
*/

// ==============================
// ACTION GENERATOR #6
// ==============================

// the action generator below will fetch the expenses data from the Firebase database and then
// dispatch setExpenses with the expenses data as the argument to setExpenses which will then
// update the redux store and this will all happen before the site is rendered ( see app.js
// for details ) and remember startSetExpenses is an asynchronous action

// since we are just going to be fetching expenses the startSetExpenses argument doesn't need to
// take any arguments in
export const startSetExpenses = () => {

    // the return function has access to dispatch 
    return ( dispatch ) => {

        // in this case, what we need to do is fetch from Firebase and access a single time all
        // of the data from Firebase using once() and then we will toss on then() and inside
        // the then() call we will add our success case and once we get the data back we want
        // to parse it and remember snapshot will give us an object structure and we will need
        // to make sure it gets converted into an array structure and we need to toss a return
        // before database.ref() ... and this will create a promise that we can then use inside
        // app.js and the then() call below in store.dispatch() ... in app.js handles that promise
        // created below by " return database.ref() ... "
        /*
            store.dispatch( startSetExpenses ).then( () => {
                ReactDOM.render( jsx, document.getElementById( 'app' ) );
            } );
        */

        return database.ref( 'expenses' ).once( 'value' ).then( ( snapshot ) => {
    
            const expenses = [];
    
            snapshot.forEach( ( childSnapshot ) => {
    
                expenses.push( {
    
                    id : childSnapshot.key,
                    ...childSnapshot.val()
    
                 } );
    
            } );
            
            // now that we have access to the built up expenses array from above, all we need
            // to do is dispatch setExpenses and the setExpenses action generator just expects an
            // array of expenses as the argument to setExpenses() so we just pass in " expenses "
            dispatch( setExpenses( expenses ) );
    
        } );
 
    };

};


// ==============================
// GO TO TESTS/ACTIONS/EXPENSES.TEST.JS -- GO TO -- Mark 6 --
// ==============================


// End of -- Mark 3 --




// -- Mark 4 --
// lecture 159: Remove Expense


// ==============================
// ACTION GENERATOR #7
// ==============================

export const startRemoveExpense = ( { id } = {} ) => {

    // the return function has access to dispatch and we will return a function that will do some
    // asynchronous work and in this case communicate with Firebase and then dispatch an action to
    // change the redux store and dispatch gets passed to the return function by the redux library
    // 
    return ( dispatch ) => {

        // include return below since we are going to want to return a promise
        return database.ref( `expenses/${ id }` ).remove().then( () => {
              
            dispatch( removeExpense( { id } ) );
    
        } );
 
    };

};



// End of -- Mark 4 --