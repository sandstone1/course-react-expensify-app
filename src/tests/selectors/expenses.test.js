
import moment from 'moment';
// import the default export getVisibleExpenses
import getVisibleExpenses from '../../selectors/expenses';
// lecture 117: Testing Expenses Reducer
// import the fixtures default export so we can use the dummy data in our test cases
import expenses from '../fixtures/expenses';


// lecture 117: Testing Expenses Reducer
// in this lecture we copy the expenses array below and pasted it into the tests/fixtures/expenses.js
// file and I will just comment out this array
/*

// create an expenses array and this will serve as the test data for this file
// and so it will be an array of expenses and we can use them throughout our various test cases
const expenses = [{ 
        // so to kick things off let's go ahead and define an id for the first key value pairs
        // remember, createdAt within getVisibleExpenses is just a number
        id          : '1',
        description : 'Gum',
        note        : '',
        amount      : 195,
        createdAt   : 0
    },
    // having just one list of expenses will not help us with filtering and sorting so were going
    // to add some more
    { 
        // set createdAt to 4 days in the past and use valueOf() since I think createdAt needs
        // to be a timestamp
        id          : '2',
        description : 'Rent',
        note        : '',
        amount      : 109500,
        createdAt   : moment(0).subtract( 4, 'days' ).valueOf()
    },
    { 
        // set createdAt to 4 days in the future and use valueOf() since I think createdAt needs
        // to be a timestamp
        id          : '3',
        description : 'Credit Card',
        note        : '',
        amount      : 4500,
        createdAt   : moment(0).add( 4, 'days' ).valueOf()
    },
];

*/


// TEST CASE #1
// we will start off with a test case for the text filter
test( 'should filter by text value', () => {
    // each test case will hace their own filters so I'll define a const called filters below
    // and this will equal an object and each test case can define the filters they want to use
    // and the goal for this one is to set something for the text filter and we set text equal to
    // " e " so #1 should get filtered out and numbers 2 & 3 should stay so we would expect 2 items
    // to come back and we will pass in the default values for the other filters or sortBy, startDate
    // and endDate 
    const filters = {
        text      : 'e',
        sortBy    : 'date',
        startDate : undefined,
        endDate   : undefined    
    };

    // the goal is to call select expenses and pass in some data
    // create a const called result and set it equal to the call to getViaibleExpenses
    // we need to call getVisibleExpenses with the correct information and the
    // correct information is going to be a list of expenses that were going to be filtering
    // and those filtered values

    // for expenses were basically going to need some test data and we are going to need a list
    // of various expenses that we can use inside all of these test cases since all of the test
    // cases will need to filter the expenses in order to determine if they've worked correctly
    // so to get this done we will create an array up aboce before this test case

    // so now that we have some real test data, we can pass that into getVisibleExpenses with
    // our filters and make some assertions about what comes back
    // expenses will get passed in as the first argument and filters will get passed in as the
    // second argument

    // now that we have all the filters defined above and we passed everything into
    // getVisibleExpenses we can make some assertions as to what comes back and what should come
    // back is an array of 2 items and credit card should be first because we have the default
    // sort by date
    const result = getVisibleExpenses( expenses, filters );

    // now we can expect something about the result and once again we will use toEqual and this
    // time around we are going to expect it to equal an array and we know which items to expect
    // from the array and the order of the array

    // now if we check the test suite in the terminal, we see that this test cases passes so the
    // text filter did correctly filter out the first item and we have a test case that proves it
    // and remember we are sorting by date with the most recent date array item first
    expect( result ).toEqual([ expenses[ 2 ], expenses[ 1 ] ]);
} );


// TEST CASE #2
// this test case will make sure the start date filter works as expected
test( 'should filter by startDate', () => {
    // the goal inside test case #2 is to go through those same 2 steps as test case #1
    // (1) were going to define our filters and then pass that varible into getVisibleExpenses
    // and get the result back and then (2) we will make the assertion
    // text, sortBy and endDate will be their default values and the only one we want to change
    // in the filters object below is startDate and we are going to want moment instances for
    // startDate and endDate so we will create a moment instance for startDate below and start
    // it off at 0
    // but the problem with our code at the current point in time is that we have items in the
    // expenses array that are seconds away from each other and that going to create situations
    // where we can't check using startDate and endDate to filter because we are relying on
    // isSameOrBefore or isSameOrAfter by days so to fix this we are going to tweak the
    // createdAt values in the expenses array and then we'll be able to add a meaniful test case
    // so let's get that done up above nut will leave startDate for id #1 at 0 or the unix epoch
    // and change id #2 and #3 and #2 will change to " moment(0).subtract( 4, 'days' ).valueOf() "
    // and will add 4 days to #3 and we will use valueOf() to get the regular timestamp back

    // now we have more meaniful real world data and we can write some interesting test cases
    // so for the filter below, we would expect id #1 and id #3 to stay in the returned or
    // new array
    const filters = {
        text      : '',
        sortBy    : 'date',
        startDate : moment(0),
        endDate   : undefined
    };

    // so we have our expenses array up above which we will use inside getVisibleExpenses() and
    // the filters object up about and we will use that inside getVisibleExpenses()
    const result = getVisibleExpenses( expenses, filters );

    // now we can expect something about the result and once again we will use toEqual and this
    // time around we are going to expect it to equal an array and we know which items to expect
    // from the array and the order of the array

    // now if we check the test suite in the terminal, we see that this test cases passes so the
    // start date filter did worked correctly and filtered out the second item and we have a test
    // case that proves it and remember we will sort by date with the most recent date array item
    // first
    expect( result ).toEqual([ expenses[ 2 ], expenses[ 0 ] ]);
} );


// challange
// we have 3 more test cases to add: sort by date, sort by amount and and filter by end date
// and our intructor wants us to knock these test cases out and for sort by date and sort by
// amount, none of the items in the expenses will be removed and we are only concerned about
// the order with these 2 test cases


// TEST CASE #3
// this test case will make sure the end date filter works as expected
test( 'should filter by endDate', () => {
    // the goal inside test case #3 is to go through those same 2 steps as test case #1
    // (1) were going to define our filters and then pass that varible into getVisibleExpenses
    // and get the result back and then (2) we will make the assertion
    // text, sortBy and startDate will be their default values and the only one we want to change
    // in the filters object below is endDate and we are going to want moment instances for
    // startDate and endDate so we will create a moment instance for endDate below of
    // " moment(0).add( 2, 'days') "

    // now we have more meaniful real world data and we can write some interesting test cases
    // so for the filter below, we would expect id #1 and id #2 to stay in the returned or
    // new array
    const filters = {
        text      : '',
        sortBy    : 'date',
        startDate : undefined,
        endDate   : moment(0).add( 2, 'days')
    };

    // so we have our expenses array up above which we will use inside getVisibleExpenses() and
    // the filters object up about and we will use that inside getVisibleExpenses()
    const result = getVisibleExpenses( expenses, filters );

    // now we can expect something about the result and once again we will use toEqual and this
    // time around we are going to expect it to equal an array and we know which items to expect
    // from the array and the order of the array

    // now if we check the test suite in the terminal, we see that this test cases passes so the
    // end date filter did correctly filter out the third item and we have a test case that proves it
    // and remember we are sorting by date with the most recent date array item first
    expect( result ).toEqual([ expenses[ 0 ], expenses[ 1 ] ]);
} );



// TEST CASE #4
// this test case will make sure the sort by date works as expected
test( 'should sort by date', () => {
    // the goal inside test case #4 is to go through those same 2 steps as test case #1
    // (1) were going to define our filters and then pass that varible into getVisibleExpenses
    // and get the result back and then (2) we will make the assertion
    // and all the filters will stay at their default values or undefined in the case of startDate
    // or endDate

    // now we have more meaniful real world data and we can write some interesting test cases
    // so for the filter below, we would expect all the items in the expenses array to stay
    // in the returned or new array but the order is important here
    const filters = {
        text      : '',
        sortBy    : 'date',
        startDate : undefined,
        endDate   : undefined
    };

    // so we have our expenses array up above which we will use inside getVisibleExpenses() and
    // the filters object up about and we will use that inside getVisibleExpenses()
    const result = getVisibleExpenses( expenses, filters );

    // now we can expect something about the result and once again we will use toEqual and this
    // time around we are going to expect it to equal an array and we know which items to expect
    // from the array and the order of the array

    // now if we check the test suite in the terminal, we see that this test cases passes so the
    // sort by date filter did work correctly and we have a test case that proves it
    // and remember we are sorting by date with the most recent date array item first
    expect( result ).toEqual([ expenses[ 2 ], expenses[ 0 ], expenses[ 1 ] ]);
} );


// TEST CASE #5
// this test case will make sure the sort by amount works as expected
test( 'should sort by amount', () => {
    // the goal inside test case #5 is to go through those same 2 steps as test case #1
    // (1) were going to define our filters and then pass that varible into getVisibleExpenses
    // and get the result back and then (2) we will make the assertion
    // and all the filters will stay at their default values or undefined in the case of startDate
    // or endDate

    // now we have more meaniful real world data and we can write some interesting test cases
    // so for the filter below, we would expect all the items in the expenses array to stay
    // in the returned or new array but the order is important here
    const filters = {
        text      : '',
        sortBy    : 'amount',
        startDate : undefined,
        endDate   : undefined
    };

    // so we have our expenses array up above which we will use inside getVisibleExpenses() and
    // the filters object up about and we will use that inside getVisibleExpenses()
    const result = getVisibleExpenses( expenses, filters );

    // now we can expect something about the result and once again we will use toEqual and this
    // time around we are going to expect it to equal an array and we know which items to expect
    // from the array and the order of the array

    // now if we check the test suite in the terminal, we see that this test cases passes so the
    // sort by amount filter did work correctly and we have a test case that proves it
    // and remember we are sorting by amount with the highest amount array item first
    expect( result ).toEqual([ expenses[ 1 ], expenses[ 2 ], expenses[ 0 ] ]);
} );

// so we have 5 test cases above that verify that the expenses.js selector is working as expected
// and now if anything were to break inside the expenses.js selector we would know and in the next
// video we are going to focus on testing our reducers and after that we will test our components
// and components will be the last batch to test
