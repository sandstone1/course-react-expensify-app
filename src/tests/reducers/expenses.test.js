
// let's kick things off by importing the reducer
import expensesReducer from '../../reducers/expenses';
// ==============================
// FROM TESTS/FIXTURES/EXPENSES.JS
// ==============================
// lecture 117: Testing Expenses Reducer
// import the fixtures default export so we can use the dummy data in our test cases below
import expenses from '../fixtures/expenses';


// now that we have the expensesReducer import in place, let's start adding our test cases
// the first test case will make sure the default state gets set to an empty array

// TEST CASE #1
test( 'should set default state', () => {
    // once again, we will dispath the init action
    // we will create a const called state and set it equal to whatever comes back from calling
    // the expensesReducer and we can call the expensesReducer with an undefined state value since
    // the we are trying to test the default state values and we will use the action object for
    // init and type " type = '@@INIT' " and the init action object will help us determine whether
    // or not our default values are set correctly and remember " type: @@init " is the first
    // action object that redux dispatches
    const state = expensesReducer( undefined, { type : '@@INIT' } );

    // now that we have the above in place, we can make an assertion as to what should come back
    // so we are going to expect the state value to equal an empty array
    expect( state ).toEqual( [] );
} );


// checked the terminal and we see that test case #1 passed
// for the test cases, remove expense and edit expense we are going to need test data that we
// can work with or in other words we are going to need data that we can pass in as the first
// argument and then were going to make sure things change and this is very similar to the
// selectors/expenses.test.js file in that we had 3 objects inside an array that served as our
// baseline test data that all of our test cases could work off of and we could pass in the
// array and make assertions as to what came back and we will do the exact same thing for this
// reducer and we will create a separate file that contains the baseline expenses array from
// selectors/expenses.test.js and we will then import this array into selectors/expenses.test.js
// and into this file and we will create a new folder for this array called fixtures or
// tests/fixtures and in the test world a fixture is just your baseline test data so you can
// thonk of it as dummy data and we will create a new file inside the fixtures folder called
// expenses.js


// ==============================
// GO TO TESTS/FIXTURES/EXPENSES.JS
// ==============================

// ==============================
// BACK FROM TESTS/FIXTURES/EXPENSES.JS
// ==============================


// now that we have our dummy data imported above ( import expenses from '../fixtures/expenses'; ),
// we can move on to the remaining test cases and making sure the test cases are manipulating that
// array as expected

// so now we will create 5 new test cases and 2 we will do together and 3 I will do on my own
// were going to be testing remove expense together and we will create 2 test cases for remove
// expense, one where we enter a valid ID and make sure the expense is removed and then we will
// create another test case where we try to remove an expense with an ID that does not exist and
// will make sure that this expense is not removed in this case

// TEST CASE #2
test( 'should remove expense by id', () => {
    // first, were going to set up a separate variable for our action object and we need
    // the type and the id, which are the 2 things we are expecting for the action object below
    // and we're going to use a real id for this test case so let's look at our
    // fixtures/expenses.js file and pick out an expense to remove and the instructor decided to
    // remove the expense with an id of #2
    const action = {
        type : 'REMOVE_EXPENSE',
        expense : {
            id : expenses[ 1 ].id
        }
    };

    // now that we have the action object set up we can disatch it and by dispatch it the
    // instructor just means to call the expenses reducer and const state will be the return
    // value and we call the expensesReducer with the first argument being the dummy test data
    // from the expenses array located in the fixtures/expenses.js file and this array represents
    // the expenses " state " and the second argument will be our action variable from up above
    const state = expensesReducer( expenses, action );

    // now we should have the new expenses array coming back with just 2 items because the second
    // item in the array should have been removed when we called the expensesReducer()
    // so we expect the state value to equal the first and third items in the expenses array
    // and remember inside the toEqual call we have to enclose the first and third items inside
    // the array syntax or [ ]
    expect( state ).toEqual( [ expenses[ 0 ], expenses[ 2 ] ] );    
} );

// now we can go to the terminal and see that TEST CASE #2 is passing

// now the next test case we're going to write is bascially going to be the opposite of TEST CASE
// #2
// TEST CASE #3
test( 'should not remove expense if id not found', () => {
    // first, were going to set up a separate variable for our action object and we need
    // the type and the id, which are the 2 things we are expecting for the action object below
    // and we're going to use a fake id for this test case and let's use some character that does
    // not exist in the fixtures/expenses.js file and instuructor used '-1'
    const action = {
        type : 'REMOVE_EXPENSE',
        expense : {
            id : '-1'
        }
    };

    // now that we have the action object set up we can disatch it and by dispatch it the
    // instructor just means to call the expenses reducer and const state will be the return
    // value and we call the expensesReducer with the first argument being the dummy test data
    // from the expenses array located in the fixtures/expenses.js file and this array represents
    // the expenses " state " and the second argument will be our action variable from up above
    const state = expensesReducer( expenses, action );

    // now we should have the expenses array coming back with all 3 items because none of items in
    // the array should have been removed
    // so we expect the state value to equal the first, second and third items in the expenses
    // array and remember inside the toEqual call we have to enclose the first, second and third
    // items inside the array syntax or [ ] or we could just put the expenses array inside the
    // toEqual() call, like this: " expect( state ).toEqual( expenses ); "
    expect( state ).toEqual( [ expenses[ 0 ], expenses[ 1 ], expenses[ 2 ] ] );
} );

// now we can go to the terminal and see that TEST CASE #3 is passing

// we have 3 more test cases and I will do these 3 on my own
// will do one test case for adding an expense and for adding an expense we are going to assert
// that the array that comes back has another item added to the array and has the values that I
// set up
// will do 2 test cases for editing an expense, one with a real id and another one with a fake id

/*
// TEST CASE #4 - VERSION #1
test( 'should add an expense', () => {
    // values came from the instructor
    const expense = {
        id          : '109',
        description : 'Laptop',
        note        : '',
        amount      : 29500,
        createdAt   : 20000       
    }
    const action = {
        type    : 'ADD_EXPENSE',
        expense : expense
    };

    // now we need to pass the above action object into the reducer
    const state = expensesReducer( expenses, action );

    // now we need to make an assertion and we are going to expect that the state array that comes
    // back will equal the following
    expect( state ).toEqual( [ ...expenses, expense ] );
} );
*/

// now we can go to the terminal and see that TEST CASE #4 - VERSION #1 is passing

// TEST CASE #4 - VERSION #2
// compared to VERSION #1, VERSION #2 more closely matches our addExpense action generator and our
// expensesReducer function
test( 'should add an expense', () => {
    const action = {
        type    : 'ADD_EXPENSE',
        expense : {
            id          : '109',
            description : 'Laptop',
            note        : '',
            amount      : 29500,
            createdAt   : 20000               
        }
    };

    // now we need to pass the above action object into the reducer
    const state = expensesReducer( expenses, action );

    // now we need to make an assertion and we are going to expect that the state array that comes
    // back will equal the following
    expect( state ).toEqual( [ ...expenses, action.expense ] );
} );

// now we can go to the terminal and see that TEST CASE #4 - VERSION #2 is passing


// TEST CASE #5
test( 'should edit an expense', () => {
    // instructor changed the amount to 122000
    const amount = 122000;
    // updated the amount in the second item in the expenses array 
    const action = {
        type    : 'EDIT_EXPENSE',
        id      : expenses[ 1 ].id,
        updates : {
            amount : amount
        }
    };

    // now we need to pass the above action object into the reducer
    const state = expensesReducer( expenses, action );

    // we want to assert that the second item in the expenses array now has a different amount
    // value and we expect the second item in the expenses array to have an amount equal to
    // the amount variable above
    expect( state[1].amount ).toBe( amount );
} );

// now we can go to the terminal and see that TEST CASE #5 is passing


// TEST CASE #6
test( 'should not edit an expense if id not found', () => {
    // instructor changed the amount to 122000
    const amount = 122000;
    // updated the amount in the second item in the expenses array but use a fake id or -1
    const action = {
        type    : 'EDIT_EXPENSE',
        id      : '-1',
        updates : {
            amount : amount
        }
    };

    // now we need to pass the above action object into the reducer
    const state = expensesReducer( expenses, action );

    // since we have a fake id in the action object above we can assert that the expenses array
    // will stay the same or we expect the state value to equal the expenses array or in other
    // words we expect nothing to change
    expect( state ).toEqual( expenses );
} );

// now we can go to the terminal and see that TEST CASE #6 is passing

// now, we've tested every part of our application except for the components ( we've tested
// our action generators, reducers and selectors ) and the components are going to be pretty
// tricky so we will spend a good deal of time on those





// -- Mark 1 --
// lecture 157: Fetching Expenses: Part 1

// the test case below will make sure setExpenses actually works and what we will need to do
// is dispatch an action just like we've done for all the other test cases and at the end
// of the day we should expect all the expenses we passed in to be inside of the state and you
// expect any that might exist to be gone  

// TEST CASE #7
test( 'should set expenses', () => {
    // define my action object  
    const action = {
        type     : 'SET_EXPENSES',
        // need to set expenses equal to an array
        expenses : [ expenses[ 1 ] ]
    };


    // now we need to pass the above action object into the reducer
    const state = expensesReducer( expenses, action );

    // and remember, although we started off with all of our expenses or " expenses " in the
    // expensesReducer above, we expect that what will come back will be an array with the
    // expenses[ 1 ] object inside the array and this follows the same structure as our expenses
    // data inside the tests/fixtures/expenses.js file
    expect( state ).toEqual( [ expenses[ 1 ] ] );
} );

// now if we go to the terminal and view our test suite, we see this test case is passing

// next, we need to set up our asynchronous action or the one that goes off and fetches data
// from Firebase and once we have our asynchronous action in place we have to use it somewhere
// in our application or it will never run and this is what we are going to get done in the
// next video

// End of -- Mark 1 --

