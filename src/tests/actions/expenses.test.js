
// our Jest test files are run through babel so we will be able to use
// all the great ES6, ES7 and ES8 features we've been using so far throughout the course
// start by importing the action generators from actions/expenses.js
import { addExpense, removeExpense, editExpense } from '../../actions/expenses';

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
    // we will kick things off by defining the data that I'm going to pass into the addExpense
    // action generator and we will be passing in an object with 4 properties and remember,
    // createdAt is set to 1000 milliseconds into the year 1970
    const expenseData = {
        description : 'Rent',
        amount      : 195000,
        createdAt   : 1000,
        note        : 'This was last month\'s rent'
    };
    // so we have the expense data in place and now we will pass it into the addExpense action
    // generator
    const actionResult = addExpense( expenseData );

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
    expect( actionResult ).toEqual({
        type    : 'ADD_EXPENSE',
        expense : {
            ...expenseData,
            id : expect.any(String)
        }
    });

});


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

// recap: we wrote 4 test cases for our 3 expense action generators and we learned about a few
// new things that expect provides to us such as toEqual() which is a great way to compare objects
// and we learned about expect.any() which is a way to assert the type as it relates to a property
// and we use this when we don't know what the value will be and this worked great for our id
// property above which has a value that changes every single time we call addExpense
