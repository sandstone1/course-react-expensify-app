
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
