
// our Jest test files are run through babel so we will be able to use
// all the great ES6, ES7 and ES8 features we've been using so far throughout the course
// start by importing the action generators from actions/expenses.js

// -- Mark 1 --
// lecture 153: Testing Async Redux Actions: Part 1
// add the named export startAddExpense below
import { startAddExpense,
         addExpense,
         removeExpense,
         editExpense,
         setExpenses,
         startSetExpenses,
         startRemoveExpense } from '../../actions/expenses';
// import the expense fixture data
import expenses from '../fixtures/expenses';
// import in our mock store functionality
import configureMockStore from 'redux-mock-store';
// if we are going to be using this mock store it also has to have the same middleware or
// it needs Thunk
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
// End of -- Mark 1 -- 
// Continue to -- Mark 1 -- Below


// -- Mark 4 --
// lecture 157: Fetching Expenses: Part 1
// first, we will use the lifecycle method beforeEach() and all were going to do is write some data
// to Firebase 
beforeEach( ( done ) => {
    // create the expenses variable that we will use inside set() below
    const expenseData = {};
    // loop over the expenses array in the the fixtures/expense.js and add each expense item
    // into the expenseData object and from there we can set up each expense item in the correct
    // format so that it works with Firebase and within the arrow function argument below we want
    // to destructure id, description, note, amount and createdAt or in other words we want to
    // pull these values off each expense item in the expenses array and the values are represented
    // below by the keys listed in the argument below and then we want to format these
    // values so they fit the Firebase format and what are we trying to do here? were trying
    // to set an object equal to the id and the id acts as the index for each object
    expenses.forEach( ( { id, description, note, amount, createdAt } ) => {

        expenseData[ id ] = { description, note, amount, createdAt };
        // could have done this instead and the below is equal to the above line of code
        // expenseData[ id ] = { description : description, note : note, amount : amount, 
        // createdAt : createdAt };

    } );

    // now, we will set some data on Firebase
    // now, we do have one probem and that is beforeEach() is not going to wait for
    // " database.ref( 'expenses' ).set( expensesData ); " to complete before it allows
    // the test cases below to run which means that some test cases might actually run
    // before the data gets saved to the Firebase database and to solve this problem we can once
    // again use " done() " and remember to include done in the argument up above and we will add
    // a then() call to " database.ref( 'expenses' ).set( expensesData ); " so that once this
    // completes or once data is added to the database then we will run a callback function inside
    // the then() call and that callback function will just include done(); and after done() runs
    // then the test cases below will run
    database.ref( 'expenses' ).set( expenseData ).then( () => {
        done();
    } );
} )

// now we can view this in real time and go to the terminal and run the test suite then go to
// Firebase and view the test database and beforeEach() will wipe the database clean with each
// test case so what we see in the test database is one expense for test case #6 below

// after running beforeEach() above, we end up with the following expense data in the test
// database:
/*
expenses
    1
        amount: 195
        createdAt: 0
        description: "Gum"
        note: ""
    2
        amount: 109500
        createdAt: -345600000
        description: "Rent"
        note: ""
    3
        amount: 4500
        createdAt: 345600000
        description: "Credit Card"
        note: ""
    -Lo3FLcAS8cufzbrmt2H
        amount: 0
        createdAt: 0
        description: ""
        note: ""
*/

// if we remove done() from the callback above, we end up with the following expense data in the
// test database:
/*
expenses
    1
        amount: 195
        createdAt: 0
        description: "Gum"
        note: ""
    2
        amount: 109500
        createdAt: -345600000
        description: "Rent"
        note: ""
    3
        amount: 4500
        createdAt: 345600000
        description: "Credit Card"
        note: ""
*/

// so now that we have this in place and we have some dummy data set up, now we can move
// on to use this dummy data to test a real feature



// ==============================
// GO TO SRC/ACTIONS/EXPENSES.JS -- GO TO -- Mark 2 --
// ==============================



// End of -- Mark 4 -- 




// so the goal is to call these functions and assert something about the return value

// were going to start off by testing remove expense
// STEP 1: create the test case
// TEST CASE #1 - removeExpense
test( 'should setup remove expense action object', () => {
    // just like before, we want to call some function and then assert something
    // about what comes back
    const actionResult = removeExpense( { id : '123abc' } );

    // so what would we expect on this object?
    // we would expect a type property equal to 'REMOVE_EXPENSE' and an id equal
    // to '123abc'
    // now, toBe() will not work for this code because when we use triple equas ( === )
    // to compare 2 objects were never find that they are equal
    // for example, if we go into the counsel and check if {} === {} we will see that
    // it always results to false and the same thing is true for an array [] === []
    // so what we need to do is check the properties / values on the object and see if
    // they are all equal and the Jest assertion library does support this and we will
    // use the toEqual() method instead and toEqual() will go over your array or object
    // and assert that the properties / values are all the same

    // so when we using objects or arrays then we want to use toEqual() but if were using
    // booleans, numbers or strings then we want to use toBe()
    expect( actionResult ).toEqual( {
        type : 'REMOVE_EXPENSE',
        expense : {
            id : '123abc'
        }
    } );

});

// at the end of the day, toEqaul will correctly iterate over all of the properties of our
// object and at the end of the day we will see a passing test case / result in the terminal
// and now we see we have 2 test suites, one from the add.test.js file and one from
// the expenses.test.js file

// now let's move on to testing sometihng else

// challange
// write a test case for the editExpense action generator to make sure the generator returns
// the correct stuff and for the update object, the instructor recommended we go with a simple
// update object like { note : ' New note value ' } so we will
// (1) set up the test case
// (2) call editExpense
// (3) make an assertion
// TEST CASE #2 - editExpense
test( 'set up edit expense action generator', () => {

    // for the updates object, we could have updated description, createdAt or amount instead
    // of updating note
    const actionResult = editExpense( '123abc', { note : 'New note value' } );

    // so we are going to expect the actionResult object to equal the following object within
    // the toEqual() call
    expect( actionResult ).toEqual( {
        type    : 'EDIT_EXPENSE',
        id      : '123abc',
        updates : {
            note : 'New note value'
        }
    });

    // if we changed the updates object within toEqual() to " note : 'New note valuee' " then we
    // would get an error in the console saying:
    // expected "note" : "New note valuee"
    // received "note" : "New note value"

});


// now, let's move on to the more complex action generator or addExpense and for this one
// we are going to write 2 test cases and one of the test cases will make sure that the values
// passed in get used and the other test case will make sure the default values get set up
// correctly when nothing is passed in

// TEST CASE #3 - addExpense
test( 'set up add expense action object with provided values', () => {
    // -- Mark 1 --
    // lecture 153: Testing Async Redux Actions: Part 1
    // now that we are using Firebase we would expect the argument to addExpense to be called
    // with an id property and corresponding value and expenseData below is being called with
    // just the expense data so let's comment out expenseData below and add in one of our
    // expense fixtures which include id values and we will need to import this file above
    // and use expenses[ 2 ] as the argument below for our addExpense call
    // End of -- Mark 1 -- 
    // Continue to -- Mark 1 -- Below

    // we will kick things off by defining the data that I'm going to pass into the addExpense
    // action generator and we will be passing in an object with 4 properties and remember,
    // createdAt is set to 1000 milliseconds into the year 1970
    /*
    const expenseData = {
        description : 'Rent',
        amount      : 195000,
        createdAt   : 1000,
        note        : 'This was last month\'s rent'
    };
    */
    // so we have the expense data in place and now we will pass it into the addExpense action
    // generator
    const actionResult = addExpense( expenses[ 2 ] );

    // now, the goal is to make an assertion and this one if different than the ones that came
    // before since id will equal a dynamic value and there is no way to predict what that value
    // will be so to work around this we will have to learn a " new trick "; however, let's get
    // started with what we do know and use toEqual since we are comparing 2 objects and these
    // properties are static and we can just spread out the expenseData and if we leave out
    // id and go to terminal and review our test suite we see we have a failing test case and
    // the failure is pointing to the fact that we have no id property and id value in the
    // toEqual({ }) object below
    
    // the output from test suite if we leave out id is as follows:
    // " expect(received).toEqual(expected)
    // Expected value to equal: {"expense": {"amount": 195000, "createdAt": 1000, "description":
    // "Rent", "note": "This was last month's rent"}, "type": "ADD_EXPENSE"}
    // Received: {"expense": {"amount": 195000, "createdAt": 1000, "description": "Rent", "id":
    // "0d240d58-d21c-462f-bf8f-af40d9fb489f", "note": "This was last month's rent"}, "type":
    // "ADD_EXPENSE"} "
    // so we receive an id property and id value but we didn't expect it

    // so what can we do about id? we'll let's look at the Jest docs and we can use expect.any()
    // and expect.any() allows us to assert something about the type so we could say
    // " hey, we expect this to be an object, a boolean, a number, a string or whatever we
    // want " and in our case, we just want to assert that the type is a string and we
    // really don't care what the value is since that value is subject to change so we will
    // type " id : expect.any( String ) " and now if we look at our test suite in the terminal
    // we will see that all of our test cases are passing

    // in other words, we did get back all the data we explicitly set up and we did get a string
    // back for id so this test is now considered a success

    // -- Mark 1 --
    // lecture 153: Testing Async Redux Actions: Part 1
    // change
    /*
        expense : {
            ...expenseData,
            id : expect.any(String)
        }
    */
    // to
    /*
        expense : expenses[ 2 ]
    */
    expect( actionResult ).toEqual({
        type    : 'ADD_EXPENSE',
        expense : expenses[ 2 ]
    });

    // when we go to the terminal we now see that this test case passes

});


// now were going to focus on adding some new test cases for the new asynchronous action generator
// or startAddExpense() and the goal here is to add 2 more test cases and the first additional test
// case is below

// we will provide our own default values for test case #5 and we are going to need to learn a
// few new tricks and the first thing we will need to figure out is how we can create a mock store
// and we will create a fake redux store for testing purposes and this will allow us to make the
// correct assertions and when we look at the startAddExpense function, what do we care about?
// we care that the database was successfully updated and we care that the correct action was
// dispatched and if those 2 things happen we are happy and would consider our test case a success
// so all we need to do is make an assertion about those 2 things but figuring out if an action was
// dispatched is not easy with the regular redux store but lucky for us there is a test module for
// the redux store that makes it super easy to mock and over in the browser we can take a quick
// peak at this and google redux-mock-store and then go to the correct page and we will go through
// the process of creating a mock store and dispatching things to it using store.dispatch() and
// finally were going to use store.getActions() to get the actions back so we can assert that
// the correct ones were dispatached and now let's put all of this into practice

// first step is to install redux-mock-store
// #31
// redux-mock-store: I USED NPM HERE INSTEAD OF YARN and in the terminal and I typed
// "npm install redux-mock-store@1.2.3" but could have typed "yarn add redux-mock-store@1.2.3"
// lecture 153: Testing Async Redux Actions: Part 1

// install redux-mock-store and then restart our test suite and we will integrate the
// redux-mock-store into our test cases below and now we need to import the redux mock store and
// thunk in the import section above

// now we will use the configureMockStore function and create a const called createMockStore and
// this will be something we call over and over again in our test cases so right now we are not
// actually creating the mock store but we are creating the configuration so we can allow the test
// cases to all create the same mock store and createMockStore will equal a function and we will
// call this function in just a little bit but first set createMockStore equal to
// configureMockStore( [] ) and we will pass in an array of middleware that we want to use and
// that middleware is thunk and now that we have createMockStore all set up we can actually create
// a mock store inside test case #5
const createMockStore = configureMockStore( [ thunk ] )


// TEST CASE #5 - addExpense
test( 'should add expense to the database and store', ( done ) => {
    // create a const called store and set it equal to createMockStore and we will pass to it
    // the default data and in the case below we will just provide an empty object
    const store = createMockStore( {} );

    // so now that we have this mock store in place, we can use store.dispatch on the mock store
    // to dispatch our asynchronous actions but first have to import startAddExpense above and we
    // will pass in startAddExpense to the dispatch call and remember startAddExpense does take
    // some initial data in as the default argument and that data is description, note, amount and
    // createdAt so let's create a const and set it equal to an object with those 4 key value pairs
    // and we will use dummy data to represent the 4 key value pairs
    const expenseData = {
        description : 'Mouse',
        note        : 'This one is better',
        amount      : 3000,
        createdAt   : 1000
    };

    // now that we have all this place all we need to do is pass in the expenseData object to
    // startAddExpense so at this point our asynchronous action is going to run but we really don't
    // have a way to set up an asynchronous test case and the goal is to wait for the Firebase call
    // to finish running and then and only then are we going to be ready to make our assertions
    // and to get this done we are going to have to use promise chaining amd this is the ability
    // to chain calls on promises and we will see what this does and how this will help us right
    // here and to play around with promise chaining we can open the playground/promises.js file
    // real quick and the big picture goal is to do multiple things for a promise and in this test
    // case we want to make assertions as to whether or not everything went well and we can chain
    // promises or add on second then() call after the first then() and
    // -- go to the playground/promises.js file -- Mark 7 --
    // -- back from the playground/promises.js file -- Mark 7 --

    // now, that were back from the playground/promises.js file -- Mark 7 -- file, how do we attach
    // then? and what we need to do is change the following in the actions/expenses.js file and we
    // change from this ( we add in the return keyword ):
    /*
        database.ref( 'expenses' ).push( expense ).then( ( ref ) => {
            
            dispatch( addExpense( { 
                id : ref.key,
                ...expense
            } ) );
        
        } );
    */
    // to this:
    /*
        return database.ref( 'expenses' ).push( expense ).then( ( ref ) => {
            
            dispatch( addExpense( { 
                id : ref.key,
                ...expense
            } ) );
        
        } );
    */

    // and so this will return database.ref() ... and when we get it returned we can then add on
    // a then() call to dispatch so by making the change above ( adding the return keyword ) we
    // can add on a then() callback below

    // remember when working with asynchronous test cases in Jest we need to tell Jest that a given
    // test case is asynchronous since " store.dispatch( startAddExpense( expenseData ) ).then(); "
    // doesn't run until long after parent arrow function has run so Jest may miss some errors that
    // are thrown unless Jest knows that we are working with asynchronous data in test case #5

    // so if we want to tell Jest to wait until a specific point in time we need to provide an
    // argument in parent function and go to the parent function argument above and provide the
    // argument " done " and so this test case is no longer going to be considered a success or
    // failure until after we call done and we will call done inside the then() callback and this
    // will have the effect of forcing Jest to wait until this point in time and if we add in
    /*
    expect(1).toBe(2); then this test case will fail because our assertion will fail but
    expect(1).toBe(1); will pass
    */

    // we are going to stop lecture 153: Testing Async Redux Actions: Part 1 at this point and
    // will continue with Part 2 in the next video

    // recap: in this video, we did a couple important things, first, we fixed all the failing
    // test cases from things we broke in the last video and we also learned about promise chaining
    // which allows us to attach then calls onto promises from elsewhere in our code and in our
    // case we set up " store.dispatch( startAddExpense( expenseData ) ) " to return a promise
    // and we did this when we added the return keyword to 
    // " database.ref( 'expenses' ).push( expense ).then( ( ref ) => { " inside the startAddExpense
    // function and since this " database.ref( 'expenses' ).push( expense ).then( ( ref ) => { "
    // now returns a promise, we can add a then() callback to it and add our assertions inside the
    // then() call and then call done() when we are done making our assertions and in the next
    // video we are going to continue going through this process and adding the correct stuff
    // inside our then() call
    // END OF -- Mark 1 --

    // -- Mark 2 --
    // lecture 154: Testing Async Redux Actions: Part 2
    // we need to figure out how we can get all actions dispatched to our mock store and if we
    // head over to the documentation for that library or redux-mock-store and the redux-mock-store
    // supports the exact same API that your regular redux store supports so we have an ability
    // dispatch and we can get the state but we have other access to other methods like
    // getActions() and clearActions() and were going to be using getActions to get all of the
    // actions that were dispatched to this mock store and then we can make some assertions about
    // them and see if what comes back is what we expected so below let's get all the actions
    store.dispatch( startAddExpense( expenseData ) ).then( () => {
        // store.getActions() will return an array of all actions where actions[ 0 ] would be
        // the first action object and in our case we only expect one action to get dispatched
        // so we create the mock store up above and then dispatch the following:
        // " store.dispatch( startAddExpense( expenseData ) ) " and if we follow the chain of
        // events the actual object that gets dispatched happens in the actions/expenses.js file
        // and that object is:
        /*
            dispatch( addExpense( {
                id : ref.key,
                ...expense
            } ) );
        */
        // and this is the only time we will be changing the store so we can make an assertion
        // about the object or we will expect something about that first action or the only one
        // that exist and we are going to expect it to equal the following action object
        const actions = store.getActions();
        // can use the expect library to check for any string and we don't really care what the
        // value is since it may change and with the below in place we have our very first
        // assertion all wrapped up and we if we go ahead and save this file and go to the terminal
        // to see if this test case passed or not and when I go to the terminal I see this test
        // case passes
        expect( actions[ 0 ] ).toEqual( {
            type    : 'ADD_EXPENSE',
            expense : {
                id : expect.any( String ),
                ...expenseData
            }
        });

        // what we are going to do from here is figure out how we can add on another assertion
        // and we are currently checking to see if the action was correctly dispatched but would
        // also like to fetch data from Firebase and see if it was actually saved over there so
        // were going to fetch by ID and actually grab that item and we will need access to the
        // database to get this one done so first let's import " database " up above and now that
        // we have the database we can query the database and make sure the data was stored and
        // stored in the right location and we will do this by typing " database.ref() " and the
        // goal here is to figure out how we can get the individual expense and remember the id
        // below was generated by Firebase and we can use it to fetch that item and from here what
        // are we going to do? we will use once() to get the value a single time and then
        // we can attach a then() call and within then we can make an assertion about the data
        // and in this case we do need to grab the snapshot and when we get the snapshot
        // we have to convert it over to a regular value and then make an assertion about it
        // and snapshot.val() should equal all the data we defined up above or expenseData and
        // remember the callback below will be asynchronous so if we want to wait for the callback
        // below to complete as well then we have to copy done() and place it inside the then()
        // callback

        // so we are going to wait for the first promise to complete or
        /*
            expect( actions[ 0 ] ).toEqual( {
                type    : 'ADD_EXPENSE',
                expense : {
                    id : expect.any( String ),
                    ...expenseData
                }
            });
        */
        // and were going to make an assertion about the action and then we will start the process
        // below and then make an assertion about that as well ( you can tell we are making an assertion
        // when we use expect().toEqual(); )
        
        // now save this file and go to the terminal to verify everything is working as expected and
        // I went the terminal and looked at our test suite and all our test cases and test sutes are
        // passing

        // before we move on, the instructor wanted to show us a better way to get the below process
        // done since we are doing below is a lot of callback nesting and this can get pretty messy
        // as you add more and more callbacks and we can avoid this with promise chaining and
        // go to -- Mark 8 -- in the playground/promises.js file for a discussion on promise
        // chaining
        // END OF -- Mark 2 --

        // -- Mark 3 --
        // lecture 154: Testing Async Redux Actions: Part 2
        // back from -- Mark 8 -- in the playground/promises.js file
        // were going to integrate promise chaining below so change database.ref().once() below from:
        /*
        database.ref( `expenses/${ actions[ 0 ].expense.id }` ).once( 'value' ).then( ( snapshot ) => {

            expect( snapshot.val() ).toEqual( expenseData );
            done();

        } );
        */
        // to this ( below we are returning a promise ):
        return database.ref( `expenses/${ actions[ 0 ].expense.id }` ).once( 'value' );

    // now, take our then() callback from database.ref().once() above to attach it below and now we
    // have a working promise chain and we have the exact same test case as before it's just a
    // little easier to read through and parse and when we go to the terminal we can see that
    // all test cases are passing
    }).then( ( snapshot ) => {

        expect( snapshot.val() ).toEqual( expenseData );
        done();

    } );

    // had to include done(); below since I was getting a delayed error message in the terminal
    // after running the test cases; however, later on I discovered that called done() below
    // prevented my test database from updating to include the new corrent expense data for
    // test cases #5 and #6
    // done();

});


// challenge
// now, it's our turn to fill out test case #6
// remember, to add " done " as the argument to the arrow function below and by doing so we are
// setting up an asynchronous test and our instructor wants us to pass an empty object and make
// sure we set all the defaults in the defaultExpenseData object

// TEST CASE #6 - addExpense
test( 'should add expense with defaults to the database and store', ( done ) => {
    // start with the code from test case #5
    const store = createMockStore( {} );

    // for this test case, defaultExpenseData needs to equal an object with the default data
    const defaultExpenseData = {
        description : '',
        note        : '',
        amount      : 0,
        createdAt   : 0
    };

    // call startAddExpense with an empty object as the argument
    store.dispatch( startAddExpense( {} ) ).then( () => {

        const actions = store.getActions();

        expect( actions[ 0 ] ).toEqual( {
            type    : 'ADD_EXPENSE',
            expense : {
                id : expect.any( String ),
                ...defaultExpenseData
            }
        });

        return database.ref( `expenses/${ actions[ 0 ].expense.id }` ).once( 'value' );

    }).then( ( snapshot ) => {

        expect( snapshot.val() ).toEqual( defaultExpenseData );
        done();

    } );

    // had to include done(); below since I was getting a delayed error message in the terminal
    // after running the test cases; however, later on I discovered that called done() below
    // prevented my test database from updating to include the new corrent expense data for
    // test cases #5 and #6
    // done();

});

// when we go to the terminal, we see that this test case is passing and at this point we have
// a complete test suite for our first asyn action or startAddExpense amd we have one of our 4
// CRUD operations in place ( i.e. create ) and before we continue on with the other 3 CRUD
// operations, there is one topic we need to cover and that is that when we run test cases #5 and
// #6 we are writing to Firebase database or we writing to a real database; however, when I check
// my Firebase database I see that I am NOT writing to my database and I'm not sure why our
// instructor's code is writing to the database and my code is not writing to the database and
// what we are going to focus on in the next video is creating a seperate test database so
// we will have one database when people are using our app and another database when we are
// running test case against Firebase and we'll learn how to set up that test database in the
// next video
// END OF -- Mark 3 --



// comment out test case #4

/*
// TEST CASE #4 - addExpense
// challange
// call addExpense with no data
// assert the value of the return object
test( 'set up add expense action object with default values', () => {
    // for this test case, call addExpense with no arguments
    const actionResult = addExpense();

    // now, we are expecting the actionResult variable to equal an object or the object
    // below
    expect( actionResult ).toEqual({
        type    : 'ADD_EXPENSE',
        expense : {
            id          : expect.any(String),
            description : '',
            note        : '',
            amount      : 0,
            createdAt   : 0
        }
    });
});
*/


// End of -- Mark 1 --


// recap: we wrote 4 test cases for our 3 expense action generators and we learned about a few
// new things that expect provides to us such as toEqual() which is a great way to compare objects
// and we learned about expect.any() which is a way to assert the type as it relates to a property
// and we use this when we don't know what the value will be and this worked great for our id
// property above which has a value that changes every single time we call addExpense




// -- Mark 5 --
// lecture 157: Fetching Expenses: Part 1

// TEST CASE #7 - setExpenses
test( 'should setup set expense action object with data', () => {

    // this test case will not be asynchronous and for this one will simply call the setExpenses
    // export and then look at what comes back and remember to import the setExpenses action
    // generator up above and we will pass in all the expenses data from our fixtures/expenses.js
    // file
    const actionResult = setExpenses( expenses );

    // so what would we expect on this object?
    // we would expect a type property equal to 'SET_EXPENSES' and an id equal
    // to '123abc'
    // now, toBe() will not work for this code because when we use triple equals ( === )
    // to compare 2 objects we will never find that the two objects are strictly equal
    // for example, if we go into the counsel and check if {} === {} we will see that
    // it always results to false and the same thing is true for an array [] === []
    // so what we need to do is check the properties / values on the object and see if
    // they are all equal and the Jest assertion library does support this and we will
    // use the toEqual() method instead and toEqual() will go over your array or object
    // and assert that the properties / values are all the same

    // so when we using objects or arrays then we want to use toEqual() but if were using
    // booleans, numbers or strings then we want to use toBe()
    expect( actionResult ).toEqual( {
        type     : 'SET_EXPENSES',
        expenses : expenses
    } );

} );

// now if we go to the test sute in the terminal, we see that all test cases are passing so test
// case #7 passes as well


// now that we have our action ( i.e. setExpenses ) and our action test case ( i.e. test case #7 )
// in place, it is now time to handle this the setExpenses action generator in the reducer or the
// tests/reducers/expenses.test.js file and we will have to 

// (1) set support for setExpenses inside our expenses reducer or src/reducers/expenses.js and

// (2) then we will create a new test case inside our expenses test reducer or the
// tests/reducers/expenses.test.js file


// ==============================
// GO TO SRC/REDUCERS/EXPENSES.JS -- GO TO -- Mark 1 --
// ==============================


// ==============================
// GO TO TESTS/REDUCERS/EXPENSES.TEST.JS -- GO TO -- Mark 1 --
// ==============================



// End of -- Mark 5 --



// -- Mark 6 --
// lecture 158: Fetching Expenses: Part II



// TEST CASE #8 - startSetExpenses
test( 'should fetch the expenses from Firebase', ( done ) => {

    // like the other test cases that use asynchronous functionality, we need to create a mock
    // store and then go through the process of making the request and then assert something
    // about one of the actions that were dispatched and we do expect the Firebase database to
    // change at all so there is no need to query the database inside the test case or no need
    // to do ( see test #5 above ):
    /*
            return database.ref( `expenses/${ actions[ 0 ].expense.id }` ).once( 'value' );

        }).then( ( snapshot ) => {

            expect( snapshot.val() ).toEqual( expenseData );
            done();

        } );
    */

    // STEP 1: create the mock store and we will pass to it the default data and in the case
    // below we will just provide an empty object
    const store = createMockStore( {} );

    // remember, to import startSetExpenses above

    // now let's dispatch startSetExpenses on our mock store and since we are creating an
    // asynchronous test case, we will provide " done " above as the argument to the arrow
    // function and this will let Jest know not to consider this test a success or failure
    // until done() is called 
    store.dispatch( startSetExpenses() ).then( () => {

        // we will start by getting the actions
        const actions = store.getActions();

        // we will get all the actions back and we can take a look at them and there should only
        // be one and that is the only one we care about and we will expeect actions[ 0 ] to
        // equal some object and what are we going to expect?
        // we are going to expect type to equal " SET_EXPENSES " and expenses to equal
        // " expenses " and " expenses " represents all out fixtures data from fixtures/expenses.js
        // since we set that data in beforeEach() above and if everything went well it should
        // have dispatched the setExpenses action generator with the expense data it found in
        // Firebase 
        expect( actions[ 0 ] ).toEqual( {
            type     : 'SET_EXPENSES',
            expenses : expenses
        } );

        // remember to call done();
        done();

    } );

} );


// now, go to the terminal and run the test suite and see if test case #8 passes and we see
// this test case is passing


// End of -- Mark 6 --



// -- Mark 7 --
// lecture 159: Remove Expense

// for this test case, we want to remove one of the dummy items we added to Firebase

// TEST CASE #8 - startRemoveExpense
// since this will an asynchronous test case, done will be the argument to the arrow function
test( 'should remove expenses from Firebase', ( done ) => {

    // like the other test cases that use asynchronous functionality, we need to create a mock
    // store and then go through the process of making the request and then assert something
    // about one of the actions that were dispatched

    // STEP 1: create the mock store and we will pass to it the default data and in the case
    // below we will just provide an empty object
    const store = createMockStore( {} );

    // remember, to import startRemoveExpense above

    // start the dispatch process and create an ID variable
    const id = expenses[ 2 ].id;

    // now let's dispatch startRemoveExpense on our mock store and since we are creating an
    // asynchronous test case, we will provide " done " above as the argument to the arrow
    // function and this will let Jest know not to consider this test a success or failure
    // until done() is called 
    store.dispatch( startRemoveExpense( { id } ) ).then( () => {

        // we will start by getting the actions
        const actions = store.getActions();

        // we will get all the actions back and we can take a look at them and there should only
        // be one and that is the only one we care about and we will expeect actions[ 0 ] to
        // equal some object and what are we going to expect?
        // we are going to expect type to equal " REMOVE_EXPENSE " and expenses to equal
        // " id : id "
        expect( actions[ 0 ] ).toEqual( {
            type     : 'REMOVE_EXPENSE',
            expense : {
                id : id
            }
        } );

        // return fetching data from the database below so we can use then() later and we do not
        // want to toss the then() call after .once( 'value' ) in order to avoid complex nesting
        // so we will attech the then() call below
        return database.ref( `expenses/${ id }` ).once( 'value' );

        } ).then( ( snapshot ) => {

            // use the assertion toBeFalsy below and it will make sure the assertion passes if the
            // value is falsy and if not the assertion will throw an error and remember null is
            // considered falsy so everything should work as expected
            expect( snapshot.val() ).toBeFalsy();
            // remember to call done();
            done();

        } );        

} );

// now, go to the terminal and see if the test suite passes and I see that all test cases are
// passing


// End of -- Mark 7 --

