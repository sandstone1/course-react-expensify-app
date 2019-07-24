
// we know the data passed into setStartDate and setEndDate are both moment instances so
// we need to import the moment library
import moment from 'moment';
import { 
    setStartDate,
    setEndDate,
    sortByAmount,
    sortByDate,
    setTextFilter
} from '../../actions/filters';

// we will create 2 test cases for setStartDate and setEndDate

// TEST CASE #1 - setStartDate
test( 'should generate a set start date action object', () => {
    // create a const called action and set it equal to the call to setStartDate
    // and we will set up a moment instance starting at 0 or at midnight January 1, 1970
    const action = setStartDate( moment( 0 ) );

    // now, we will make an assertion
    // so we will expect soemthing from the action object ( the received value ) and
    // then use toEqual to see if the expected value equals the received value
    // and make sure we use a moment instance below so we can correctly make the assertion
    expect( action ).toEqual( {
        type      : 'SET_START_DATE',
        startDate : moment( 0 )
    } );
} );


// TEST CASE #2 - setEndDate
test( 'should generate a set end date action object', () => {
    // same et up as setStartDate and we will use a fixed moment instance below
    const action = setEndDate( moment( 0 ) );

    // now, we will make an assertion
    // so we will expect soemthing from the action object ( the received value ) and
    // then use toEqual to see if the expected value equals the received value
    // and make sure we use a moment instance below so we can correctly make the assertion
    expect( action ).toEqual( {
        type    : 'SET_END_DATE',
        endDate : moment( 0 )
    } );
} );


// challange
// create 4 new test cases for sortByAmount, sortByDate and setTextFilter
// TEST CASE #3 - sortByAmount
test( 'should generate a sort by amount action object', () => {

    const action = sortByAmount();

    // now, we will make an assertion
    // so we expect the action object ( the received value ) to equal the object
    // inside toEqual() ( the expected value )
    expect( action ).toEqual( {
        type   : 'SORT_BY_AMOUNT',
        amount : 'amount'
    } );
} );


// TEST CASE #4 - sortByDate
test( 'should generate a sort by date action object', () => {

    const action = sortByDate();

    // now, we will make an assertion
    // so we will expect something from the action object ( the received value ) and
    // so we expect the action object ( the received value ) to equal the object
    // inside toEqual() ( the expected value )
    expect( action ).toEqual( {
        type : 'SORT_BY_DATE'
    } );
} )


// TEST CASE #5 - setTextFilter
test( 'should generate a set text filter object with a text value', () => {
    // the instructor reccomended we set up a separate variable for the text value
    const text = 'Something in';    
    // so we're going to pass a value in and make sure that the value gets set
    const action = setTextFilter( text );

    // now, we will make an assertion
    // so we expect the action object ( the received value ) to equal the object
    // inside toEqual() ( the expected value )
    expect( action ).toEqual( {
        type : 'SET_TEXT_FILTER',
        text // ES6 shorthand for text : text
    } );
} )



// TEST CASE #6 - setTextFilter
test( 'should generate a set text filter object with a default value', () => {

    const action = setTextFilter();

    // now, we will make an assertion
    // so we expect the action object ( the received value ) to equal the object
    // inside toEqual() ( the expected value )
    expect( action ).toEqual( {
        type : 'SET_TEXT_FILTER',
        text : ''
    } );
} )

// the great thing about having this test suite in place is that should we want to refactor
// any of our code or should anything break, we will be notified of that

// now, in the test cases above the instructor said he understands that testing still seems
// pretty contrived and it seems like we're testing things that have a very small chance of
// ever breaking; however, we will start looking at testing more complex things or things that
// are definitely going to be refactored or changed or stand a real chance of causing problems
// so in the next video, we will write some test cases for our expenses selector and if we want
// to go into the code for the expenses selector and refactor something we might be unsure if
// the selector will work correctly after we do the refactoring so the goal of the next video
// is to make sure the expenses selector works correctly
